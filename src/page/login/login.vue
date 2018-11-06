<template>
    <div id='login'>
        <head-top go-back='true' head-title='密码登录'></head-top>

        <form class='login_form'>
            <section class='input_container'>
                <input type="text" placeholder="账号" v-model='userAccount'>    
            </section>
            <section class='input_container'>
                <input v-if='!showPassword' type="password" placeholder="密码" v-model="password">
                <input v-else type="text" placeholder="密码" v-model="password">
                <div class='switch' :class='{change_to_text: showPassword}' @click='changePasswordType'>
                    <span>ab</span>
                    <span>...</span>
                    <div class='circle' :class='{trans_to_right: showPassword}'></div>
                </div>    
            </section>
            <section class='input_container verify_container'>
                <input type="text" placeholder="验证码" maxlength="4" v-model="verification">
                <div class='change_verify'>
                    <img :src="verifyImg">
                    <div class='change_img' @click='getVerification'>
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </form>

        <p class='login_tips'>温馨提示：未注册过的账号，登录时将自动注册</p>
        <p class='login_tips'>注册过的用户可凭账号密码登录</p>     

        <div class='submit' @click='login'>登录</div>   

        <router-link class='forget' to='/forget'>重置密码？</router-link>

        <alert-tip v-if='showAlert' :alertText='alertText' @closeTip='closeTip'></alert-tip>
    </div>
</template>

<script>
    import headTop from '../../components/head/header'
    import alertTip from '../../components/common/alert'
    import {mapMutations} from 'vuex'
    import { getVerify, accountLogin } from '../../service/getData';


    export default {
        data () {
            return {
                showPassword: false, //显示密码
                userAccount: '',  //账号
                password: '',  //密码
                verification: '',  //验证码
                verifyImg: '',  //验证码图片
                userInfo: null,  //用户信息
                showAlert: false, //显示提示
                alertText: ''
            }
        },
        created () {
            this.getVerification()
        },
        components: {
            headTop,
            alertTip
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO'
            ]),
            //获取验证码
            async getVerification() {
                let res = await getVerify();
                if(res.status === 1){
                    this.verifyImg = res.code;
                }
            },
            //是否显示密码
            changePasswordType() {
                this.showPassword = !this.showPassword;
            },
            //账号登录
            async login() {
                if(!this.userAccount){
                    this.alertText = '请输入账号';
                    this.showAlert = true;
                    return;
                }else if(!this.password){
                    this.alertText = '请输入密码';
                    this.showAlert = true;
                    return;
                }else if(!this.verification){
                    this.alertText = '请输入验证码';
                    this.showAlert = true;
                    return;
                }

                //获取用户信息,返回值正确将用户信息存入vuex，否则弹出提示框
                alert(this.userAccount + ',' + this.password + ',' + this.verification);
                this.userInfo = await accountLogin(this.userAccount, this.password, this.verification);
                if(!this.userInfo.user_id){  
                    this.alertText = this.userInfo.message;
                    this.showAlert = true;
                    this.getVerification();
                }else{
                    this.RECORD_USERINFO(this.userInfo);
                    this.$router.go(-1);
                }
            },
            closeTip() {
                this.showAlert = false;
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../style/mixin';

    #login{
        padding-top: 2.5rem;
        .login_form{
            background: #fff;
            .input_container{
                display: flex;
                justify-content: space-between;
                padding: .6rem .8rem;
                border-bottom: 1px solid #f1f1f1;
                input{
                    @include sc(.7rem, #666);
                }
                .switch{
                    position: relative;
                    height: .7rem;
                    width: 2rem;
                    background: #ccc;
                    padding: 0 .2rem;
                    border-radius: .5rem;
                    justify-content: center;
                    display: flex;
                    span{
                        margin-right: .2rem;
                        color: #fff;
                        font-size: .6rem;
                        line-height: .6rem;
                        transform: translateY(.05rem);
                    }
                    span:nth-of-type(2){
                        margin-top: -.2rem;
                        margin-right: 0;
                        font-size: .8rem;
                    }
                    .circle{
                        position: absolute;
                        left: -.2rem;
                        top: -.2rem;
                        width: 1.2rem;
                        height: 1.2rem;
                        border-radius: 50%;
                        background: #f1f1f1;
                        transition: all .3s;
                        z-index: 1; 
                    }
                    .trans_to_right{
                        transform: translateX(1.3rem);
                    }
                }
                .change_to_text{
                    background: #4cd964;
                }
            }
            .verify_container{
                height: 2.2rem;
                .change_verify{
                    display: flex;
                    align-items: center;
                    img{
                        width: 3.5rem;
                        height: 1.5rem;
                        margin-right: .2rem;
                    }
                    .change_img{
                        display: flex;
                        flex-wrap: wrap;
                        width: 2rem;
                        justify-content: center;
                        p{
                            font-size: .6rem;
                            color: #666;
                        }
                        p:nth-of-type(2){
                            color: #3b95e9;
                            margin-top: .2rem;
                        }
                    }
                }
            }
        }

        .login_tips{
            padding: .4rem .6rem;
            font-size: .6rem;
            line-height: .5rem;
            color: red;
        }

        .submit{
            margin: 0 .5rem 1rem;
            background: #4cd964;
            line-height: 2rem;
            height: 2rem;
            font-size: .7rem;
            text-align: center;
            color: #fff;
            border-radius: .15rem;
        }

        .forget{
            float: right;
            font-size: .6rem;
            color: #3b95e9;
            margin-right: .3rem;
        }
    }
</style>
