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
            <div class='input_container'>
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
    import { getVerify } from '../../service/getData';

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
                    this.verification = res.code;
                }
            },
            closeTip() {
                this.showAlert = false;
            },
            async reset() {

            }
        }
    }
</script>

<style lang='scss' scoped>

</style>
