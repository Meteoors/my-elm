<template>
    <div id='shop' v-if='shopDetail'>
        <div class='back' @click='goBack'>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:3"/>
            </svg>
        </div>

        <header class='head'>
            <img :src="imgBaseUrl + shopDetail.image_path" class='back_img'>
            <section class='detail_wrapper' @click='toShopDetail'>
                <img :src="imgBaseUrl + shopDetail.image_path" class='shop_avator'>
                <div class='shop_detail'>
                    <p class='name'>{{shopDetail.name}}</p>
                    <p class='delivery'>商家配送/40分钟送达/配送费￥{{shopDetail.float_delivery_fee}}</p>
                    <p class='bullet_in ellipsis'>公告：{{shopDetail.promotion_info}}</p>
                </div>
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="detail_arrow">
                    <path d="M0 0 L8 7 L0 14"  stroke="#fff" stroke-width="1" fill="none"/>
                </svg>
            </section>
            <section class='activity' v-if='shopDetail.activities.length' @click='showActivity = true'>
                <div class='left'>
                    <span class='icon' :style='{backgroundColor: "#" + shopDetail.activities[0].icon_color}'>{{shopDetail.activities[0].icon_name}}</span>
                    <span class='text'>{{shopDetail.activities[0].description}}（APP专享）</span>
                </div>
                <div class='right'>
                    <span>{{shopDetail.activities.length}}个活动</span>
                    <svg class='arrow_right'>
                        <use xlink:href='#arrow-left'></use>
                    </svg>
                </div>
            </section>
        </header>

        <section class='tabs'>
            <div class='tab' @click='tab = "good"'>
                <span :class='{active: tab == "good"}'>商品</span>
            </div>
            <div class='tab' @click='tab = "rating"'>
                <span :class='{active: tab == "rating"}'>评价</span>
            </div>
        </section>

        <transition name='tab'>
            <good v-show='tab == "good"'></good>
        </transition>

        <shopcart v-show='tab == "good"' :minPrice='shopDetail.float_minimum_order_amount' :deliveryFee='shopDetail.float_delivery_fee'></shopcart>

        <transition name='fade'>
            <section class='activities_detail' v-show='showActivity'>
                <h2 class='name'>{{shopDetail.name}}</h2>

                <section class='star_wrapper'>
                    <star :score='shopDetail.rating'></star>
                </section>

                <header class='title'>
                    <span>优惠信息</span>
                </header>
                <ul class='activities_ul'>
                    <li v-for='(item, index) in shopDetail.activities' :key='index'>
                        <span class='icon' :style='{backgroundColor: "#" + item.icon_color}'>{{item.icon_name}}</span>
                        <span class='text'>{{item.description}}（APP专享）</span>
                    </li>
                </ul>

                <header class='title'>
                    <span>商家公告</span>
                </header>
                <div class='bullet-in'>{{shopDetail.promotion_info}}</div>

                <svg width="60" height="60" class="close_activities" @click="showActivity = false">
                    <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none"/>
                    <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2"/>
                    <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2"/>
                </svg>
            </section>
        </transition>

        <transition name='fade'>
            <section class='specs_wrapper' v-if='specsFood&&showSpecs'>
                <div class='cover' v-if='showSpecs' @click='closeSpecs'></div>

                <div class='specs' v-show='specsFood'>
                    <header class='name'>{{specsFood.name}}</header>
                    <h4 class='title'>{{specsFood.specifications[0].name}}</h4>
                    <ul class='specs_ul'>
                        <li class='specs_li' :class='{choose: index == specsIndex}' v-for='(item, index) in specsFood.specifications[0].values' :key='index' @click='chooseSpecs(index)'>
                            {{item}}
                        </li>
                    </ul>
                    <footer class='foot'>
                        <span class='price'>￥{{specsFood.specfoods[specsIndex].price}}</span>
                        <div class='add_cart' @click='addSpecs(specsFood)'>加入购物车</div>
                    </footer>
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" class="close" @click="closeSpecs">
                        <line x1="0" y1="0" x2="16" y2="16"  stroke="#666" stroke-width="1.2"/>
                        <line x1="0" y1="16" x2="16" y2="0"  stroke="#666" stroke-width="1.2"/>
                    </svg>
                </div>
            </section>
        </transition>

        <transition name='tab'>
            <rating v-show='tab == "rating"' :tab='tab'></rating>
        </transition>

        <transition name='slide'>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import { getShopDetail } from '../../service/getData';
    import {imgBaseUrl} from '../../config/env';
    import star from '../../components/common/star';
    import good from '../../components/shop/good';
    import shopcart from '../../components/shop/shopcart';
    import rating from '../../components/shop/rating';
    import {mapMutations, mapState} from 'vuex';

    export default {
        data() {
            return {
                shopId: '',
                shopDetail: null,
                imgBaseUrl,
                showDetail: false,
                showActivity: false,
                tab: 'good',
                specsIndex: 0
            }
        },
        created() {
            this.shopId = this.$route.query.id;
            this.init();
        },
        components: {
            star, good, shopcart, rating
        },
        computed: {
            ...mapState(['specsFood', 'showSpecs'])
        },
        methods: {
            ...mapMutations([
                'RECORD_SHOPID', 'INIT_BUYCART', 'RECORD_SHOWSPEC', 'ADD_CART', 'RECORD_DETAIL'
            ]),
            async init() {
                this.shopId = this.$route.query.id;
                this.RECORD_SHOPID(this.shopId);
                this.INIT_BUYCART();
                this.shopDetail = await getShopDetail(this.shopId);
                this.RECORD_DETAIL(this.shopDetail);
            },
            goBack() {
                this.$router.go(-1);
            },
            toShopDetail() {
                this.$router.push({path: '/shop/shopDetail'});
            },
            chooseSpecs(index) {
                this.specsIndex = index;
            },
            closeSpecs() {
                this.RECORD_SHOWSPEC(false);
                this.specsIndex = 0;
            },
            addSpecs(food) {
                let shop_id = this.shopId,
                    category_id = food.category_id,
                    item_id = food.item_id,
                    food_id = food.specfoods[this.specsIndex].food_id,
                    name = food.name,
                    price = food.specfoods[this.specsIndex].price,
                    specs = food.specifications[0].values[this.specsIndex],
                    packing_fee = food.specfoods[this.specsIndex].packing_fee;

                this.ADD_CART({shop_id, category_id, item_id, food_id, name, price, specs, packing_fee});
                this.closeSpecs();
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../style/mixin';

    .slide-enter, .slide-leave-to{
        opacity: 0;
        transform: translateX(2rem);
    }
    .slide-enter-active, .slide-leave-active{
        transition: all .4s;
    }

    #shop{
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        .back{
            position: fixed;
            top: 0.2rem;
            left: .1rem;
            width: 1.5rem;
            height: 1.5rem;
            z-index: 11;
        }
        .head{
            position: relative;
            overflow: hidden;
            flex: 0 0 auto;
            .back_img{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                filter: blur(10px);
                z-index: 9;
            }

            .detail_wrapper{
                position: relative;   
                display: flex;
                z-index: 10;
                padding: .7rem 0 .6rem .9rem;
                background: rgba(119,103,137,.43);                
                .shop_avator{
                    width: 2.9rem;
                    height: 2.9rem;
                    margin-right: .3rem;
                }
                .shop_detail{
                    flex: 1;
                    color: #fff;
                    position: relative;
                    p{
                        color: #fff;
                    }
                    .name{
                        font-size: .8rem;
                        font-weight: 700;
                        line-height: 1rem;
                        margin-bottom: .4rem;
                    }
                    .delivery{
                        font-size: .6rem;
                        line-height: .6rem;
                        margin-bottom: .5rem;
                    }
                    .bullet_in{
                        font-size: .6rem;
                        line-height: .6rem;
                        width: 11.2rem;
                    }
                }
                .detail_arrow{
                    @include ct;
                    right: .2rem;
                    z-index: 10;
                }
            }
            
            .activity{
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
                z-index: 10;
                padding: 0 .2rem .3rem .9rem;;
                background: rgba(119,103,137,.43);                                
                .left{
                    flex: 1;
                    margin-right: 1.2rem;
                    align-items: center;
                    display: flex;
                    .icon{
                        display: inline-block;
                        line-height: .7rem;
                        font-size: .6rem;
                        height: .8rem;
                        padding: 0 .1rem;
                        margin-right: .15rem;
                        color: #fff;
                        border-radius: .15rem;
                    }
                    .text{
                        font-size: .6rem;
                        line-height: .6rem;
                        height: .7rem;
                        color: #fff;
                    }
                }
                .right{
                    display: flex;
                    align-items: center;
                    span{
                        display: inline-block;
                        margin-right: .2rem;
                        font-size: .6rem;
                        line-height: .6rem;
                        color: #fff;
                    }
                    .arrow_right{
                        @include wh(.45rem, .45rem)
                    }
                }
            }
        }


        .tab-enter, .tab-leave-to{
            opacity: 0;
        }
        .tab-enter-active{
            transition: opacity .5s;
        }

        .tabs{
            display: flex;
            background: #fff;
            border-bottom: 1px solid #f1f1f1;
            height: 1.75rem;
            flex: 0 0 auto;
            .tab{
                flex: 1;
                height: 1.7rem;
                text-align: center;
                span{
                    display: inline-block;
                    height: 1.7rem;
                    line-height: 1.7rem;
                    color: #666;
                    font-size: .6rem;
                    padding: 0 .2rem;
                }
                .active{
                    color: $blue;
                    border-bottom: 3px solid $blue;
                }
            }
        }

        .fade-enter-active, .fade-leave-active{
            transition: opacity .4s;
        }
        .fade-enter, .fade-leave-to{
            opacity: 0;
        }
        .activities_detail{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            bottom: 0;
            background: #262626; 
            z-index: 30;
            padding: 1.25rem;
            font-size: .6rem;
            .name{
                font-size: .8rem;
                line-height: 1.05rem;
                text-align: center;
                color: #fff;
                margin-bottom: .4rem;
            }
            .star_wrapper{
                text-align: center;
                margin-bottom: 1.2rem;
            }
            .title{
                text-align: center;
                span{
                    display: inline-block;
                    padding: .2rem .4rem;
                    border: .025rem solid #555;
                    border-radius: .5rem;
                    color: #fff;
                }
            }
            .activities_ul{
                margin: .9rem 0 1.1rem 0;
                li{
                    display: flex;
                    align-items: center;
                    margin-bottom: .2rem;
                    .icon{
                        color: #fff;
                        height: .75rem;
                        line-height: .65rem;
                        padding: 0 .1rem;
                        display: inline-block;
                        border-radius: .1rem;
                        margin-right: .3rem;
                    }
                    .text{
                        color: #fff;
                        line-height: .6rem;
                        height: .75rem;
                    }
                }
            }
            .bullet_in{
                margin-top: .8rem;
                color: #fff;
                line-height: .9rem;
            }
            .close_activities{
                position: absolute;
                bottom: 1rem;
                left: 50%;
                transform: translateX(-50%);
            }
        }


        .specs_wrapper{
            position: fixed;
            top: 11rem;
            left: 2.4rem;
            width: 11.2rem;
            background: #fff;
            z-index: 30;
            .cover{
                position: fixed;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.4);
                z-index: 40;
            }

            .specs{
                position: relative;
                z-index: 50;
                background: #fff;
                border-radius: .25rem;
            }

            .name{
                height: 2rem;
                line-height: 2rem;
                text-align: center;
                font-size: .7rem;
                color: #222;
                font-weight: 400;
                margin-bottom: .5rem;
            }
            .title{
                padding-left: .5rem;
                font-size: .6rem;
                color: #666;
            }
            .specs_ul{
                padding: .4rem .5rem;;
                display: flex;
                margin-bottom: .5rem;
                li{
                    padding: .3rem .5rem;
                    font-size: .6rem;
                    border: 1px solid #ddd;
                    margin: 0 .5rem .2rem 0;
                    border-radius: .2rem;
                }
                .choose{
                    border-color: $blue;
                    color: $blue;
                }
            }
            .foot{
                padding: .5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .price{
                    font-size: .8rem;
                    font-weight: 700;
                    color: #ff6000;
                }
                .add_cart{
                    color: #fff;
                    background: $blue;
                    border-radius: .2rem;
                    text-align: center;
                    width: 4rem;
                    height: 1.3rem;
                    line-height: 1.3rem;
                    font-size: .6rem; 
                }
            }
            .close{
                position: absolute;
                top: .5rem;
                right: .5rem;
            }
        }
    }
</style>
