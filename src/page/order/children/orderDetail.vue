<template>
    <div id='order_detail'>
        <head-top go-back='true' head-title='订单详情'></head-top>
        
        <section class='overview'>
            <img :src="imgBaseUrl + orderDetail.restaurant_image_url">
            <div class='status'>{{orderDetail.status_bar.title}}</div>
            <router-link tag='div' class='more' :to='{path: "/shop", query:{geohash, id: orderDetail.restaurant_id}}'>再来一单</router-link>
        </section>

        <section class='food'>
            <router-link class='head' tag='div' :to='{path: "/shop", query: {geohash, id: orderDetail.restaurant_id}}'>
                <img :src="imgBaseUrl + orderDetail.restaurant_image_url">
                <span class='name'>{{orderDetail.restaurant_name}}</span>
                <svg>
                    <use xlink:href='#arrow-right'></use>
                </svg>
            </router-link>
            <ul class='food_ul'>
                <li v-for='(food, index) in orderDetail.basket.group[0]' :key='index'>
                    <div class='name ellipsis'>{{food.name}}</div>
                    <div class='right'>
                        <span class='num'>X{{food.quantity}}</span>
                        <span class='price'>￥{{food.price}}</span>
                    </div>
                </li>
            </ul>
            <div class='item'>
                <span>{{orderDetail.basket.deliver_fee.name}}</span>
                <span>￥{{orderDetail.basket.deliver_fee.price}}</span>
            </div>
            <div class='item'>
                <span>{{orderDetail.basket.packing_fee.name}}</span>
                <span>￥{{orderDetail.basket.packing_fee.price}}</span>
            </div>

            <div class='total'>实付{{orderDetail.total_amount.toFixed(2)}}</div>
        </section>

        <section class='info' v-if='orderData'>
            <header>配送信息</header>
            <p>送达时间：{{orderData.deliver_time}}</p>
            <div class='address'>
                <span class='left'>送货地址：</span>
                <div class='right'>
                    <p>{{orderData.consignee}}</p>
                    <p>{{orderData.phone}}</p>
                    <p>{{orderData.addressDetail}}</p>
                </div>
            </div>
            <p>配送方式：蜂鸟专送</p>
        </section>
        <section class='info'>
            <header>订单信息</header>
            <p>订单号：{{orderDetail.id}}</p>
            <p>支付方式：在线支付</p>
            <p>下单时间：{{orderDetail.formatted_created_at}}</p>
        </section>
    </div>
</template>

<script>
    import headTop from '../../../components/head/header';
    import { mapState, mapMutations } from 'vuex';
    import { getOrderDetail } from '../../../service/getData';
    import {imgBaseUrl} from '../../../config/env';

    export default {
        data() {
            return {
                orderData: null,
                imgBaseUrl
            }
        },
        created() {
            this.init();
        },
        components: {
            headTop
        },
        computed: {
            ...mapState([
                'orderDetail', 'userInfo', 'geohash'
            ])
        },
        methods: {
            ...mapMutations([
                'SAVE_ORDERDETAIL'
            ]),
            async init() {
                if(this.userInfo && this.userInfo.user_id){
                    this.orderData = await getOrderDetail(this.userInfo.user_id, this.orderDetail.id);
                }
            },

        },
        watch: {
            userInfo() {
                this.init();
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../style/mixin';

    #order_detail{
        position: fixed;
        left: 0;
        bottom: 0;
        top: 0;
        right: 0;
        padding-top: 1.9rem;
        background: #f5f5f5;
        z-index: 100;
        overflow: auto;
        padding-bottom: 1rem;

        .overview{
            background: #fff;
            text-align: center;
            padding: .7rem;
            img{
                @include wh(3.1rem, 3.1rem);
                border-radius: 50%;
            }
            .status{
                font-size: .9rem;
                font-weight: 700;
                margin-top: .4rem;
            }
            .more{
                display: inline-block;
                padding: .15rem .4rem;
                color: $blue;
                border:1px solid $blue;
                border-radius: .1rem;
                font-size:.6rem;
                margin-top: .5rem;
            }
        }

        .food{
            margin-top: .5rem;
            background: #fff;
            .head{
                display: flex;
                align-items: center;
                padding: .2rem .5rem;
                position:relative;
                img{
                    @include wh(1.2rem, 1.2rem);
                    margin-right: .2rem;
                }
                .name{
                    font-size:.75rem;
                    font-weight: 700;
                }
                svg{
                    @include ct;
                    right: .5rem;
                    fill: #666;
                    @include wh(.6rem, .6rem);
                }
            }

            .food_ul{
                border-top: 1px solid #f5f5f5;
                border-bottom: 1px solid #f5f5f5;
                padding: 0 .5rem;
                li{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    line-height: 1.8rem;
                    .name{
                        font-size: .6rem;
                        color: #666;
                        max-width: 8.5rem;
                    }
                    .right{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 3.5rem;
                        font-size: .6rem;
                        .price{
                            color: #666;
                        }
                        .num{
                            color: #ccc;
                        }
                    }
                }
            }

            .item{
                display: flex;
                justify-content: space-between;
                align-items: center;
                line-height: 1.8rem;
                padding: 0 .5rem;
                font-size: .6rem;
                span{
                    color: #666;
                }
            }

            .total{
                border-top: 1px solid #f5f5f5;
                line-height: 2rem;
                padding: 0 .5rem;
                color: #fb6b23;
                font-weight: 700;
                text-align: right;
                font-size: .6rem;
            }
        }

        .info{
            margin-top: .5rem;
            background: #fff;
            header{
                padding: 0 .5rem;
                border-bottom: 1px solid #f5f5f5;
                font-size: .75rem;
                line-height: 2rem;
            }
            p{
                padding: .5rem;
                font-size: .65rem;
                color: #666;
            }
            .address{
                padding:.5rem;
                display: flex;
                .left{
                    font-size: .65rem;
                    color: #666;
                }
                .right p{
                    padding: 0;
                    line-height: .9rem;
                }
            }
        }
    }
</style>
