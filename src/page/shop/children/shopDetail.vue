<template>
    <div id='shop_detail' v-if='shopDetail'>
        <head-top go-back='true' head-title='商家详情'></head-top>

        <section class='activity'>
            <header class='title'>活动与属性</header>
            <ul class='activity_ul'>
                <li class='activity_li' v-for='(item, index) in shopDetail.supports' :key='index'>
                    <span class='icon' :style='{backgroundColor: "#" + item.icon_color}'>{{item.icon_name}}</span>
                    <span class='text'>{{item.description}}(APP专享)</span>
                </li>
            </ul>
        </section>

        <section class='safe'>
            <router-link to='/shop/shopDetail/shopSafe' class='title'>
                <div class='name'>食品监督安全公示</div>
                <div class='detail'>
                    <span class='text'>企业认证详情</span>
                    <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
                        <path d="M0 0 L8 7 L0 14"  stroke="#bbb" stroke-width="1.5" fill="none"/>
                    </svg>
                </div>
            </router-link>
            <div class='content'>
                <svg v-if='shopDetail.status == 1' class='icon'>
                    <use xlink:href='#res-well'></use>
                </svg>
                <svg v-else class='icon'>
                    <use xlink:href='#res-bad'></use>
                </svg>
                <div class='right'>
                    <p class='result'>
                        <span>监督检查结果：</span>
                        <span class='well' v-if='shopDetail.status == 1'>良好</span>
                        <span class='bad' v-else>差</span>
                    </p>
                    <p class='date'>
                        <span class=''>检查日期：{{shopDetail.identification.identificate_date && shopDetail.identification.identificate_date.split('T')[0]}}</span>
                    </p>
                </div>
            </div>
        </section>

        <section class='info'>
            <header class='title'>商家信息</header>
            <p>{{shopDetail.name}}</p>
            <p>地址：{{shopDetail.address}}</p>
            <p>营业时间：[{{shopDetail.opening_hours[0]}}]</p>
            <p @click='showLicenseImg(shopDetail.license.business_license_image)'>
                <span>营业执照</span>
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
                    <path d="M0 0 L8 7 L0 14"  stroke="#bbb" stroke-width="1.5" fill="none"/>
                </svg>
            </p>
            <p @click='showLicenseImg(shopDetail.license.catering_service_license_image)'>
                <span>餐饮服务许可证</span>
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
                    <path d="M0 0 L8 7 L0 14"  stroke="#bbb" stroke-width="1.5" fill="none"/>
                </svg>
            </p>
        </section>

        <transition name='fade'>
            <section class='license_wrapper' v-if='showLicense' @click='showLicense = false'>
                <img :src="imgBaseUrl + licenseImg">
            </section>
        </transition>

        <transition name='slide'>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import { getShopDetail } from '../../../service/getData';
    import { mapState } from 'vuex';
    import { imgBaseUrl } from '../../../config/env';
    import headTop from '../../../components/head/header';

    export default {
        data() {
            return {
                licenseImg: null,
                showLicense: false,
                imgBaseUrl
            }
        },
        // async created() {
        //     this.detail = await getShopDetail(this.shopId);
        // },
        computed: {
            ...mapState([
                'shopId', 'shopDetail'
            ])
        },
        methods: {
            showLicenseImg(img) {
                this.licenseImg = img;
                this.showLicense = true;
            }
        },
        components: {
            headTop
        }
    }
</script>

<style lang='scss' scoped>

    #shop_detail{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        bottom: 0;
        padding-top: 2.3rem;
        background: #ebebeb;
        z-index: 45;
        overflow: auto;
        .activity{
            background: #fff;
            .title{
                padding: 0 .6rem;
                font-size: .75rem;
                line-height: 1.8rem;
                border-bottom: 1px solid #f1f1f1;
            }
            .activity_ul{
                padding: .3rem .6rem .5rem;
                li{
                    margin-bottom: .2rem;
                    .icon{
                        font-size: .6rem;
                        line-height: .6rem;
                        color: #fff;
                        padding: 0 .1rem;
                        border-radius: .1rem;
                        margin-right: .2rem;
                    }
                    .text{
                        font-size: .6rem;
                        color: #666;
                    }
                }
            }
        }

        .safe{
            margin-top: .4rem;
            background: #fff;
            .title{
                line-height: 1.8rem;
                border-bottom: 1px solid #f1f1f1;
                padding: 0 .6rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .name{
                    font-size: .75rem;
                }
                .detail{
                    display: flex;
                    align-items: center;
                    .text{
                        font-size: .7rem;
                        color: #bbb;
                        margin-right: .3rem;
                    }
                    svg{
                        width: .6rem;
                        height: .6rem;
                    }
                }
            }
            .content{
                display: flex;
                padding: .6rem;
                .icon{
                    width: 2rem;
                    height: 2rem;
                    margin-right: .6rem;
                }
                .right{
                    span{
                        font-size: .6rem;
                        color: #666;
                        line-height: .8rem;
                    }
                    .result{
                        margin-bottom: .1rem;
                        font-size: 0;
                        .well{
                            color: rgb(126, 211, 33);
                        }
                        .bad{
                            color: red;
                        }
                    }
                }
            }
        }

        .info{
            background: #fff;
            margin-top: .4rem;
            .title{
                font-size: .75rem;
                line-height: 1.8rem;
                border-bottom: 1px solid #f1f1f1;
                padding: 0 .6rem;
            }
            p{
                font-size: .6rem;
                padding: .7rem .6rem;
                border-bottom: 1px solid #f5f5f5;
                color: #666;
                display: flex;
                vertical-align: center;
                justify-content: space-between;
                span{
                    font-size: .6rem;
                    color: #666;
                }
            }
        }

        .license_wrapper{
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,.8);
            z-index: 46;
            img{
                width: 100%;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }

        .fade-enter, .fade-leave-to{
            opacity: 0;
        }
        .fade-enter-active, .fade-leave-active{
            transition: opacity .5s;
        }

        .slide-enter, .slide-leave-to{
            opacity: 0;
            transform: translateX(2rem);
        }
        .slide-enter-active, .slide-leave-active{
            transition: all .4s;
        }
    }
</style>
