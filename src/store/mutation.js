import {
    GET_USERINFO,
} from './mutation-types'

export default {
    //用户信息存入vuex
    [GET_USERINFO](state, info) {
        if(!info.message){
            state.userInfo = info   //info不存在错误信息，即获取成功
        }else{
            state.userInfo = null   //获取失败
        }
    }
}