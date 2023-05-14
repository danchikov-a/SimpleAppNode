<template>
  <nav class="top-menu">
    <b-modal id="qwe-modal" title="Заказ" header-class="modal-class" footer-class="modal-class">
      <template #modal-header>
        <div class="text-black text-center" style="text-align: center">Пункт самовывоза</div>
      </template>

      <template #modal-footer>
        <b-button style="background: red; text-align: center" @click="$bvModal.hide('qwe-modal')">Готово</b-button>
      </template>

      <iframe v-if="currentLocation?.id === 1" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37606.196255718394!2d27.388310952442936!3d53.907093905724565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbdb4c0f505379%3A0xd7ceae26ddced6f1!2sPapa%20Doner!5e0!3m2!1sru!2sby!4v1683841604028!5m2!1sru!2sby" style="width: 100%; height: 250px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      <iframe v-if="currentLocation?.id === 2" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d150422.4209802621!2d27.242075241724162!3d53.90775035004657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbd1b4615215e3%3A0x9f811398b155582a!2sPapa%20Doner!5e0!3m2!1sru!2sby!4v1683841715216!5m2!1sru!2sby" style="width: 100%; height: 250px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      <div style="height: 100px;">

        <div v-for="location in locations" style="width: 100%;" :key="location">
          <input type="radio" v-model="currentLocation" :value="location">
          <label>{{ location.caption }}</label>
        </div>
      </div>
    </b-modal>
    <b-sidebar id="sidebar-1" title="Sidebar" bg-variant="black" backdrop :backdrop-variant="white" style="background: black" width="15%" no-header>
      <div class="px-3 py-2">
        <ul>
          <li>
            <img :width="menuItemsSize" :height="menuItemsSize" alt="profile" src="../assets/profile.png">
            Профиль
          </li>
          <li>
            <img style="color: black" :width="menuItemsSize" :height="menuItemsSize" alt="menu"
                 src="../assets/menu-not-active.png">
            Меню
            <i class="bi bi-0-circle"></i>
          </li>
          <li>
            <img class="bucket-image" :width="menuItemsSize" :height="menuItemsSize" alt="bucket"
                 src="../assets/bucket.png">
            Корзина
          </li>
          <li>История заказов</li>
        </ul>
      </div>
    </b-sidebar>
      <div class="menu-items">
          <img style="color: black" v-b-toggle.sidebar-1 id="dropdownMenuButton1" :width="menuItemsSize" :height="menuItemsSize" alt="left-menu"
               src="../assets/left-menu.png">
        <div style="cursor: pointer;" @click="$bvModal.show('qwe-modal')">
          <div v-if="currentLocation === null">
            <label>Выбрать пункт самовывоза</label>
            <img style="color: black;margin-left: 5px" width="10" height="10" alt="menu" src="../assets/arrow-down.png">
          </div>
          <div v-else>
            {{ currentLocation.caption }}
          </div>
        </div>
        <div>
          <img :width="menuItemsSize" id="popover-target-1" :height="menuItemsSize" alt="search" src="../assets/search.png">
        </div>

        <b-popover target="popover-target-1" triggers="hover" placement="top">
          <template #title>Поиск</template>
          <input type="text" v-model="searchText" @input="applySearch()">
        </b-popover>

        <div v-if="isManager">
          <div style="font-size: 25px; font-weight: bold; cursor: pointer" v-if="!editRow" @click="changeEditRow">
            +
          </div>
          <div style="font-size: 25px; font-weight: bold; cursor: pointer" v-else @click="changeEditRow">
            -
          </div>
        </div>

    </div>
  </nav>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "TopMenu",
  data() {
    return {
      menuItemsSize: 25,
      currentLocation: null,

    }
  },
  computed: {
    ...mapGetters({
          editRow: 'getEditRow',
          getUser: 'getUser',
          locations: 'getLocations',
          getShawarmas: 'getShawarmas',
          getSearchText: 'getSearchText',
        }
    ),
    searchText: {
      get() {
        return this.getSearchText;
      },
      set(value) {
        this.setSearchText(value);
      }
    },
    isManager() {
      if (this.getUser != null) {
        return this.getUser.role_id === 1;
      }

      return false;
    },
  },
  methods: {
    ...mapMutations(['changeEditRow', 'setSearchText', 'setTempShawarmas']),
    applySearch() {
      this.setTempShawarmas(this.getShawarmas.filter(shawarma => shawarma.name.search(this.getSearchText) !== -1));
    },
  }
}
</script>

<style scoped>
.top-menu {
  position: fixed;
  top: 0;
  width: 100%;
  height: 5%;
  background: #ffffff;
  border-bottom: solid;
}

.menu-items {
  display: flex;
  justify-content: space-around;
  margin-top: 5px;
}

li {
  color: white;
  list-style-type: none;
}
</style>