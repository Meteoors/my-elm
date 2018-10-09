<template>
    <div class='cart_control'>
        <transition name='roll'>
            <svg @click='num--' v-show='num'>
                <use xlink:href='#cart-minus'></use>
            </svg>
        </transition>
        <transition name='fade'>
            <div class='num' v-show='num'>{{num}}</div>
        </transition>
        <svg @click='num++'>
            <use xlink:href='#cart-add'></use>
        </svg>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                num: 1
            }
        }
    }
</script>

<style lang='scss' scoped>
    .cart_control{
        display: flex;
        align-items: center;
        svg{
            fill: #3190e8;
            width: .9rem;
            height: .9rem;
        }
        .num{
            font-size: .65rem;
            color: #666;
            min-width: 1rem;
            text-align: center;
            padding-right: .1rem;
        }

        .roll-enter, .roll-leave-to{
            transform: translateX(1rem) rotate(180deg);
            opacity: 0;
        }
        .roll-enter-active, .roll-leave-active{
            transition: all .3s;
        }

        .fade-enter{
            opacity: 0;
        } 
        .fade-enter-active{
            transition: all .3s ease-out;
        }
        
    }
</style>
