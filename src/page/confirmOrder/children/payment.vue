<template>
    <div id='paymenet'>
        <head-top go-back='true' head-title='在线支付'></head-top>
        
        <section class='time'>
            <div class='title'>剩余支付时间</div>
            <div class='num'>{{remainTime}}</div>
        </section>

        <p class='payTitle'></p>

        <section class='payWay'>
            <div class='item' :class='{active: payWay == 1}' @click='payWay = 1'>
                <div class='icon_wrapper'>
                    <img src="../../../images/zhifubao">
                    <span>支付宝</span>
                </div>
                <svg>
                    <use xlink:href='#select'></use>
                </svg>
            </div>
            <div class='item' :class='{active: payWay == 2}' @click='payWay = 2'>
                <div class='icon_wrapper'>
                    <img src="../../../images/weixin">
                    <span>微信</span>
                </div>
                <svg>
                    <use xlink:href='#select'></use>
                </svg>
            </div>
        </section>

        <div class='btn' @click='confirm'>确认支付</div>

        <alert-tip v-show='showAlert' :alertText='alertText' @closeTip='closeTip'></alert-tip>
    </div>
</template>

<script>
    import headTop from '../../../components/head/header';
    import alertTip from '../../../components/common/alert';
import { mapState, mapMutations } from 'vuex';

    export default {
        data() {
            return {
                showAlert: false,
                alertText: '',
                payWay: 1,
                countNum: 900   //15min
            }
        },
        components: {
            headTop, alertTip
        },
        created() {
            this.initData();

            //启动倒计时
            this.timer = setInterval(() => {
                this.countNum --;
                if(this.countNum == 0){
                    clearInterval(this.timer);
                    this.showAlert = true;
                    this.alertText = '支付超时';
                }
            }, 1000);
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
        computed: {
            ...mapState([
                'shopId'
            ]),
            remainTime() {
                let min = Math.floor(this.countNum/60);
                if(min < 10){
                    min = '0' + min;
                }
                let sec = this.countNum%60;
                if(sec < 10){
                    sec = '0' + sec;
                }
                return `00 : ${min} : ${sec}`;
            }
        },
        methods: {
            ...mapMutations([
                'CLEAR_CART'
            ]),
            initData() {
                if(this.shopId){
                    this.CLEAR_CART(this.shopId);
                }
            },
            confirm() {
                this.showAlert = true;
                this.alertText = '当前环境无法支付，请打开APP进行付款';
            },
            closeTip() {
                this.showAlert = false;
                this.$router.push('/order');    //关闭弹窗后跳转至订单列表页
            }
        }
    }
</script>

<style lang='scss' scoped>
    #payment{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 45;
        background: #f5f5f5;
        padding-top: 1.9rem;
        .time{
            background: #fff;
            
        }
    }
</style>
