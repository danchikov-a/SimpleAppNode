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
                      <p>Авторизация</p>

                      <div class="form-outline mb-4">
                        <input v-model="user.email" type="email" id="form2Example11" class="form-control"/>
                        <label class="form-label" for="form2Example11">Электронная почта</label>
                      </div>

                      <div class="form-outline mb-4">
                        <input v-model="user.password" type="password" id="form2Example22" class="form-control" />
                        <label class="form-label" for="form2Example22">Пароль</label>
                      </div>


                      <div class="text-center pt-1 mb-5 pb-1">
                        <button @click="authorize" class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button">Войти</button>
                        <button @click="$router.push('/registration')" class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button">Создать аккаунт</button>
                        <!--                      <a class="text-muted" href="#!">Forgot password?</a>-->
                      </div>

                      <!--                    <div class="d-flex align-items-center justify-content-center pb-4">
                                            <p class="mb-0 me-2">Don't have an account?</p>
                                            <button type="button" class="btn btn-outline-danger">Create new</button>
                                          </div>-->

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
      'authorizeUser': 'authorize',
    }),
    authorize() {
      this.authorizeUser(this.user);
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
