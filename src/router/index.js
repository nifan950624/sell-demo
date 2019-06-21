import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods'
import ratings from '@/components/ratings'
import seller from '@/components/seller'   
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active', 
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    }
  ]
})
