import {getUser} from '../service/getData'
import {GET_USERINFO} from './mutation'

export default {
    //获取用户信息
    async getUserInfo({commit}) {
        let res = await getUser()
        commit('GET_USERINFO', res)
    },


}