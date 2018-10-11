<template>
    <div class='cart_control'>
        <transition name='roll'>
            <svg @click.stop='reduceCart' v-show='num'>
                <use xlink:href='#cart-minus'></use>
            </svg>
        </transition>
        <transition name='fade'>
            <div class='num' v-show='num'>{{num}}</div>
        </transition>
        <svg @click.stop='addCart'>
            <use xlink:href='#cart-add'></use>
        </svg>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';

    export default {
        data() {
            return {
                num: 0
            }
        },
        props: ['parent', 'item'],
        created() {
            this.init();
        },
        methods: {
            ...mapMutations([
                'ADD_CART', 'REDUCE_CART'
            ]),
            init() {
                if(this.parent == 'shopcart'){
                    this.num = this.item.num;
                }else{
                    let itemNum = 0;
                    this.cartList.forEach(food => {
                        if(this.item.item_id == food.item_id){
                            itemNum += food.num;
                        }
                    })
                    this.num = itemNum;
                }
            },
            addCart() {
                if(this.item.specifications.length){    //多规格商品通知good组件显示多规格选择框
                    this.$emit('showSpecsList', this.item);
                }else{
                    let shop_id = this.shopId,
                        category_id = this.item.category_id,
                        item_id = this.item.item_id,
                        food_id = this.item.food_id || this.item.specfoods[0].food_id,
                        name = this.item.name,
                        price = this.item.price || this.item.specfoods[0].price,
                        specs = '',
                        packing_fee = this.item.packing_fee || this.item.specfoods[0].packing_fee;

                    this.ADD_CART({shop_id, category_id, item_id, food_id, name, price, specs, packing_fee});
                }
            },
            reduceCart() {
                if(this.item.specifications && this.item.specifications.length){    //多规格商品显示只能到购物车删除提示
                    this.$emit('showReduce');
                    // this.showReduceTip = true;
                    // clearTimeout(this.timer);
                    // this.timer = setTimeout(() => {
                    //     this.showReduceTip = false;
                    // }, 3000);
                }else{
                    let shop_id = this.shopId,
                        category_id = this.item.category_id,
                        item_id = this.item.item_id,
                        food_id = this.item.food_id || this.item.specfoods[0].food_id;

                    this.REDUCE_CART({shop_id, category_id, item_id, food_id});
                }
            }

        },
        computed: {
            ...mapState([
                'cartList', 'shopId'
            ])
        },
        watch: {
            cartList() {
                this.init();
            }
        }
    }
</script>

<style lang='scss' scoped>
    .cart_control{
        display: flex;
        align-items: center;
        z-index: auto;
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
