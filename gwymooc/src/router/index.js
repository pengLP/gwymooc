import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Shop from '@/pages/shop'
import Course from '@/pages/course'
import Login from '@/components/login'
import Register from '@/components/register'
import userCenter from '@/pages/usercenter'
import shopCart from '@/pages/shopcart'
import userCourse from '@/pages/usercourse'
import changeInfo from '@/pages/changeInfo'
import order from '@/pages/order'
import message from '@/pages/message'
import pay from '@/pages/pay'
import Watch from '@/pages/watch'
import Eva from '@/pages/eva'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/shop',
      name: 'Shop',
      component: Shop,
      // children:[
      //   { path:'/shop/course',component: Course }
      // ]
    },
    {
      path:'/course/:id',
      name: 'Course',
      component: Course
    },
    {
      path:'/watch/:id',
      name: 'Watch',
      component: Watch
    },
    {
      path:'/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/register',
      name: 'Register',
      component: Register
    },
    {
      path:'/usercenter',
      name: 'userCenter',
      component: userCenter
    },
    {
      path:'/shopcart',
      name: 'shopCart',
      component: shopCart
    },
    {
      path:'/usercourse',
      name: 'userCourse',
      component: userCourse
    },
    {
      path:'/changeinfo',
      name: 'changeInfo',
      component: changeInfo
    },
    {
      path:'/order',
      name: 'order',
      component: order
    },
    {
      path:'/message',
      name: 'message',
      component: message
    },
    {
      path:'/pay',
      name: 'pay',
      component: pay
    },
    {
      path:'/eva/:id',
      name: 'eva',
      component: Eva
    }
  ]
})
