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

//获取当前所选城市信息
export const currentcity = id => fetch('/v1/cities/' + id);

//搜索地址
export const searchplace = (id, address) => fetch('/v1/pois', {
    city_id: id,
    keyword: address,
    type: 'search'
});

//获取msite页面地址信息
export const msiteAddress = (geohash) => fetch('/v2/pois/' + geohash);

//获取msite页面食品分类列表
export const msiteFoodTypes = () => fetch('/v2/index_entry');

//获取商家列表
export const shopList = (la, long) => fetch('/shopping/restaurants', {
    latitude: la,
    longitude: long
})