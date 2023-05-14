<template>
  <nav class="top-menu">
    <b-modal id="order-modal" title="Заказ" header-class="modal-class" footer-class="modal-class">
      <template #modal-header>
        <div class="text-black text-center" style="text-align: center">Заказ</div>
      </template>

      <template #modal-footer>
        <b-button style="background: green; text-align: center"
                  @click="orderClicked(); $bvModal.hide('order-modal'); $bvModal.hide('bucket-modal');">Заказать
        </b-button>
      </template>
      <div style="width: 100%" class="col-4">
        <form>
          <div class="form-outline mb-4">
            <input type="email" id="form2Example11" class="form-control"/>
            <label class="form-label" for="form2Example11">Ваше имя</label>
          </div>
          <div class="form-outline mb-4">
            <input type="email" id="form2Example11" class="form-control"/>
            <label class="form-label" for="form2Example11">Ваш номер телефона</label>
          </div>
          <div class="form-outline mb-4">
            <select id="form2Example11" class="form-control">
              <option value="null"></option>
              <option v-for="minute in minutes" :key="minute" value="">{{ minute.value }}</option>
            </select>
            <label class="form-label" for="form2Example11">Через сколько минут заберете</label>
          </div>
          <div class="form-outline mb-4">

          </div>
          <span style="font-weight: bold">
              Итого
            </span>
          <span style="font-weight: bold; color: red">
              {{ getBucketItemsSum }} руб.
            </span>
        </form>
      </div>
    </b-modal>

    <b-modal id="bucket-modal" title="Корзина" header-class="modal-class" footer-class="modal-class">
      <template #modal-header>
        <div class="text-black text-center" style="text-align: center">Корзина</div>
        <img title="Очистить корзину" width="25" height="25" src="../assets/trash-bucket.png" style="cursor:pointer;">
      </template>

      <template #modal-footer>
        <b-button style="background: green; text-align: center" @click="$bvModal.show('order-modal')">Далее</b-button>
      </template>
      <div style="width: 100%" class="col-4" :key="bucketItem" v-for="bucketItem in bucketItems">
        <ShawarmaComponent :shawarma="bucketItem"></ShawarmaComponent>
      </div>
    </b-modal>
    <div class="menu-items">
      <router-link :to="{name: 'MainContent'}" class="menu-item">
        <img style="color: black" :width="menuItemsSize" :height="menuItemsSize" alt="menu" src="../assets/menu.png"
             v-if="isMenuActive">
        <img style="color: black" :width="menuItemsSize" :height="menuItemsSize" alt="menu"
             src="../assets/menu-not-active.png" v-else>
        <label>Меню</label>
      </router-link>
      <router-link :to="{name: 'ProfileContent'}" class="menu-item">
        <img :width="menuItemsSize" :height="menuItemsSize" alt="profile" src="../assets/profile-active.png"
             v-if="isProfileActive">
        <img :width="menuItemsSize" :height="menuItemsSize" alt="profile" src="../assets/profile.png" v-else>
        <label>Профиль</label>
      </router-link>
      <div @click="$bvModal.show('bucket-modal')" class="menu-item bucket">
        <span id="bucket-number" class="bucket-number"> {{ amountOfBucketElements }}</span>
        <img class="bucket-image" :width="menuItemsSize" :height="menuItemsSize" alt="bucket"
             src="../assets/bucket.png">
        <label>Корзина</label>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ShawarmaComponent from "@/components/ShawarmaComponent";

export default {
  name: "BottomMenu",
  components: {
    ShawarmaComponent
  },
  data() {
    return {
      menuItemsSize: 25,
    }
  },
  watch: {
    amountOfBucketElements() {
      let bucketNumber = document.getElementById('bucket-number');
      bucketNumber.style.cssText = "transform: scale(1.2) translate(70%, -40%);";

      function sayHi () {
        bucketNumber.style.cssText = "transform: scale(1.0);  position: absolute;\n" +
            "  transform: translate(70%, -40%);\n" +
            "  width: 20px;\n" +
            "  height: 20px;\n" +
            "  line-height: 20px;\n" +
            "  border-radius: 50%;\n" +
            "  text-align: center;\n" +
            "  background-color: red;\n" +
            "  color: white;\n" +
            "  font-weight: bold;\n" +
            "  z-index: 1;\n" +
            "  font-size: 10px;\n" +
            "  transition: all 0.5s;";
      }
      setTimeout(sayHi, 1000);
    },
  },
  props: {
    isMenuActive: {
      type: Boolean,
      required: true,
    },
    isProfileActive: {
      type: Boolean,
      required: true,
    }
  },
  mounted() {
    this.fetchAmountOfBucketElements();
    this.fetchBucketElements();
  },
  methods: {
    ...mapActions({
          'fetchAmountOfBucketElements': 'fetchAmountOfBucketElements',
          'fetchBucketElements': 'fetchBucketItems',
          'orderClicked': 'orderClicked',
        }
    ),
  },
  computed: {
    ...mapGetters({
      'amountOfBucketElements': 'getAmountOfBucketElements',
      'bucketItems': 'getBucketItems',
      'minutes': 'getMinutes',
    }),
    getBucketItemsSum() {
      if (this.bucketItems) {
        return this.bucketItems.reduce((acc, obj) => acc + obj.quantity * obj.price, 0);
      }

      return 0;
    }
  },
}
</script>

<style scoped>
.top-menu {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 7%;
  background: #ffffff;
  border-top: solid;
}

.menu-items {
  display: flex;
  justify-content: space-around;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.bucket-number {
  position: absolute;
  transform: translate(70%, -40%);
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  text-align: center;
  background-color: red;
  color: white;
  font-weight: bold;
  z-index: 1;
  font-size: 10px;
  transition: all 0.5s;
}

.modal-class {
  background: red;
}

.bucket-image {
  z-index: 0;
}

</style>