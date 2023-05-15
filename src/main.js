import Vue from 'vue'
import App from './App.vue'
import router from './routes/routes.js'
import store from './store/MainContent'
import {BootstrapVue, BootstrapVueIcons} from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueApollo from 'vue-apollo';

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueApollo);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
