<template>
  <nav class="top-menu">
    <div class="menu-items">
      <div>
        <img style="color: black" :width="menuItemsSize" :height="menuItemsSize" alt="left-menu"
             src="../assets/left-menu.png">
      </div>
      <div>
        <label>Выбрать пункт доставки</label>
        <img style="color: black;margin-left: 5px" width="10" height="10" alt="menu" src="../assets/arrow-down.png">
      </div>
      <div>
        <img :width="menuItemsSize" :height="menuItemsSize" alt="search" src="../assets/search.png">
      </div>
      <!-- on click add -->

      <div style="font-size: 25px; font-weight: bold; cursor: pointer" v-if="!editRow" @click="changeEditRow">
        +
      </div>
      <div style="font-size: 25px; font-weight: bold; cursor: pointer" v-else @click="changeEditRow">
        -
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
    }
  },
  computed: {
    ...mapGetters({
          editRow: 'getEditRow',
        }
    ),
  },
  methods: {
    ...mapMutations(['changeEditRow'])
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
</style>