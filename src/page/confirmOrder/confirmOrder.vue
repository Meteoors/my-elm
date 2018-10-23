<template>
    <div id='confirm_order'>
        <head-top go-back='true' head-title='确认订单' login='true'></head-top>

        <router-link to='/confirmOrder/chooseAddress' class='address_wrapper'>
            <div class='left'>
                <svg class='location'>
                    <use xlink:href='#location'></use>
                </svg>
                <div class='no_address' v-if='!chosenAddress'>请添加一个收货地址</div>
                <div v-else class='address'>
                    <header>
                        <span class='name'>{{chosenAddress.name}}</span>
                        <span>{{chosenAddress.sex == 1 ? '先生':'女士'}}</span>
                        <span>{{chosenAddress.phone}}</span>
                    </header>
                    <p>
                        <span class='tag' v-if='chosenAddress.tag' :style='{backgroundColor: tagColor(chosenAddress.tag)}'>{{chosenAddress.tag}}</span>
                        <span class='detail'>{{chosenAddress.address_detail}}</span>
                    </p>
                </div>
            </div>
            <svg class='arrow_right'>
                <use xlink:href='#arrow-right'></use>
            </svg>
        </router-link>

        <section class='time_wrapper' v-if='checkoutData'>
            <div class='left'>送达时间</div>
            <div class='right'>
                <p class='time'>尽快送达 | 预计 {{checkoutData.delivery_reach_time}}</p>
                <p v-if='checkoutData.cart.is_deliver_by_fengniao' class='mode'>蜂鸟专送</p>
            </div>
        </section>

        <section class='pay_info'>
            <div class='pay'>
                <span class='title'>支付方式</span>
                <div class='more_type' @click="showPayWay = true">
                    <span class='way'>在线支付</span>
                    <svg class='arrow_right'>
                        <use xlink:href='#arrow-right'></use>
                    </svg>
                </div>
            </div>
            <div class='hongbao'>
                <span>红包</span>
                <span>暂时只在饿了么APP中支持</span>
            </div>
        </section>

        <section class='food' v-if='checkoutData'>
            <header class='title'>
                <img :src="imgBaseUrl + checkoutData.cart.restaurant_info.image_path">
                <span>{{checkoutData.cart.restaurant_info.name}}</span>
            </header>
            <ul class='food_ul'>
                <li class='food_li' v-for='(item, index) in checkoutData.cart.groups[0]' :key='index'>
                    <span class='name ellipsis'>{{item.name}}</span>
                    <div class='right'>
                        <span>x {{item.quantity}}</span>
                        <span>￥{{item.price}}</span>
                    </div>
                </li>
            </ul>

            <div class='price_item' v-if='checkoutData.cart.extra'>
                <span class='ellipsis'>{{checkoutData.cart.extra[0].name}}</span>
                <span>￥ {{checkoutData.cart.extra[0].price}}</span>
            </div>
            <div class='price_item'>
                <span>配送费</span>
                <span>￥ {{checkoutData.cart.deliver_amount}}</span>
            </div>

            <div class='total_price'>
                <span>订单 ￥{{checkoutData.cart.total}}</span>
                <span>待支付 ￥{{checkoutData.cart.total}}</span>
            </div>
        </section>

        <section class='extra'>
            <router-link to='/confirmOrder/remark' class='item'>
                <span class='title'>订单备注</span>
                <div class='detail'>
                    <span class='ellipsis'>{{remark ? remark : '口味、偏好等'}}</span>
                    <svg class='arrow_right'>
                        <use xlink:href='#arrow-right'></use>
                    </svg>
                </div>
            </router-link>

            <router-link to='/comfirmOrder/invoice' class='item'>
                <span class='title'>发票抬头</span>
                <div class='detail'>
                    <span>不需要开发票</span>
                    <svg class='arrow_right'>
                        <use xlink:href='#arrow-right'></use>
                    </svg>
                </div>
            </router-link>
        </section>

        <section class='pay_bar'>
            <div class='num'>待支付 ￥{{checkoutData.cart.total}}</div>
            <div class='pay' @click='confirmOrder'>确认下单</div>
        </section>

        <section class='pay_way' v-show='showPayWay'>
            <div class='cover' @click='showPayWay = false'></div>
            <header>支付方式</header>
            <ul class='pay_ul'>
                <li :class='{chosen: payWayId == item.id}' @click='choosePayWay(item.is_online_payment, item.id)' v-for='(item, index) in checkoutData.payments' :key='index'>
                    <span>{{item.name}}<span v-if='!item.is_online_payment'>{{item.description}}</span></span>
                    <svg class='select'>
                        <use xlink:href='#select'></use>
                    </svg>
                </li>
            </ul>
        </section>

        <transition name='slide'>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import headTop from '../../components/head/header';
    import {imgBaseUrl} from '../../config/env';
    import { mapState, mapMutations } from 'vuex';
    import { checkoutData, getAddress } from '../../service/getData';

    export default {
        data() {
            return {
                geohash: '',
                shopId: null,
                imgBaseUrl,
                chosenAddress: null,
                checkoutData: null,
                showPayWay: false,
                payWayId: 1,
                shopCart: null
            }
        },
        created() {
            this.geohash = this.$route.query.geohash;
            this.shopId = this.$route.query.shopId;

            this.INIT_BUYCART();    //从localStorage取出buyCart
            this.shopCart = this.buyCart[this.shopId];  //取得当前购物车信息

            this.initData();
        },
        components: {
            headTop
        },
        computed: {
            ...mapState([
                'buyCart', 'userInfo', 'chosenAddress'
            ])
        },
        methods: {
            ...mapMutations([
                'INIT_BUYCART', 'CHOOSE_ADDRESS'
            ]),
            async initData() {
                //checkout，需要newArr作为参数，遍历shopCart取出newArr
                let newArr = [];
                Object.values(this.shopCart).forEach(category => {
                    Object.values(category).forEach(item => {
                        Object.values(item).forEach(food => {
                            newArr.push({
                                attrs: [],
                                extra: {},
                                id: food.id,
                                name: food.name,
                                packing_fee: food.packing_fee,
                                price: food.price,
                                quantity: food.num,
                                sku_id: food.id,
                                specs: [food.specs],
                                stock: food.stock
                            })
                        })
                    })
                })

                this.checkoutData = await checkoutData(this.geohash, newArr, this.shopId);
                this.initAddress();
            },
            async initAddress() {
                if(this.userInfo && this.userInfo.user_id){ //确保userInfo初始化成功后再请求数据（watch）
                    let res = await getAddress(this.userInfo.user_id);
                    if(res instanceof Array && res.length){
                        this.CHOOSE_ADDESS({address: res[0], index: 0});
                    }
                }
            },
            //转换地址标签颜色
            tagColor(tag) {
                switch(tag){
                    case '公司': return '#4cd964';
                    case '学校': return '#3190e8';
                }
            },
            //选择付款方式
            choosePayWay(isOnline, id) {
                if(isOnline){
                    this.payWayId = id;
                    this.showPayWay = false;
                }
            },
            async confirmOrder() {
                let
            }
        },
        watch: {
            userInfo() {
                this.initAddress();
            }
        }
    }
</script>

<style lang='scss'>

</style>
