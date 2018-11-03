<template>
    <div id='invoice'>
        <head-top go-back='true' head-title='选择发票抬头'></head-top>

        <div class='no_invoice' @click='toggleInvoice'>
            <span>不需要开发票</span>
            <svg :class='{active: isChosen}'>
                <use xlink:href='#select'></use>
            </svg>
        </div>

        <div class='btn' @click='confirm'>确定</div>
    </div>
</template>

<script>
    import headTop from '../../../components/head/header';

    export default {
        data() {
            return {
                isChosen: false
            }
        },
        components: {
            headTop
        },
        methods: {
            toggleInvoice() {
                this.isChosen = !this.isChosen;
            },
            confirm() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang='scss' scoped>
    #invoice{
        position: fixed;
        left:0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 45;
        background: #f5f5f5;
        padding-top: 2.4rem;
        .no_invoice{
            background: #fff;
            padding: 0 .7rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 2.5rem;
            span{
                font-size: .75rem;
            }
            svg{
                width: .8rem;
                height: .8rem;
                fill: #999;
            }
            .active{
                fill: #4cd964;
            }
        }
        .btn{
            margin: .5rem .7rem;
            text-align: center;
            font-size:.7rem;
            background: #4cd964;
            line-height: 1.8rem;
            border-radius: .2rem;
            color: #fff;
        }
    }
</style>
