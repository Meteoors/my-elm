<template>
    <div id='info' v-if='userInfo'>
        <head-top go-back='true' head-title='账户信息'></head-top>

        <section class='wrapper'>
            <div class='item'>
                <input class='upload' type="file" @change="uploadAvatar">
                <h4 class='text'>头像</h4>
                <img :src="imgBaseUrl + userInfo.avatar">
                <svg class='icon_right'>
                    <use xlink:href='#arrow-right'></use>
                </svg>
            </div>

            <router-link to='/profile/info/setusername'>
                <div class='item'>
                    <h4>用户名</h4>
                    <div class='username'>{{userInfo.username}}</div>
                    <svg class='icon_right'>
                        <use xlink:href='#arrow-right'></use>
                    </svg>
                </div>
            </router-link>

            <router-link to='/profile/info/address'>
                <div class='item'>
                    <h4>收货地址</h4>
                    <svg class='icon_right'>
                        <use xlink:href='#arrow-right'></use>
                    </svg>
                </div>
            </router-link>

            <div class='type'>账号绑定</div>

            <div class='item' @click="changePhone">
                <h4 class='mobile'><img src="../../../images/bindphone.png" >手机</h4>
                <svg class='icon_right'>
                    <use xlink:href='#arrow-right'></use>
                </svg>
            </div>

            <div class='type'>安全设置</div>

            <router-link to='/forget'>
                 <div class='item'>
                    <h4>登录密码</h4>
                    <div class='change'>修改</div>
                    <svg class='icon_right'>
                        <use xlink:href='#arrow-right'></use>
                    </svg>
                </div>
            </router-link>

            <div class='logout' @click='showExitTip'>退出登录</div>
        </section>

        <alert-tip v-show='showAlert' :alertText='alertText' @closeTip='closeTip'></alert-tip>

        <transition name='slide'>
            <router-view></router-view>
        </transition>

        <transition name='alert'>
            <section class='exit'>
                <div class='cover'></div>

                <div class='circle'>
                    <span class='line'></span>
                    <span class='point'></span>
                </div>
                <div class='confirm'>是否退出登录</div>
                <div class='btns'>
                    <div class='btn' @click='closeExitTip'>再等等</div>
                    <div class='btn' @click='exit'>退出登录</div>
                </div>
            </section>
        </transition>
    </div>
</template>

<script>
    import headTop from '../../../components/head/header';
    import alertTip from '../../../components/common/alert'
    import { mapState } from 'vuex';
    import {imgBaseUrl} from '../../../config/env';

    export default {
        data () {
            return {
                imgBaseUrl,
                showAlert: false,
                alertText: '',
                showExit: false
            }
        },
        computed: {
            ...mapState([
                'userInfo'
            ])
        },
        components: {
            headTop, alertTip
        },
        methods: {
            changePhone() {
                this.showAlert = true;
                this.alertText = '请在手机APP中设置';
            },
            closeTip() {
                this.showAlert = false;
            },
            showExitTip() {
                this.showExit = true;
            },
            closeExitTip() {
                this.showExit = false;
            },
            exit() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../style/mixin';

    #info{
        .slide-enter, .slide-leave-to{
            opacity: 0;
            transform: translateX(2rem);
        }
        .slide-enter-active, .slide-leave-active{
            transition: all .4s;
        }

        .alert-enter, .alert-leave-to{
            opacity: 0;
        }

        .wrapper{
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            margin-top: 4.2rem;
            border-top: 1px solid #ddd;
            .item{
                background: #fff;
                padding: .4rem 1.3rem .4rem .4rem;
                border-bottom: 1px solid #ddd;
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: relative;

                .upload{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    display: block;
                    left: 0;
                    top: 0;
                    opacity: 0;
                }

                .icon_right{
                    @include wh(.66667rem, 1.2rem);
                    fill: #d8d8d8;
                    @include ct;
                    right: .5rem;
                }

                h4{
                    font-size: .6rem;
                    display: flex;
                    align-items: center;
                    img{
                        margin-right: .4rem;
                        display: block;
                    }
                }

                .username, .change{
                    font-size: .7rem;
                    color: #999;
                    line-height: 1.2rem;
                    font-family: Arial;
                }
            }

            .type{
                padding: .4rem;
                color: #666;
                font-size: .6rem;
                border-bottom: 1px solid #ddd; 
            }

            .logout{
                margin: 1.3rem auto 0;
                width: 96%;
                line-height: 1.5rem;
                font-size: .6rem;
                color: #fff;
                background: #d8584a;
                border-radius: 5px;
                text-align: center; 
            }
        }

        .exit{
            position: absolute;
            top: 20%;
            left: 3%;
            width: 96%;
            padding: 17px;
            border-radius: 5px;
            z-index: 100;
            background: #fff;

            .cover{
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: #000;
                opacity: .2;
            }

            .circle{
                width: 90px;
                height: 90px;
                border: 4px solid #f8bb86;
                margin: 20px auto;
                .line{
                    margin: 10px auto 8px;
                    width: 5px;
                    background: #f8bb86;
                    height: 47px;
                    border-radius: 2px;
                }
                .point{
                    width: 6px;
                    border-radius: 50%;
                    background: #f8bb86;
                    margin: 0 auto;
                    height: 6px;
                }
            }
            .confirm{
                margin: 25px 0 51px;
                text-align: center;
                font-size: 30px;
                color: #575757;
            }
            .btns{
                text-align: center;
                .btn{
                    display: inline-block;
                    padding: .4rem .1rem;
                    border-radius: 5px;
                    font-size: .6rem;
                    color: #fff;
                    letter-spacing: 1px;
                    background: dd6b55;
                }
                .wait{
                    background: #c1c1c1;
                    margin-right: .4rem;
                }
            }
        }
    }

</style>
