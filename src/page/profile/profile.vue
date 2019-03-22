<template>
    <div id='profile'>
        <head-top go-back='true' head-title='我的'></head-top>

        <router-link class='login_link' :to='userInfo ? "/profile/info":"/login"' tag='div'>
            <div class='avatar'>
                <img :src='imgBaseUrl + userInfo.avatar' v-if='userInfo' class='profile_img'>
                <svg class='profile_photo' v-else fill='#fff'>
                    <use xlink:href='#avatar-default'></use>
                </svg>
            </div>
            <div class='userinfo'>
                <p class='title'>{{username}}</p>
                <p class='phone'>
                    <svg class='mobile'>
                        <use xlink:href='#mobile'></use>
                    </svg>
                    <span class='num'>{{mobile}}</span>
                </p>
            </div>
            <div class='icon'>
                <svg class='arrow_right'>
                    <use xlink:href='#arrow-right'></use>
                </svg>
            </div>
        </router-link>


        <ul class='info clear'>
            <!-- <router-link to='/balance' tag='li' class='info_li'> -->
            <li class="info_li">
                <p class='top'><span>{{balance.toFixed(2)}}</span>元</p>
                <p class='bottom'>我的余额</p>
            </li>
            <!-- </router-link> -->
            <li class="info_li">            
                <p class='top'><span>{{count}}</span>个</p>
                <p class='bottom'>我的优惠</p>
            </li>
            <li class="info_li">            
                <p class='top'><span>{{point}}</span>分</p>
                <p class='bottom'>我的积分</p>
            </li>
        </ul>

        <section class='service'>
            <!-- 我的订单 -->
            <router-link to='/order' class='detail'>
                <svg fill="#4aa5f0">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
                </svg> 
                <span>我的订单</span>
                <div class='icon'>
                    <svg fill="#bbb">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </div>
            </router-link>

            <!-- 积分商城 -->
            <a href='https://home.m.duiba.com.cn/#/chome/index' class='detail'>
                <svg fill="#fc7b53">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
                </svg> 
                <span>积分商城</span>
                <div class='icon'>
                    <svg fill="#bbb">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </div>
            </a>

            <!-- 饿了么会员卡 -->
            <div class='detail'>
                <svg fill="#ffc636">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#vip"></use>
                </svg> 
                <span class='border_none'>饿了么会员卡</span>
                <div class='icon'>
                    <svg fill="#bbb">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </div>
            </div>
        </section>

        <section class='service'>
            <!-- 服务中心 -->
            <div class='detail'>
                <svg fill="#4aa5f0">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
                </svg> 
                <span>服务中心</span>
                <div class='icon'>
                    <svg fill="#bbb">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </div>
            </div>

            <!-- 下载饿了么APP -->
            <div class="detail">
                <svg fill="#3cabff">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
                </svg> 
                <span class='border_none'>下载饿了么APP</span>
                <div class='icon'>
                    <svg fill="#bbb">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </div>
            </div>
        </section>        

        <foot-guide parent='profile'></foot-guide>

        <transition name='slide'>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {imgBaseUrl} from '../../config/env'
    import { mapState } from 'vuex';
    import headTop from '../../components/head/header'
    import footGuide from '../../components/foot/footer'

    export default {
        data() {
            return {
                imgBaseUrl,
                username: '登录/注册',
                mobile: '暂无绑定手机号',
                balance: 0,
                count: 0,
                point: 0,
            }
        },
        computed: {
            ...mapState([
                'userInfo'
            ])
        },
        created() {
            this.init();
        },
        components: {
            headTop,
            footGuide
        },
        methods: {
            init () {
                if(this.userInfo){
                    this.username = this.userInfo.username;
                    this.mobile = this.userInfo.mobile||'暂无绑定手机号';
                    this.balance = this.userInfo.balance;
                    this.count = this.userInfo.gift_amount;
                    this.point = this.userInfo.point;
                }else{
                    this.username = '登录/注册';
                    this.mobile = '暂无绑定手机号';
                    this.balance = 0;
                    this.count = 0;
                    this.point = 0;
                }
            }
        },
        watch: {
            userInfo: function() {
                this.init();
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../style/mixin';

    #profile{
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }

    #profile{
        padding-top: 1.9rem;
        .login_link{
            padding: .65rem .6rem;
            display: flex;
            align-items: center;
            background: $blue;
            .avatar{
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 50%;
                overflow: hidden;
                .profile_img,.profile_photo{
                    width: 100%;
                    height: 100%;
                }
                svg{
                    background: #fff;
                }
            }
            .userinfo{
                flex: 1;
                margin-left: .48rem;
                .title{
                    color: #fff;
                    font-size: .8rem;
                    font-weight: 700;
                    line-height: .8rem;
                }
                .phone{
                    display: flex;
                    align-items: center;
                    padding-top: .3rem;
                    .mobile{
                        width: .5rem;
                        height: .75rem;
                        fill: #fff;
                        line-height: .75rem;
                        display: inline-block;
                        margin-right: .2rem;
                    }
                    .num{
                        color: #fff;
                        font-size: .6rem;
                        line-height: .6rem;
                    }
                }
            }
            .icon{
                height: 1rem;
                width: .47rem;
                .arrow_right{
                    fill: #fff;
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .info{
            background: #fff;
            li{
                float: left;
                width: 33%;
                border-right: 1px solid #f1f1f1;
                .top{
                    padding: .85rem 0 .45rem;
                    font-size: .6rem;
                    color: #333;
                    text-align: center;
                    span{
                        color: #f90;
                        font-size: 1.2rem;
                        font-weight: 700;
                        line-height: 1rem;
                        font-family: Helvetica Neue,Tahoma;
                    }
                }
                .bottom{
                    padding-bottom: .45rem;
                    font-size: .6rem;
                    color: #666;
                    text-align: center;
                }
            }
            li:nth-child(2){
                .top{
                    span{
                        color: #ff5f3e;
                    }
                }
            }
            li:nth-child(3){
                border: none;
                .top{
                    span{
                        color: #6ac20b;
                    }
                }
            }
        }

        .service{
            margin-top: .4rem;
            background: #fff;
            .detail{
                display: flex;
                padding-left: .8rem;
                position: relative;
                align-items: center;
                svg{
                    height: .7rem;
                    width: .7rem;
                    margin-right: .25rem;
                }
                span{
                    display: inline-block;
                    width: 100%;
                    border-bottom: 1px solid #f1f1f1;
                    line-height: 1.8rem;
                    font-size: .7rem;
                    color: #333;
                }
                .border_none{
                    border: none;
                }
                .icon{
                    @include ct;                    
                    width: .47rem;
                    height: .47rem;
                    right: .2rem;
                    svg{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                }
            }
        }

        .slide-enter, .slide-leave-to{
            transform: translateX(2rem);
            opacity: 0;
        }
        .slide-enter-active, .slide-leave-to{
            transition: all .4s;
        }
    }
</style>
