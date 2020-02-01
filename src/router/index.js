import Vue from 'vue'
import Router from 'vue-router'
import LibHome from '@/view/lib/LibHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LibHome',
      component: LibHome
    }
  ]
})
