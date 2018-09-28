import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const food = r => require.ensure([], () => r(require('../page/food/food')), 'food')
const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')








export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/city/:cityid',
      component: city
    },
    {
      path: '/msite',
      component: msite,
      meta: {keepAlive: true}
    },
    {
      path: '/search/:geohash',
      component: search,
      meta: {keepAlive: true}
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/forget',
      component: forget
    },
    {
      path: '/profile',
      component: profile
    },
    {
      path: '/food',
      component: food
    },
    {
      path: '/order',
      component: order
    }
  ]
})
