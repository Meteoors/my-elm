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
export const shopList = (latitude, longitude, restaurant_category_id='', restaurant_category_ids='', order_by='', delivery_mode='', support_ids=[]) => {
    let supportStr = '';
    support_ids.forEach(item => {
        if(item.status){
            supportStr += '&support_ids[]=' + item.id;
        }
    });
    let data = {
        latitude,
        longitude,
        restaurant_category_id,
        'restaurant_category_ids[]': restaurant_category_ids,
        order_by,
        'delivery_mode[]': delivery_mode + supportStr
    };
    return fetch('/shopping/restaurants', data);
}

//搜索餐馆
export const searchRestaurant = (geohash, keyword) => fetch('/v4/restaurants', {
    geohash,
    keyword
})

//获取验证码
export const getVerify = () => fetch('/v1/captchas', {}, 'POST')

//账号登录
export const accountLogin = (account, password, verify) => fetch('/v2/login', {
    username: account,
    password,
    captcha_code: verify
}, 'POST')

//修改密码
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', {
    username,
    oldpassWord,
    newpassword,
    confirmpassword,
    captcha_code
}, 'POST')

//获取food页category分类列表
export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category', {
    latitude,
    longitude
})

//获取food页delivery列表
export const foodDelivery = (latitude, longitude) => fetch('/shopping/v1/restaurants/delivery_modes', {
    latitude,
    longitude
})

//获取food页activity列表
export const foodActivity = (latitude, longitude) => fetch('/shopping/v1/restaurants/activity_attributes', {
    latitude,
    longitude
})

//获取order页订单列表
export const orderList = user_id => fetch('/bos/v2/users/' + user_id + '/orders', {
    limit: 10
})

//获取shop页餐馆详情
export const getShopDetail = shop_id => fetch('/shopping/restaurant/' + shop_id)

//获取good页食品列表
export const shopMenu = restaurant_id => fetch('/shopping/v2/menu', {
    restaurant_id
})

//获取rating页评分信息
export const getScore = shop_id => fetch('/ugc/v2/restaurants/' + shop_id +'/ratings/scores')

//获取rating页tag列表
export const getTag = shop_id => fetch('/ugc/v2/restaurants/' + shop_id + '/ratings/tags')

//获取rating页评价列表
export const getRating = (shop_id, tag_name='全部', offset=0, limit=10) => fetch('/ugc/v2/restaurants/' + shop_id +'/ratings', {
    tag_name,
    offset,
    limit
})

//info页上传头像
export const uploadImg = (type, data)  => fetch('/v1/addimg/' + type, data, 'POST')

//退出登录
export const signout = () => fetch('/v2/signout')

//address页获取收货地址列表
export const getAddress = user_id => fetch('/v1/users/' + user_id + '/addresses')

//address页删除收货地址
export const deleteAddress = (user_id, address_id) => fetch('/v1/users/' + user_id + '/addresses/' + address_id, {}, 'DELETE')

//add页新增地址
export const postAddress = (user_id, address, address_detail, geohash, name, phone, phone_bk, tag = '公司', sex = 1, tag_type = 4) => fetch('/v1/users/' + user_id + '/addresses', {
    address,
    address_detail,
    geohash,
    name,
    phone,
    tag,
    sex,
    phone_bk,
    tag_type
}, 'POST')