import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './action'
import getters from './getter'

Vue.use(Vuex)

const state = {
    userInfo: null,     //用户信息
    geohash: '',    //地址经纬度
    latitude: '',   //纬度
    longitude: '',   //经度
    categoryData: {},
    shopId: '',  //商家id
    buyCart: {},   //购物车里的食品信息
    cartList: [] //购物车食品列表
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})