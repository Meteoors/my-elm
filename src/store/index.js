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
    cartList: [], //购物车食品列表,
    specsFood: null,   //多规格食品
    showSpecs: false,    //显示多规格选择框,
    shopDetail: null,    //商家详情
    addressList: [],    //收货地址列表
    building: '',    //add页建筑地址
    chosenAddress: null, //confirmOrder页默认地址
    orderParam: null,  //订单参数
    orderMessage: null,  //下单成功返回信息
    remark: null,   //备注信息
    orderDetail: null  //订单详情
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})