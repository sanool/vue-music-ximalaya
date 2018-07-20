import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import './static/css/common.css'
import './static/css/icon.css'

Vue.use(VueAxios,axios)

let app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
