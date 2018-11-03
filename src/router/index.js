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
const shop = r => require.ensure([], () => r(require('../page/shop/shop')), 'shop')
const foodDetail = r => require.ensure([], () => r(require('../page/shop/children/foodDetail')), 'foodDetail')
const shopDetail = r => require.ensure([], () => r(require('../page/shop/children/shopDetail')), 'shopDetail')
const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')
const setusername = r => require.ensure([], () => r(require('../page/profile/children/children/setusername')), 'setusername')
const address = r => require.ensure([], () => r(require('../page/profile/children/children/address')), 'address')
const add = r => require.ensure([], () => r(require('../page/profile/children/children/children/add')), 'add')
const addDetail = r => require.ensure([], () => r(require('../page/profile/children/children/children/children/addDetail')), 'addDetail')
const confirmOrder = r => require.ensure([], () => r(require('../page/confirmOrder/confirmOrder')), 'confirmOrder')
const chooseAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/chooseAddress')), 'chooseAddress')
const addAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/addAddress')), 'addAddress')
const searchAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/children/searchAddress')), 'searchAddress')
const remark = r => require.ensure([], () => r(require('../page/confirmOrder/children/remark')), 'remark')
const invoice = r => require.ensure([], () => r(require('../page/confirmOrder/children/invoice')), 'invoice')
const payment = r => require.ensure([], () => r(require('../page/confirmOrder/children/payment')), 'payment')





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
      component: profile,
      children: [{
        path: 'info',
        component: info,
        children: [{
          path: 'setusername',
          component: setusername
        },{
          path: 'address',
          component: address,
          children: [{
            path: 'add',
            component: add,
            children: [{
              path: 'addDetail',
              component: addDetail
            }]
          }]
        }]
      }]
    },
    {
      path: '/food',
      component: food
    },
    {
      path: '/order',
      component: order
    },
    {
      path: '/shop',
      component: shop,
      children: [{
        path: 'foodDetail',
        component: foodDetail
      },{
        path: 'shopDetail',   //商家详情页
        component: shopDetail
      }]
    },
    {
      path: '/confirmOrder',
      component: confirmOrder,
      children: [{
        path: 'remark',
        component: remark
      },{
        path: 'invoice',
        component: invoice
      },{
        path:'payment',
        component: payment
      },{
        path: 'chooseAddress',
        component: chooseAddress,
        children: [{
          path: 'addAddress',
          component: addAddress,
          children: [{
            path: 'searchAddress',
            component: searchAddress
          }]
        }]
      }]
    }
  ]
})
