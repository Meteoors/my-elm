<template>
    <div class='compute_time'>
        <span class='remain_time' @click='pay'>
            {{remainTime}}
        </span>
        <alert-tip v-if='showAlert' :alertText='alertText' @closeTip='showAlert = false'></alert-tip>
    </div>
</template>

<script>
    import alertTip from '../../components/common/alert'

    export default {
        data() {
            return {
                countNum: 900,  //倒计时15分钟
                showAlert: false,
                alertText: ''
            }
        },
        props: ['time'],
        created () {
            this.countNum -= this.time;
            this.computeTime();
        },
        components: {
            alertTip
        },
        computed: {
            remainTime() {
                let min = Math.floor(this.countNum/60);
                let sec = this.countNum%60;
                if(min < 10){
                    min = '0' + min;
                }
                if(sec < 10){
                    sec = '0' + sec;
                }
                return '去支付(还剩' + min + '分' + sec + '秒)';
            }
        },
        methods: {
            computeTime() {
                this.timer = setInterval(() => {
                    this.countNum --;
                    if(this.countNum == 0){
                        this.showAlert = true;
                        this.alertText = '支付超时';
                        clearInterval(this.timer);
                        this.$emit('changePayment');
                    }
                }, 1000)
            },
            pay() {
                this.showAlert = true;
                this.alertText = '暂不开放支付接口'
            }
        }
    }
</script>

<style lang='scss' scoped>
    .compute_time{
        font-size: 0;
        .remain_time{
            display: inline-block;
            color: orange;
            border: 1px solid orange;
            font-size: .6rem;
            line-height: .9rem;
            height: 1.05rem;
            padding: 0 .15rem;
            border-radius: .15rem;
        }
    }
</style>
