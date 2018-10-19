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

        <!-- <transition name='alert'> -->
            <section class='exit' v-if='showExit'>
                <div class='cover'></div>

                <section class='tip' :class="{enter: isEnter, leave: isLeave}">
                    <div class='circle'>
                        <div class='line'></div>
                        <div class='point'></div>
                    </div>
                    <div class='confirm'>是否退出登录</div>
                    <div class='btns'>
                        <div class='btn wait' @click='closeExitTip'>再等等</div>
                        <div class='btn' @click='exit'>退出登录</div>
                    </div>
                </section>
            </section>
        <!-- </transition> -->
    </div>
</template>

<script>
    import headTop from '../../../components/head/header';
    import alertTip from '../../../components/common/alert'
    import { mapState, mapMutations } from 'vuex';
    import {imgBaseUrl} from '../../../config/env';
    import {uploadImg, signout} from '../../../service/getData';
    import { removeStore } from '../../../config/mUtils';


    export default {
        data () {
            return {
                imgBaseUrl,
                showAlert: false,
                alertText: '',
                showExit: false,
                isShow: true,
                isLeave: false
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
            ...mapMutations([
                'UPDATE_AVATAR', 'LOG_OUT'
            ]),
            async uploadAvatar() {
                let input = document.querySelector('.upload');
                let data = new FormData();
                data.append('file', input.files[0]);
                try{
                    // let res = await uploadImg('avatar', data);
                    // if(res.status == 1){
                    //     this.userInfo.avatar = res.image_path;
                    // }

                    let response = await fetch('//elm.cangdu.org/v1/addimg/avatar', {
                        method: 'POST',
                        credentials: 'include',
                        body: data
                    });
                    let res = await response.json();
                    console.log(res);
                    if(res.status == 1){
                        this.UPDATE_AVATAR(res.image_path);
                        console.log('上传头像成功');
                    }
                }catch (err) {
                    this.showAlert = true;
                    this.alertText = '上传失败';
                    throw new Error(err);
                }
            },
            changePhone() {
                this.showAlert = true;
                this.alertText = '请在手机APP中设置';
            },
            closeTip() {
                this.showAlert = false;
            },
            showExitTip() {
                this.showExit = true;
                this.isEnter = true;
                this.isLeave = false;
            },
            closeExitTip() {
                this.isLeave = true;
                this.isEnter = false;
                this.timer = setTimeout(() => {
                    this.showExit = false;                    
                }, 200);
            },
            async exit() {
                await signout();
                this.LOG_OUT();
                removeStore('user_id');
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../style/mixin';

    #info{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 100;
        background: #f5f5f5;
        .slide-enter, .slide-leave-to{
            opacity: 0;
            transform: translateX(2rem);
        }
        .slide-enter-active, .slide-leave-active{
            transition: all .4s;
        }

        .wrapper{
            margin-top: 2.3rem;
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

                img{
                    display: block;
                    height: 2rem;
                    margin: .1rem 0;
                    border-radius: 50%;
                }
                .icon_right{
                    @include wh(.66667rem, 1.2rem);
                    fill: #d8d8d8;
                    @include ct;
                    right: .4rem;
                }

                h4{
                    font-size: .6rem;
                    display: flex;
                    align-items: center;
                    line-height: 1.2rem;
                    img{
                        height: 100%;
                        border-radius: 2px;
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
            width: 94%;

            .cover{
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: #000;
                opacity: .2;
                z-index: 40;
            }

            .tip{
                position: relative;
                z-index: 41;
                background: #fff;
                padding: 17px;
                border-radius: 5px;
            }

            .enter{
                animation: bounceIn .6s;
                transition: all 1s;
            }

            .leave{
                animation: zoomOut .2s;
            }

            .circle{
                position: relative;
                width: 90px;
                height: 90px;
                border: 4px solid #f8bb86;
                margin: 20px auto;
                border-radius: 50%;
                .line{
                    position: absolute;
                    @include cl;
                    top: 10px;
                    width: 5px;
                    background: #f8bb86;
                    height: 47px;
                    border-radius: 2px;
                }
                .point{
                    position: absolute;
                    @include cl;
                    bottom: 10px;
                    width: 7px;
                    border-radius: 50%;
                    background: #f8bb86;
                    height: 7px;
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
                    padding: .4rem 1rem;
                    border-radius: 5px;
                    font-size: .6rem;
                    color: #fff;
                    letter-spacing: 1px;
                    background: #dd6b55;
                }
                .wait{
                    background: #c1c1c1;
                    margin-right: .4rem;
                }
            }
        }

        @keyframes bounceIn {
            from, 20%, 40% , 60%, 80%, 100%{
                animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            }
            0% {
                opacity: 0;
                transform: scale3d(.3, .3, .3);
            }
            20% {
                transform: scale3d(1.1, 1.1, 1.1);
            }
            40% {
                transform: scale3d(.9, .9, .9);
            }
            60% {
                opacity: 1;
                transform: scale3d(1.03, 1.03, 1.03);
            }
            80% {
                transform: scale3d(0.97, 0.97, 0.97);
            }
            100% {
                opacity: 1;
                transform: scale3d(1, 1, 1);
            }
        }

        @keyframes zoomOut {
            0% {
                opacity: 1; 
            }
            100% {
                opacity: 0;
                transform: scale3d(.3, .3, .3);
                -webkit-transform: scale3d(.3, .3, .3);
            }
        }
    }

</style>
