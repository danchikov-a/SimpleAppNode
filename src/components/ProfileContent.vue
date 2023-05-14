<template>
  <div style="padding-top: 2%; padding-bottom: 7%;" class="qwe">
    <TopMenu></TopMenu>
    <div :key="order" class="row" style=" display: flex; flex-wrap: wrap;" v-for="order in orders">
      <div class="col-4">
        <OrderComponent :order="order"></OrderComponent>
      </div>
    </div>
    <BottomMenu :is-menu-active="false" :is-profile-active="true"></BottomMenu>
  </div>
</template>

<script>
import TopMenu from "@/components/TopMenu";
import BottomMenu from "@/components/BottomMenu";
import OrderComponent from "@/components/OrderComponent";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ProfileContent",
  components: {
    TopMenu,
    BottomMenu,
    OrderComponent,
  },
  computed: {
    ...mapGetters({
      'orders': "getOrders",
    }),
  },
  methods: {
    ...mapActions({
      'fetchOrders': 'fetchOrders',
    }),
  },
  mounted() {
    this.fetchOrders();
  }
}
</script>

<style scoped>

.qwe {
  background: url("../assets/загружено.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  overflow:hidden;
}
</style>