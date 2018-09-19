<template>
    <div id='forget'>
        <head-top go-back='true' head-title='重置密码'></head-top>

        <form class='forget_form'>
            <div class='input_container'>
                <input type="text" placeholder="账号" v-model='userAccount'>
            </div>
            <div class='input_container'>
                <input type="password" placeholder="旧密码" v-model='oldPassword'>
            </div>
            <div class='input_container'>
                <input type="password" placeholder="请输入新密码" v-model='newPassword'>
            </div>
            <div class='input_container'>
                <input type="password" placeholder="请确认密码" v-model='confirmPassword'>
            </div>
            <div class='input_container verify_container'>
                <input type="text" placeholder="验证码" maxlength="4" v-model='verification'>
                <div class='change_verify'>
                    <img :src="verifyImg">
                    <div class='change_img' @click='getVerification'>
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </div>
        </form>

        <div class='submit' @click='reset'>确认修改</div>

        <alert-tip :alertText='alertText' v-if='showAlert' @closeTip='closeTip'></alert-tip>
    </div>
</template>

<script>
    import headTop from '../../components/head/header'
    import alertTip from '../../components/common/alert'
    import { getVerify, changePassword } from '../../service/getData';

    export default {
        data () {
            return {
                userAccount: '',
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
                verification: '',
                verifyImg: '',
                alertText: null,
                showAlert: false
            }
        },
        components: {
            headTop,
            alertTip
        },
        created() {
            this.getVerification();
        },
        methods: {
            async getVerification() {
                let res = await getVerify();
                if(res.status == 1){
                    this.verifyImg = res.code;
                }
            },
            closeTip() {
                this.showAlert = false;
            },
            async reset() {
                if (!this.userAccount) {
                    this.alertText = '请输入正确的账号';
                    this.showAlert = true;
                    return;
                }else if(!this.oldPassword){
                    this.alertText = '请输入旧密码';
                    this.showAlert = true;
                    return;
                }else if(!this.newPassword){
                    this.alertText = '请输入新密码';
                    this.alertText = true;
                    return;
                }else if(!this.confirmPassword){
                    this.alertText = '请输入确认密码';
                    this.showAlert = true;
                    return;
                }else if(this.newPassword !== this.confirmPassword){
                    this.alertText = '两次输入的密码不一致';
                    this.showAlert = true;
                    return;
                }else if(!this.verification){
                    this.alertText = '请输入验证码';
                    this.showAlert = true;
                    return;
                }

                let res = await changePassword(this.userAccount, this.oldPassword, this.newPassword, this.confirmPassword, this.verification);
                if (res.message) {
                    this.alertText = res.message;
                    this.showAlert = true;
                    this.getVerification;
                    return;
                }else{
                    this.alertText = res.success;
                    this.showAlert = true;
                }
            }
        }
    }
</script>

<style lang='scss' scoped>

    #forget{
        padding-top: 2.5rem;
        .forget_form{
            background: #fff;
            margin-bottom: 1rem;
            .input_container{
                padding: .6rem .8rem;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #f1f1f1;
                input{
                    font-size: .7rem;
                    color: #666;
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
                        justify-content: center;
                        width: 2rem;
                        p{
                            font-size: .6rem;
                            color: #666;
                        }
                        p:nth-of-type(2){
                            margin-top: .2rem;
                            color: #3b95e9;
                        }
                    }
                }
            }
        }

        .submit{
            margin: 0 .5rem;
            height: 2rem;
            line-height: 2rem;
            font-size: .7rem;
            background: #4cd964;
            text-align: center;
            color: #fff;
            border-radius: .15rem;
        }
    }
</style>
