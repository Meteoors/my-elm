<template>
    <div class='alert'>
        <div class='icon_circle'>
            <div class='icon_line'></div>
            <div class='icon_point'></div>
        </div>
        <p class='text'>{{alertText}}</p>
        <div class='btn' @click='closeTip'>确定</div>
    </div>
</template>

<script>
    export default {
        props: ['alertText'],
        methods: {
            closeTip() {
                this.$emit('closeTip');
            }
        }
    }
</script>

<style lang='scss' scoped>
    @keyframes tipMove {
        0%   { transform: scale(1) }
        35%  { transform: scale(0.8) }
        70%  { transform: scale(1.1) }
        100% { transform: scale(1) }

    }

    .alert{
        animation: tipMove .4s;
        background: #fff;
        position: fixed;
        left: 50%;
        top: 50%;
        margin-left: -6rem;
        margin-top: -6rem;
        width: 12rem;
        padding-top: .6rem;
        border-radius: .25rem;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .icon_circle{
            width: 3rem;
            height: 3rem;
            border: .15rem solid #f8cb86;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .icon_line{
                width: .12rem;
                height: 1.5rem;
                background: #f8cb86;
            }
            .icon_point{
                width: .2rem;
                height: .2rem;
                margin-top: .2rem;
                border-radius: 50%;
                background: #f8cb86;
            }
        }
        .text{
            margin-top: .8rem;
            font-size: .7rem;
            line-height: .9rem;
            color: #333;
        }
        .btn{
            margin-top: .8rem;
            color: #fff;
            font-weight: 700;
            width: 100%;
            line-height: 1.8rem;
            background: #4cd964;
            text-align: center;
            font-size: .8rem;
        }
    }
</style>
