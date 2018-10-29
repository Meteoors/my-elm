<template>
    <div class='shopcart'>
        <transition name='fade'>
            <section class='cover' v-show='showCart && cartList.length' @click='showCart = false'></section>
        </transition>

        <transition name='cart'>
            <section class='list_wrapper' v-show='showCart&&cartList.length'>
                <header class='title'>
                    <div class='cart'>购物车</div>
                    <div class='clear' @click='clearCart'>
                        <svg class='remove'>
                            <use xlink:href='#cart-remove'></use>
                        </svg>
                        <span>清空</span>
                    </div>
                </header>
                <section id='cartFood' class='cart_food'>
                    <ul>
                        <li v-for='(food, index) in cartList' :key='index'>
                            <div class='description'>
                                <div class='name ellipsis'>{{food.name}}</div>
                                <div class='specs' v-if='food.specs'>{{food.specs}}</div>
                            </div>
                            <span class='price'>￥{{food.price}}</span>
                            <cart-control parent='shopcart' :item='food'></cart-control>
                        </li>
                    </ul>
                </section>
            </section>
        </transition>


        <section class='cart_wrapper' @click="toggleCart">
            <div class='left'>
                <div class='icon_wrapper' :class='{icon_wrapper_active: !!totalNum}'>
                    <svg class='cart_icon'>
                        <use xlink:href='#cart-icon'></use>
                    </svg>
                    <span class='count' v-if='totalNum'>{{totalNum}}</span>
                </div>
                <div class='price'>
                    <p class='sum'>￥{{totalPrice.toFixed(2)}}</p>
                    <p class='delivery'>配送费￥{{deliveryFee}}</p>
                </div>
            </div>
            <div class='right' :class='{pay_active: minPrice-totalPrice <= 0}'>
                <span class='not_enough' v-if='minPrice-totalPrice > 0'>还差￥{{minPrice-totalPrice}}起送</span>
                <router-link :to='{path: "confirmOrder", query:{shopId, geohash}}' v-else class='pay' tag='span' @click.stop>去结算</router-link>
            </div>
        </section>

        
        
    </div>
</template>

<script>
    import cartControl from './cartcontrol';
    import { mapState, mapMutations } from 'vuex';

    export default {
        data() {
            return {
                showCart: false,
                totalNum: 0,
                totalPrice: 0,
            }
        },
        props: [
            'deliveryFee', 'minPrice' 
        ],
        created() {
            this.init();
        },
        computed: {
            ...mapState([
                'cartList', 'shopId', 'geohash'
            ])
        },
        components: {
            cartControl
        },
        methods: {
            ...mapMutations([
                'CLEAR_CART'
            ]),
            init() {
                let num = 0;
                let price = 0
                this.cartList.forEach(food => {
                    num += food.num;
                    price += food.num * food.price; 
                });
                this.totalNum = num;
                this.totalPrice = price
            },
            clearCart() {
                this.CLEAR_CART(this.shopId);
            },
            toggleCart() {
                if(this.totalNum == 0) return;
                this.showCart = !this.showCart;
            }
        },
        watch: {
            cartList() {
                this.init();
            },
            totalNum(val) {
                if(val == 0) {
                    this.showCart = false;
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../style/mixin';

    .shopcart{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2rem;
        z-index: 29;

        .fade-enter, .fade-leave-to{
            opacity: 0;
        }
        .fade-enter-active, .fade-leave-active{
            transition: opacity .5s;
        }
        .cover{
            position: fixed;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            background: rgba(0,0,0,.3);
            z-index: 25;
        }

        .cart_wrapper{
            position: relative;
            z-index: 31;
            height: 100%;
            display: flex;
            .left{
                flex: 1;
                padding-left: 3.5rem;
                background: #3d3d3f;
                .icon_wrapper{
                    position: absolute;
                    left: .5rem;
                    top: -.7rem;
                    width: 1.2rem;
                    height: 1.2rem;
                    padding: .4rem;
                    box-sizing: content-box;
                    border: .18rem solid #444;
                    border-radius: 50%;
                    background: #3d3d3f;
                    .cart_icon{
                        width: 1.2rem;
                        height: 1.2rem;
                    }
                    .count{
                        position: absolute;
                        right: -.25rem;
                        top: -.25rem;
                        background: #ff461d;
                        text-align: center;
                        min-width: .7rem;
                        height: .7rem;
                        line-height: .7rem;
                        border-radius: 50%;
                        color: #fff;
                        font-size: .6rem;
                        padding: 0 .1rem;
                    }
                }
                .icon_wrapper_active{
                    background: $blue;
                }
                .price{
                    display: flex;
                    flex-direction: column;
                    .sum{
                        color: #fff;
                        font-size: .8rem;
                        line-height: .8rem;
                        font-weight: 700;
                        margin: .15rem 0;
                    }
                    .delivery{
                         color: #fff;
                         font-size: .6rem;
                         line-height: .6rem;
                    }
                }
            }
            .right{
                width: 5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #535356;
                span{
                    font-size: .7rem;
                    font-weight: 700;
                    color: #fff;
                }
            }
            .pay_active{
                background: #4cd946;                
            }
        }

        .cart-enter, .cart-leave-to{
            transform: translateY(100%);
        }
        .cart-enter-active, .cart-leave-active{
            transition: all .3s ease-out;
        }
        .list_wrapper{
            position: absolute;
            bottom: 2rem;
            left: 0;
            right: 0;
            z-index: 30;
            .title{
                height: 1.9rem;
                padding: .3rem .6rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: #eceff1;
                .cart{
                    font-size: .7rem;
                    color: #666;
                }
                .clear{
                    display: flex;
                    align-items: center;
                    .remove{
                        width: .6rem;
                        height: .6rem;
                    }
                    span{
                        margin-left: .3rem;
                        font-size: .6rem;
                        color: #666;
                    }
                }
            }
            .cart_food{
                max-height: 9rem;
                overflow: auto;
                ul{
                    background: #fff;
                    padding: 0 .6rem;
                    li{
                        min-height: 2.2rem;
                        padding: .65rem 0;                        
                        display: flex;
                        align-items: center;
                        border-bottom: 1px solid #eceff1;
                        .description{
                            flex: 1;
                            padding-right: .1rem;
                            display: flex;
                            flex-direction: column;
                            .name{
                                font-size: .7rem;
                                line-height: .7rem;
                                font-weight: 700;
                                color:#666;
                            }
                            .specs{
                                padding-top: .2rem;
                                font-size: .6rem;
                                line-height: .6rem;
                                color: #666;
                                transform: scale(.9);
                                transform-origin: 0% 0%;
                            }
                        }
                        .price{
                            font-size: .7rem;
                            font-weight: 700;
                            color: #f60;
                            padding-right: 1.3rem;
                        }
                    }
                    li:last-child{
                        border: none;
                    }
                }
            }
        }
    }
</style>
