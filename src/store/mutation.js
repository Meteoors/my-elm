import {
    GET_USERINFO,
    SAVE_GEOHASH,
    RECORD_ADDRESS,
    RECORD_USERINFO,
    RECORD_CATEGORY
} from './mutation-types'

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
    [RECORD_USERINFO](state, userInfo){
        state.userInfo = userInfo
    },


    [RECORD_CATEGORY](state, category){
        state.categoryData = category
    }
}