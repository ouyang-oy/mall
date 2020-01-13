import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/home.vue'
import category from '@/views/category/category.vue'
import Detail from '@/views/detail/Detail.vue'
import cart from '@/views/cart/cart.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'',
      redirect:'/home'
    },
    {
      path:'/home',
      name:'home',
      component:home
    },{
      path:'/category',
      name:'category',
      component:category
    },{
      path:'/Detail/:iid',
      name:'Detail',
      component:Detail,
    },{
      path:'/cart',
      name:'cart',
      component:cart
    }
  ]
})
