import {
    GET_USERINFO,
    SAVE_GEOHASH,
    RECORD_ADDRESS,
    RECORD_USERINFO,
    RECORD_CATEGORY,
    RECORD_SHOPID,
    INIT_BUYCART,
    ADD_CART,
    REDUCE_CART,
    RECORD_CARTLIST,
    CLEAR_CART
} from './mutation-types'

import {setStore, getStore} from '../config/mUtils'

export default {
    //用户信息存入vuex(header)
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
    },

    //经纬度存入vuex
    [RECORD_ADDRESS](state, {latitude, longitude}) {
        state.latitude = latitude
        state.longitude = longitude
    },

    //登录后vuex存入用户信息（login）
    [RECORD_USERINFO](state, userInfo) {
        state.userInfo = userInfo
    },

    //category列表存入vuex
    [RECORD_CATEGORY](state, category) {
        state.categoryData = category
    },

    //shop页shopId存入vuex
    [RECORD_SHOPID](state, id) {
        state.shopId = id
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
        packing_fee
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
                "packing_fee": packing_fee
            }
        }

        state.buyCart = {...cart};
        console.log(state.buyCart);
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
        console.log(state.buyCart);
    },

    //good页cartList存入vuex
    [RECORD_CARTLIST](state, cartList) {
        state.cartList = cartList
    },

    //清空购物车
    [CLEAR_CART](state, shopId) {
        state.buyCart[shopId] = null
        setStore('buyCart', state.buyCart)
    }
}