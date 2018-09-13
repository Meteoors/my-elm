import {
    GET_USERINFO,
    SAVE_GEOHASH,
    RECORD_ADDRESS
} from './mutation-types'

export default {
    //用户信息存入vuex
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
    }
}