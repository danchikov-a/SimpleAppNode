<template>
  <div>
    <TopMenu></TopMenu>
    <div class="row">
      йцуй
      <div>
        qweq
      </div>
    </div>
    <BottomMenu :is-menu-active="false" :is-profile-active="true"></BottomMenu>
  </div>
</template>

<script>
import TopMenu from "@/components/TopMenu";
import BottomMenu from "@/components/BottomMenu";

export default {
  name: "ProfileContent",
  components: {
    TopMenu,
    BottomMenu,
  }
}
</script>

<style scoped>
.row {
  margin-top: 3%;
}
</style>