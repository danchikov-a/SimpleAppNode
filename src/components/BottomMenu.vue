<template>
  <nav class="top-menu">
    <b-modal id="bucket-modal" title="Корзина" header-class="modal-class" footer-class="modal-class">
      <template #modal-header>
        <div class="text-black text-center" style="text-align: center">Корзина</div>
      </template>

      <template #modal-footer>
        <b-button style="background: red; text-align: center" @click="orderClicked">Заказать</b-button>
      </template>
      <div style="width: 100%" class="col-4" :key="bucketItem" v-for="bucketItem in bucketItems">
        <ShawarmaComponent :shawarma="bucketItem"></ShawarmaComponent>
      </div>
    </b-modal>
    <div class="menu-items">
      <router-link :to="{name: 'MainContent'}" class="menu-item">
        <img style="color: black" :width="menuItemsSize" :height="menuItemsSize" alt="menu" src="../assets/menu.png" v-if="isMenuActive">
        <img style="color: black" :width="menuItemsSize" :height="menuItemsSize" alt="menu" src="../assets/menu-not-active.png" v-else>
        <label>Меню</label>
      </router-link>
      <router-link :to="{name: 'ProfileContent'}" class="menu-item">
        <img :width="menuItemsSize" :height="menuItemsSize" alt="profile" src="../assets/profile-active.png" v-if="isProfileActive">
        <img :width="menuItemsSize" :height="menuItemsSize" alt="profile" src="../assets/profile.png" v-else>
        <label>Профиль</label>
      </router-link>
      <div @click="$bvModal.show('bucket-modal')" class="menu-item bucket">
        <span class="bucket-number"> {{ amountOfBucketElements }}</span>
        <img class="bucket-image" :width="menuItemsSize" :height="menuItemsSize" alt="bucket" src="../assets/bucket.png">
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
        }
    ),
  },
  computed: {
    ...mapGetters({
      'amountOfBucketElements': 'getAmountOfBucketElements',
      'bucketItems': 'getBucketItems',
    }),
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