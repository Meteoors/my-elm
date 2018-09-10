import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

//查询缓存里是否有用户id,然后根据id获取用户信息
export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')});     

//获取当前城市
export const cityGuess = () => fetch('/v1/cities', {type: 'guess'});

//获取热门城市
export const hotCity = () => fetch('/v1/cities', {type: 'hot'});

//获取所有城市
export const groupCity = () => fetch('/v1/cities', {type: 'group'});