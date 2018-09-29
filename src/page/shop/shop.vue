<template>
    <div id='shop'>
        <div class='back' @click='goBack'>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:3"/>
            </svg>
        </div>

        <header class='head'>
            <img :src="imgBaseUrl + shopDetail.image_path" class='back_img'>
            <section class='detail_wrapper' @click='showDetail = true'>
                <img src="//elm.cangdu.org/img/164ad0b6a3917599.jpg" class='shop_avator'>
                <div class='shop_detail'>
                    <p class='name'>{{shopDetail.name}}</p>
                    <p class='delivery'>商家配送/40分钟送达/配送费￥{{shopDetail.float_delivery_fee}}</p>
                    <p class='bullet_in ellipsis'>公告：{{shopDetail.promotion_info}}</p>
                </div>
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="detail_arrow">
                    <path d="M0 0 L8 7 L0 14"  stroke="#fff" stroke-width="1" fill="none"/>
                </svg>
            </section>
            <section class='activity' v-if='shopDetail.activities.length>0' @click='showActivity = true'>
                <div class='left'>
                    <span class='icon' :style='{backgroundColor: "#" + shopDetail.activities[0].icon_color}'>{{shopDetail.activities[0].icon_name}}</span>
                    <span class='text'>{{shopDetail.activities[0].description}}</span>
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
            <div class='tab'>
                <span class='active'>商品</span>
            </div>
            <div class='tab'>
                <span>评价</span>
            </div>
        </section>

        <transition name='fade'>
            <section class='activities_detail' v-show='showActivity'>
                <h2 class='name'>{{shopDetail.name}}</h2>

                <header class='title'>优惠信息</header>
                <ul class='activities_ul'>
                    <li v-for='(item, index) in shopDetail.activities' :key='index'>
                        <span class='icon' :style='{backgroundColor: "#" + item.icon_color}'>{{item.icon_name}}</span>
                        <span class='text'>{{item.description}}</span>
                    </li>
                </ul>

                <header class='title'>商家公告</header>
                <div class='bullet-in'>{{shopDetail.promotion_info}}</div>

                <svg width="60" height="60" class="close_activities" @click="showActivity = false">
                    <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none"/>
                    <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2"/>
                    <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2"/>
                </svg>
            </section>
        </transition>

    </div>
</template>

<script>
    import { shopDetail } from '../../service/getData';
    import {imgBaseUrl} from '../../config/env';

    export default {
        data() {
            return {
                shopId: '',
                shopDetail: {},
                imgBaseUrl,
                showDetail: false,
                showActivity: false
            }
        },
        async created() {
            this.shopId = this.$route.query.id;
            this.shopDetail = await shopDetail(this.shopId);
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../style/mixin';

    #shop{
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
                        line-height: 1.05rem;
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
                padding-right: .5rem;
                .left{
                    flex: 1;
                    margin-right: 1.2rem;
                    .icon{
                        font-size: .6rem;
                        padding: 0 .1rem;
                        line-height: .8rem;
                        margin-right: .15rem;
                        color: #fff;
                    }
                    .text{
                        font-size: .6rem;
                        line-height: .8rem;
                        color: #fff;
                    }
                }
                .right{
                    display: flex;
                    align-items: center;
                    span{
                        display: inline-block;
                        margin-right: .15rem;
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

        .tabs{
            display: flex;
            background: #fff;
            border-bottom: 1px solid #f1f1f1;
            height: 1.75rem;
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
    }
</style>
