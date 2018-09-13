<template>
    <div class='shoplist'>
        <ul class='shop_ul'>
            <router-link to='/shop' v-for='(shop, index) in shoplist' :key='index' tag='li' class='shop_li'>
                <div class='avator'>
                    <img :src="imgBaseUrl + shop.image_path" class='shop_img'>
                </div>
                <div class='detail'>
                    <div class='top'>
                        <h4 class='ellipsis'>{{shop.name}}</h4>
                        <ul class='support_ul'>
                            <li class='support_li' v-for='(support, index) in shop.supports' :key='index'>
                                {{support.icon_name}}
                            </li>
                        </ul>
                    </div>
                    <div class='middle'>
                        <div class='left'>
                            <!-- <star :score='shop.rating'></star> -->
                            <span class='score'>{{shop.rating}}</span>
                            <span class='sell'>月售{{shop.recent_order_num}}单</span>
                        </div>
                        <div class='right'>
                            <span class='delivery' v-if='shop.delivery_mode'>{{shop.delivery_mode.text}}</span>
                            <span class='intime' v-if='intime(shop.supports)'>准时达</span>
                        </div>
                    </div>
                    <div class='bottom'>
                        <div class='left'>￥{{shop.float_minimum_order_amount}}起送/{{shop.piecewise_agent_fee.tips}}</div>
                        <div class='right'>
                            <span class='distance'>{{shop.distance}}/</span>
                            <span class='time'>{{shop.order_lead_time}}</span>
                        </div>
                    </div>
                </div>
            </router-link>
        </ul>
        <div class='no_more'>没有更多了</div>
    </div>
</template>

<script>
    import {shopList} from '../../service/getData'
    import {imgBaseUrl} from '../../config/env'
    import {mapState} from 'vuex'

    export default {
        data () {
            return {
                shoplist: []  //店铺列表数据
            }
        },
        created () {
            this.init();
        },
        props: ['geohash'],
        computed: {
            ...mapState([
                'longitude', 'latitude'
            ])
        },
        methods: {
            async init () {
                this.shoplist = await shopList(this.latitude, this.longitude)
            },
            intime (supports) {
                let intime = false;
                if (supports instanceof Array && supports.length){
                    supports.forEach(support => {
                        if(support.icon_name === '准'){
                            intime = true;
                        }
                    })
                }
                return intime;
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../style/mixin';

    .shoplist{
        background-color: #fff;
        .shop_ul{
            .shop_li{
                padding: .7rem .4rem;
                border-bottom: 1px solid $bc;
                display: flex;
                .avator{
                    .shop_img{
                        @include wh(2.7rem, 2.7rem);
                        margin-right: .4rem;
                    }
                }
                .detail{
                    flex: 1;
                    .top{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: .5rem;
                        h4{
                            width:8.5rem;
                            @include font(0.65rem, 0.65rem, 'PingFangSC-Regular');  //记得添加mixin
                            font-weight: 700;
                            color:#333;
                        } 
                        .support_ul{
                            display: flex;
                            margin-right: -.3rem;
                            // transform: scale(.8);
                            .support_li{
                                font-size: .5rem;
                                color: #999;
                                padding: 0 0.05rem;
                                border: 1px solid #999;
                                margin-left: 0.1rem;
                                border-radius: .08rem;
                            }
                        }
                    }
                    .middle{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: .52rem;
                        .left{
                            .score{
                                font-size: .4rem;
                                color: #ff6000;
                                margin: 0 .2rem;
                            }
                            .sell{
                                font-size: .4rem;
                                color: #666;
                                transform: scale(.8);
                            }
                        }
                        .right{
                            display: flex;
                            align-items: center;
                            margin-right: -.8rem;
                            // transform: scale(.7);
                            span{
                                border: 1px solid $blue;
                                font-size: .4rem;
                                padding: .04rem .08rem 0;
                                border-radius: .08rem;
                                margin-left: .08rem;
                            }
                            .delivery{
                                background: $blue;
                                color: #fff;
                            }
                            .intime{
                                color: $blue;
                            }
                        }
                    }
                    .bottom{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .left{
                            font-size: .5rem;
                            color: #666;
                            transform: scale(.83);
                        }
                        .right{
                            font-size: .5rem;
                            transform: scale(.83);
                            .distance{
                                color: #999;
                            }
                            .time{
                                color: $blue;
                            }
                        }
                    }
                }
            }
        }
    }

</style>
