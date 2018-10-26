import {
    GET_USERINFO,
    SAVE_GEOHASH,
    RECORD_ADDRESS,
    RECORD_USERINFO,
    RECORD_CATEGORY,
    RECORD_SHOPID,
    RECORD_DETAIL,
    INIT_BUYCART,
    ADD_CART,
    REDUCE_CART,
    RECORD_CARTLIST,
    CLEAR_CART,
    RECORD_SPEC,
    RECORD_SHOWSPEC,
    UPDATE_AVATAR,
    LOG_OUT,
    SET_USERNAME,
    SAVE_ADDRESS,
    DELETE_ADDRESS,
    RECORD_BUILDING,
    CHOOSE_ADDRESS,
    SAVE_ORDER,
    ORDER_SUCCESS,
    SAVE_REMARK
} from './mutation-types'

import {setStore, getStore} from '../config/mUtils'

export default {
    //head组件查询localStorage的user_id，通过user_id获取用户信息存入vuex(header)
    [GET_USERINFO](state, info) {
        if(!info.message){
            state.userInfo = info   //info不存在错误信息，即获取成功
        }else{
            state.userInfo = null   //获取失败
        }
    },

    //geohash存入vuex
    [SAVE_GEOHASH](state, geohash) {
        state.geohash = geohash
        // console.log('save！')
    },

    //经纬度存入vuex
    [RECORD_ADDRESS](state, {latitude, longitude}) {
        state.latitude = latitude
        state.longitude = longitude
        // console.log('record!')
    },

    //登录后vuex存入用户信息（login）
    [RECORD_USERINFO](state, userInfo) {
        state.userInfo = userInfo
        setStore('user_id', userInfo.user_id)
    },

    //category列表存入vuex
    [RECORD_CATEGORY](state, category) {
        state.categoryData = category
    },

    //shop页shopId存入vuex
    [RECORD_SHOPID](state, id) {
        state.shopId = id
    },

    //shop页shopDetail存入vuex
    [RECORD_DETAIL](state, detail) {
        state.shopDetail = detail
    },

    //进入shop页时从localStorage获取buyCart存入vuex
    [INIT_BUYCART](state) {
        let buyCart = getStore('buyCart')
        if(buyCart){
            state.buyCart = JSON.parse(buyCart)
        }
    },

    //加入购物车
    [ADD_CART](state, {
        shop_id,
        category_id,
        item_id,
        food_id,
        name,
        price,
        specs,
        packing_fee,
        stock
    }) {
        let cart = state.buyCart
        let shop = cart[shop_id] = cart[shop_id] || {}
        let category = shop[category_id] = shop[category_id] || {}
        let item = category[item_id] = category[item_id] || {}
        if(item[food_id]){
            item[food_id]['num']++
        }else{
            item[food_id] = {      //JSON格式
                "num": 1,
                "id": food_id,
                "name": name,
                "price": price,
                "specs": specs,
                "packing_fee": packing_fee,
                "stock": stock
            }
        }

        state.buyCart = {...cart};
        //存入loccalStorage
        setStore('buyCart', state.buyCart)
    },

    //移出购物车
    [REDUCE_CART](state, {shop_id, category_id, item_id, food_id}) {
        let cart = state.buyCart;
        let item= state.buyCart[shop_id][category_id][item_id]

        if(item[food_id]['num'] == 1){
            item[food_id] = null
        }else{
            item[food.id]['num'] --
        }

        state.buyCart = {...cart};
        setStore('buyCart', state.buyCart)
    },

    //good页cartList存入vuex
    [RECORD_CARTLIST](state, cartList) {
        state.cartList = cartList
    },

    //清空购物车
    [CLEAR_CART](state, shopId) {
        state.buyCart[shopId] = null
        setStore('buyCart', state.buyCart)
    },

    //good页specsFood存入vuex
    [RECORD_SPEC](state, food) {
        state.specsFood = food
    },

    //cartcontrol、shop页showSpecs存入vuex
    [RECORD_SHOWSPEC](state, isShow) {
        state.showSpecs = isShow
    },

    //info页更新userInfo的头像路径
    [UPDATE_AVATAR](state, path) {
        state.userInfo.avatar = path
    },

    //info页退出登录时清空userInfo
    [LOG_OUT](state) {
        state.userInfo = null
    },

    [SET_USERNAME](state, name) {
        state.userInfo.username = name
    },

    //address页收货地址列表存入vuex
    [SAVE_ADDRESS](state, list){
        state.addressList = list
    },

    //address页删除收货地址
    [DELETE_ADDRESS](state, index){
        state.addressList.splice(index, 1)
    },

    //addDetail页建筑地址存入vuex
    [RECORD_BUILDING](state, building){
        state.building = building
    },

    //confirmOrder页chosenAddress存入vuex
    [CHOOSE_ADDRESS](state, address){
        state.chosenAddress = address
    },

    //订单信息存入vuex
    [SAVE_ORDER](state, order){
        state.orderParam = order
        console.log(111)
    },

    //订单状态存入vuex
    [ORDER_SUCCESS](state, message){
        state.orderMessage = message
    },

    //备注存入vuex
    [SAVE_REMARK](state, remark){
        state.remark = remark
    }
}