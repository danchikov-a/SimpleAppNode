<template>
  <div class="qwe">
    <TopMenu></TopMenu>
    <div class="row" v-if="getSearchText === ''">
      <ShawarmaComponent class="col-4" v-if="editRow" :shawarma="null"></ShawarmaComponent>
      <div style="width: 32%" class="col-4" :key="shawarma" v-for="shawarma in shawarmas">
        <ShawarmaComponent :shawarma="shawarma"></ShawarmaComponent>
      </div>
    </div>
    <div class="row" v-else>
      <ShawarmaComponent class="col-4" v-if="editRow" :shawarma="null"></ShawarmaComponent>
      <div style="width: 32%" class="col-4" :key="shawarma" v-for="shawarma in tempShawarmas">
        <ShawarmaComponent :shawarma="shawarma"></ShawarmaComponent>
      </div>
    </div>
    <BottomMenu :is-menu-active="true" :is-profile-active="false"></BottomMenu>
  </div>
</template>

<script>
import ShawarmaComponent from "@/components/ShawarmaComponent";
import TopMenu from "@/components/TopMenu";
import BottomMenu from "@/components/BottomMenu";
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'MainContent',
  components: {
    ShawarmaComponent,
    TopMenu,
    BottomMenu,
  },
  data() {
    return {
      shawarmasFromBack: [],
    }
  },
  computed: {
    shawarmas() {
      return this.shawarmasFromBack;
    },
    ...mapGetters({
      editRow: 'getEditRow',
      shawarmas: 'getShawarmas',
      tempShawarmas: 'getTempShawarmas',
      getSearchText: 'getSearchText',
      isManager: 'isManager',
    }),
  },
  methods: {
    ...mapActions({
      fetchShawarmas: "fetchShawarmas",
      fetchNotifications: 'fetchNotifications',
    }),
  },
  mounted() {
    this.fetchShawarmas();
    this.fetchNotifications();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 7%;
  margin-top: 2%;
  padding-right: 2%;
}
.qwe {
  background: url("../assets/загружено.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  overflow:hidden;
}

</style>
