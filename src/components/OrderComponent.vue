<template>
  <div>
    <div class="shawarma-element">
      <div>

      </div>

      <div style="display: flex; justify-content: space-around; flex-direction: column">
        <div style="text-align: left">
        </div>
        <div style="text-align: left; color: grey">
        </div>
        <div style="text-align: left; color: red; font-weight: bold">
          {{ createdDate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ShawarmaComponent",
  data() {
    return {

    }
  },
  computed: {
    createdDate: {
      get() {
        //TODO extract to mixin
        let date = this.order.created_at.split("T")[0];

        let time = this.order.created_at.split("T")[1].split(".")[0];
        let dateParts = date.split("-");
        return `${dateParts[2]}.${dateParts[1]}.${dateParts[0]} ${time}`;
      }
    },
  },
  props: {
    order: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style scoped>
.shawarma-element {
  display: flex;
  box-shadow: 5px 5px 5px 5px grey;
  border-radius: 5px;
  justify-content: space-around;
  padding-top: 25px;
  padding-bottom: 25px;
  margin-left: 25px;
  margin-top: 20px;
  background-color: white;
}

.button-order {
  background: red;
  border-radius: 25px;

  padding: 5px 20px;
  color: white;
  margin-top: 75px;
}

.button-order:hover {
  -webkit-transform: scale(1.2);
  -ms-transform: scale(1.2);
  transform: scale(1.2);
}

.squared {
  border-radius: 5px;

  padding-left: 8px;
  padding-top: -9px;
  background: lightgrey;
  width: 25px;
  height: 25px;
  font-weight: bold;
  cursor: pointer;
}
.quantity-num {
  width: 25px;
  padding-left: 8px;
  height: 25px;
  font-weight: bold;
}
</style>