import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'components/recommend/recommend.vue'
import itemize from 'components/itemize/itemize.vue'
import ranklist from 'components/ranklist/ranklist.vue'

Vue.use(Router)


export default new Router({
  routes: [
    {path: '/', redirect: '/recommend'},
    {path: '/recommend', component: recommend},
    {path: '/itemize', component: itemize},
    {path: '/ranklist', component: ranklist},
  ]
})
