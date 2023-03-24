<template>
  <nav class="top-menu">
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
      <div class="menu-item">
        <img :width="menuItemsSize" :height="menuItemsSize" alt="bucket" src="../assets/bucket.png">
        <label>Корзина</label>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "BottomMenu",
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
}
</style>