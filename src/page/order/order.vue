<template>
    <div id='order'>
        <head-top go-back='true' head-title='订单列表'></head-top>

        <ul class='order_ul'>
            <li class='order_li' v-for='(order, index) in orderlist' :key='index'>             
                <img :src='imgBaseUrl + order.restaurant_image_url'>
                <div class='detail' @click="showDetail(order)">
                    <div class='top'>
                        <div class='title'>
                            <h4 class='name'>
                                <span class='ellipsis'>{{order.restaurant_name}}</span>
                                <svg class='arrow_right' fill='#333'>
                                    <use xlink:href='#arrow-right'></use>
                                </svg>
                            </h4>
                            <span class='pay'>{{paymentStatus[index]}}</span>
                        </div>
                        <h4 class='date'>{{order.formatted_created_at}}</h4>
                    </div>
                    <div class='middle'>
                        <ul>
                            <li class='food_li'>
                                <span class='food_name ellipsis'>{{order.basket.group[0][0].name}}{{order.basket.group[0].length > 1 ? '等' + order.basket.group[0].length + '件商品' : ''}}</span>
                                <span class='food_price'>￥{{order.total_amount.toFixed(2)}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class='bottom'>
                        <compute-time :time='order.time_pass' v-if='paymentStatus[index] == "等待支付"' @changePayment='changePayment(index)' @click.native.stop></compute-time>
                        <router-link class='one_more' :to='{path: "/shop", query: {geohash, id: order.restaurant_id}}' v-else tag='span' @click.native.stop>再来一单</router-link>
                    </div>
                </div>
            </li>
        </ul>

        <foot-guide parent='order'></foot-guide>

        <transition name='slide'>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import headTop from '../../components/head/header';
    import footGuide from '../../components/foot/footer';
    import computeTime from '../../components/common/computeTime';
    import { orderList } from '../../service/getData';
    import { mapState, mapMutations } from 'vuex';
    import {imgBaseUrl} from '../../config/env';

    export default {
        data() {
            return {
                orderlist: [],
                imgBaseUrl,
                paymentStatus: []
            }
        },
        created() {
            this.init();
        },
        components: {
            headTop,
            footGuide,
            computeTime
        },
        computed: {
            ...mapState([
                'userInfo', 'geohash'
            ])
        },
        methods: {
            ...mapMutations([
                'SAVE_ORDERDETAIL'
            ]),
            async init() {
                if(this.userInfo){
                    this.orderlist = await orderList(this.userInfo.user_id);
                    this.paymentStatus = this.orderlist.map((item) => {
                        return item.status_bar.title;
                    })
                }
            },
            changePayment(index) {
                this.paymentStatus[index] = '支付超时';
            },
            showDetail(order) {
                this.SAVE_ORDERDETAIL(order);
                this.$router.push('order/orderDetail');
            }
        },
        watch: {
            userInfo() {
                this.init();
            }
        }
    }
</script>

<style lang='scss' socped>
    @import '../../style/mixin';

    #order{
        margin-bottom: 2rem;
        padding-top: 1.9rem;
        background: #f1f1f1;
        p, span, h4{
            font-family: Helvetica Neue,Tahoma,Arial;
        }

        .slide-enter, .slide-leave-to{
            transform: translateX(2rem);
            opacity: 0;
        }
        .slide-enter-active, .slide-leave-active{
            transition: all .4s;
        }

        .order_ul{
            .order_li{
                background: #fff;
                display: flex;
                padding: .6rem .6rem 0;
                margin-bottom: .5rem;
                img{
                    width: 2rem;
                    height: 2rem;
                    margin-right: .4rem;
                }
                .detail{
                    flex: 1;
                    .top{
                        border-bottom: 1px solid #f1f1f1;
                        .title{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .name{
                                font-size: .75rem;
                                line-height: 1rem;
                                display: flex;
                                align-items: center;
                                width: 9rem;                                
                                .arrow_right{
                                    width: .4rem;
                                    height: .4rem;
                                    fill: #ccc;
                                    margin-left: .1rem;
                                }
                            }
                            .pay{
                                font-size: .6rem;
                            }
                        }
                        .date{
                            font-size: .6rem;
                            color: #999;
                            line-height: .6rem;
                            margin-bottom: .4rem;
                            margin-top: .1rem;
                        }
                    }
                    .middle{
                        padding: .5rem 0;
                        border-bottom: 1px solid #f1f1f1;
                        .food_li{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .food_name{
                                font-size: .6rem;
                                line-height: .9rem;
                                color: #666;
                                width: 8rem;
                            }
                            .food_price{
                                font-size: .6rem;
                                line-height: .9rem;
                                color: #f60;
                                font-weight: 700;
                            }
                        }
                    }
                    .bottom{
                        display: flex;
                        flex-direction: row-reverse;
                        padding: .5rem 0 .3rem 0;
                        .one_more{
                            padding: 0 .15rem;
                            color: $blue;
                            font-size: .6rem;
                            line-height: .9rem;
                            height: 1rem;
                            border: .025rem solid $blue;
                            border-radius: .15rem;
                        }
                    }
                }
            }
        }
    }
</style>
