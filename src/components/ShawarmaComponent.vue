<template>
  <div>
    <div class="shawarma-element" v-if="shawarma !== null && shawarmaEditId !== shawarma.id">
      <div>
        <img v-if="shawarma.fileName" width="100" height="100" alt="shawarma" :src="require(`../../server/uploads/${shawarma.fileName}`)">
      </div>
      <div style="display: flex; justify-content: space-around; flex-direction: column">
        <div style="text-align: left">
          {{ shawarma.name }}
        </div>
        <div style="text-align: left; color: grey">
          {{ shawarma.weight }} г.
        </div>
        <div style="text-align: left; color: red; font-weight: bold">
          {{ shawarma.price }} руб.
        </div>
      </div>
      <img width="25" height="25" src="../assets/trash-bucket.png" style="cursor:pointer;" @click="deleteShawarma(shawarma.id)">
      <img width="25" height="25" src="../assets/edit.jpg" style="cursor:pointer;" @click="edit(shawarma)">
      <div class="button-order">
        Заказать
      </div>
    </div>

    <!-- добавление новой шавы !-->
    <div class="shawarma-element" v-else>
      <div>
        <input @change="onChangeFile" id="file-input" accept=".png, .jpg" type="file" name="file" hidden>
        <label for="file-input">
          <img v-if="!shawarmaFilename" width="100" height="100" alt="shawarma" :src="require(`../../server/uploads/shawarma-icon.png`)">
          <img v-if="shawarmaFilename" width="100" height="100" alt="shawarma" :src="require(`../../server/uploads/${shawarmaToSave.filename}`)">
        </label>
      </div>
      <div style="display: flex; justify-content: space-around; flex-direction: column">
        <div style="text-align: left">
          <input v-model="shawarmaToSave.name" type="text" placeholder="Название шаурмы" required>
        </div>
        <div style="text-align: left; color: grey">
          <input v-model="shawarmaToSave.weight" type="number" placeholder="Количество в граммах" required>
        </div>
        <div style="text-align: left; color: red; font-weight: bold">
          <input type="number" v-model="shawarmaToSave.price" placeholder="Стоимость" required>
        </div>
      </div>

      <div v-if="shawarmaEditId !== shawarmaToSave.id" class="button-order" style="cursor: pointer" @click="save">
        Сохранить
      </div>
      <div v-if="shawarmaEditId === shawarmaToSave.id" class="button-order" style="cursor: pointer" @click="update">
        Отредактировать
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "ShawarmaComponent",
  data() {
    return {
      shawarmaToSave: {
        name: null,
        weight: null,
        price: null,
        filename: null,
      },
      shawarmaToEdit: {
        name: null,
        weight: null,
        price: null,
        filename: null,
      }
    }
  },
  props: {
    shawarma: {
      type: Object,
      required: true,
    }
  },
  computed: {
    shawarmaFilename: {
      get() {
        return this.shawarmaToSave.filename;
      },
      set(value) {
        this.shawarmaToSave.filename = value;
      }
    },
    ...mapGetters({
      'shawarmaEditId': "getShawarmaEditId",
    }),
  },
  methods: {
    ...mapMutations({
      'setShawarma': "setShawarmaToSave",
      'setShawarmaEditId': "setShawarmaEditId",
    }),
    ...mapActions({
      'saveShawarma': 'saveShawarma',
      'deleteShawarma': 'deleteShawarma',
      'updateShawarma': 'updateShawarma',
    }),
    onChangeFile(event) {
     this.shawarmaFilename = event.target.files[0].name;
    },
    save() {
      if (this.shawarmaToSave.filename !== null) {
        this.setShawarma(this.shawarmaToSave);
        this.saveShawarma()
      }
    },
    update() {

      this.setShawarma(this.shawarmaToSave);
      this.updateShawarma()
    },
    edit(shawarma) {
      this.setShawarmaEditId(shawarma.id);
      this.shawarmaToSave = shawarma;
      this.shawarmaToSave.filename = shawarma.fileName;
    }
  }
}
</script>

<style scoped>
.shawarma-element {
  display: flex;
  box-shadow: 5px 5px 5px 5px grey;
  border-radius: 25px;
  justify-content: space-around;
  padding-top: 25px;
  padding-bottom: 25px;
  margin-left: 25px;
  margin-top: 20px;
}

.button-order {
  background: red;
  border-radius: 25px;
  height: 20px;
  padding: 5px 20px;
  color: white;
  margin-top: 75px;
}
</style>