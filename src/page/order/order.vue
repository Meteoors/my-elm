<template>
    <div id='order'>
        <head-top go-back='true' head-title='订单列表'></head-top>

        <ul class='order_ul'>
            <li class='order_li' v-for='(order, index) in orderlist' :key='index'>             
                <img :src='imgBaseUrl + order.restaurant_image_url'>
                <div class='detail'>
                    <div class='top'>
                        <div class='title'>
                            <span class='name'>{{order.restaurant_name}}</span>
                            <span class='pay'>等待支付</span>
                        </div>
                        <div class='date'>{{order.formatted_created_at}}</div>
                    </div>
                    <div class='middle'>
                        <ul>
                            <li class='food_li'>
                                <span class='food_name'>{{order.basket.group[0][0].name}}{{order.basket.group[0].length > 1 ? '等' + order.basket.group[0].length + '件商品' : ''}}</span>
                                <span class='food_price'>{{order.total_amount}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class='bottom'>
                        <span class='one_more'>再来一单</span>
                    </div>
                </div>
            </li>
        </ul>

        <foot-guide parent='order'></foot-guide>
    </div>
</template>

<script>
    import headTop from '../../components/head/header';
    import footGuide from '../../components/foot/footer';
    import { orderList } from '../../service/getData';
    import { mapState } from 'vuex';
    import {imgBaseUrl} from '../../config/env';

    export default {
        data() {
            return {
                orderlist: [],
                imgBaseUrl
            }
        },
        async created() {
            this.orderlist = await orderList(this.userInfo.user_id);
            console.log(this.orderlist);
        },
        components: {
            headTop,
            footGuide
        },
        computed: {
            ...mapState([
                'userInfo'
            ])
        }
    }
</script>

<style lang='scss'>
    @import '../../style/mixin';

    #order{
        padding-top: 1.9rem;
        .order_ul{
            background: #fff;
            .order_li{
                display: flex;
                padding: .6rem .6rem 0;
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
                        padding: .5rem 0 .2rem 0;
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
