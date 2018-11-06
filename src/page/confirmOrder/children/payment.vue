<template>
    <div id='payment'>
        <head-top go-back='true' head-title='在线支付'></head-top>
        
        <section class='time'>
            <div class='title'>支付剩余时间</div>
            <div class='num'>{{remainTime}}</div>
        </section>

        <p class='payTitle'>选择支付方式</p>

        <section class='payWay'>
            <div class='item' @click='payWay = 1'>
                <div class='icon_wrapper'>
                    <img src="../../../images/zhifubao.png">
                    <span>支付宝</span>
                </div>
                <svg :class='{active: payWay == 1}'>
                    <use xlink:href='#select'></use>
                </svg>
            </div>
            <div class='item' @click='payWay = 2'>
                <div class='icon_wrapper'>
                    <img src="../../../images/weixin.png">
                    <span>微信</span>
                </div>
                <svg :class='{active: payWay == 2}'>
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
                this.alertText = '当前环境无法支付，请打开官方APP进行付款';
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
            padding: 1.7rem 0;
            text-align: center;
            .title{
                font-size: .6rem;
                color: #666;
            }
            .num{
                margin-top: .3rem;
                font-size: 1.5rem;
                font-family: Helvetica Neue,Tahoma,Arial;
            }
        }

        .payTitle{
            padding: 0 .7rem;
            color: #666;
            line-height: 1.8rem;
            font-size: .7rem;
        }

        .payWay{
            background: #fff;
            .item{
                padding: .4rem .7rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                line-height: 2.6rem;
                .icon_wrapper{
                    display: flex;
                    align-items: center;
                    img{
                        width: 2rem;
                        height: 2rem;
                    }
                    span{
                        margin-left: .2rem;
                        font-size: .7rem;
                        color: #666;
                    }
                }
                svg{
                    fill: #ccc;
                    width: 1rem;
                    height: 1rem;
                }
                .active{
                    fill: #4cd964;
                }
            }
            .item:first-child{
                border-bottom:1px solid #f5f5f5;
            }
        }

        .btn{
            margin: .5rem .7rem;
            color: #fff;
            text-align: center;
            background: #4cd964;
            font-weight: 700;
            font-size: .7rem;
            line-height: 1.8rem;
            border-radius: .2rem;
        }
    }
</style>
