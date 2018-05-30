import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
new Vue({
  el: '#app',
  render: h => h(App)
});
// Make a request for a user with a given ID
axios.get('http://music.163.com/weapi/v3/playlist/detail?csrf_token=cd07ff3f7440e5d1bb847bcc75e5804f')
  .then(function (response) {
    console.log("xiedongli");
  })
  .catch(function (response) {
    console.log(response);
  });

