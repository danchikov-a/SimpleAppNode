<template>
  <div class="qwe" >
    <TopMenu></TopMenu>
    <div style="margin-right: 2%" :key="order" class="row md-1" v-for="order in orders">
      <OrderComponent :order="order"/>
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
.row {
  margin-top: 3%;
}

.qwe {
  background: url("../assets/загружено.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>