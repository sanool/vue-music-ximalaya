import Vue from 'vue'
import Router from 'vue-router'
import recommend from '../components/recommend/recommend.vue'
import itemize from '../components/itemize/itemize.vue'
import ranklist from '../components/ranklist/ranklist.vue'
import programList from '../components/programList/programList.vue'
import listen from '../components/listen/listen.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {name: 'recommend', path: '/', redirect: '/recommend'},
    {name: 'recommend', path: '/recommend', component: recommend},
    {name: 'programList', path: '/recommend/programList', component: programList},
    {name: 'listen', path: '/recommend/listen', component: listen},
    {name: 'itemize', path: '/itemize', component: itemize},
    {name: 'ranklist', path: '/ranklist', component: ranklist},
  ]
})
