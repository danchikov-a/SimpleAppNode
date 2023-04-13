<template>
  <section class="qwe">
    <section class="h-100 gradient-form ">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-xl-6">
            <div class="card rounded-3 text-black">
              <div class="row g-0">
                <div class="">
                  <div class="card-body p-md-5 mx-md-4">

                    <div class="text-center">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                           style="width: 185px;" alt="logo">
                    </div>

                    <form>
                      <p>Регистрация</p>

                      <div class="form-outline mb-4">
                        <input v-model="user.email" type="email" id="form2Example11" class="form-control"/>
                        <label class="form-label" for="form2Example11">Электронная почта</label>
                      </div>

                      <div class="form-outline mb-4">
                        <input v-model="user.name" type="text" id="form2Example11" class="form-control"/>
                        <label class="form-label" for="form2Example11">Имя пользователя</label>
                      </div>

                      <div class="form-outline mb-4">
                        <input v-model="user.password" type="password" id="form2Example22" class="form-control" />
                        <label class="form-label" for="form2Example22">Пароль</label>
                      </div>

                      <div class="form-outline mb-4">
                        <input v-model="user.passwordConfirmation" type="password" id="form2Example22" class="form-control" />
                        <label class="form-label" for="form2Example22">Подтверждение пароля</label>
                      </div>

                      <div class="text-center pt-1 mb-5 pb-1">
                        <button @click="register" class="col-5 btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button">Зарегистрироваться</button>
                        <button @click="$router.push('/login')" class="col-5 offset-md-1 btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" style="background-color: red" type="button">Войти</button>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>

<!--  <div class="login-form">

    <h3>Форма регистрации</h3>
    <b-form @submit.prevent="register">
      <b-form-group id="username-group" label="Имя пользователя" label-for="username-input">
        <b-form-input id="username-input" v-model="user.name" type="text" required></b-form-input>
      </b-form-group>
      <b-form-group id="username-group" label="Почта:" label-for="username-input">
        <b-form-input id="username-input" v-model="user.email" type="text" required></b-form-input>
      </b-form-group>
      <b-form-group id="password-group" label="Пароль:" label-for="password-input">
        <b-form-input id="password-input" v-model="user.password" type="password" required></b-form-input>
      </b-form-group>
      <b-form-group id="confirm-password-group" label="Подтверждение пароля" label-for="confirm-password-input">
        <b-form-input id="confirm-password-input" v-model="user.passwordConfirmation" type="password" required></b-form-input>
      </b-form-group>
      <b-button style="margin-top: 5px; width: 100%" type="submit" variant="primary">Зарегистрироваться</b-button>
    </b-form>
  </div>-->
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'MainContent',
  components: {

  },
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null,
        passwordConfirmation: null,
      }
    }
  },
  computed: {
    ...mapGetters({}
    ),
  },
  methods: {
    ...mapActions({
      'registerUser': 'register',
    }),
    register() {
      console.log(this.user);
      if (this.user.password === this.user.passwordConfirmation) {
        this.registerUser(this.user);
      }
    }
  },
  mounted() {
    this.fetchShawarmas();
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
}
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.qwe {
  background: url("../assets/загружено.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
