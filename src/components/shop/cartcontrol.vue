<template>
    <div class='cart_control'>
        <transition name='roll'>
            <svg @click.stop='reduceCart' v-show='num' class='reduce'>
                <use xlink:href='#cart-minus'></use>
            </svg>
        </transition>
        <transition name='fade'>
            <div class='num' v-show='num'>{{num}}</div>
        </transition>
        <svg @click.stop='addCart($event)' class='add'>
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
        props: ['parent', 'item'],  //item为父组件传来的商品对象，可能来自于buyCart或cartList
        created() {
            this.init();
        },
        methods: {
            ...mapMutations([
                'ADD_CART', 'REDUCE_CART', 'RECORD_SPEC', 'RECORD_SHOWSPEC'
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
            showSpecsList(food){
                this.RECORD_SPEC(food);
                this.RECORD_SHOWSPEC(true);
            },
            addCart(event) {        
                if(this.item.specifications && this.item.specifications.length){    //多规格商品通知good组件显示多规格选择框
                    this.showSpecsList(this.item);      //父组件为good，且选中食物为多规格
                }else{
                    if(this.parent == 'good'){      //父组件为good，选中食物为单规格
                        this.$emit('drop', event.target);
                    }
                    let shop_id = this.shopId,      //父组件为shopcart
                        category_id = this.item.category_id,
                        item_id = this.item.item_id,
                        food_id = this.item.food_id || this.item.specfoods[0].food_id,
                        name = this.item.name,
                        price = this.item.price || this.item.specfoods[0].price,
                        specs = '',
                        // packing_fee = this.item.packing_fee || this.item.specfoods[0].packing_fee,
                        packing_fee = 0,
                        stock = this.item.stock || this.item.specfoods[0].stock;

                    this.ADD_CART({shop_id, category_id, item_id, food_id, name, price, specs, packing_fee, stock});
                }
            },
            reduceCart() {
                if(this.item.specifications && this.item.specifications.length){    //多规格商品显示只能到购物车删除提示
                    this.$emit('showReduce');
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
    @import '../../style/mixin';

    .cart_control{
        display: flex;
        align-items: center;
        z-index: auto;
        svg{
            fill: #3190e8;
            width: .9rem;
            height: .9rem;
            padding: .6rem 0;
        }
        .reduce{
            padding-left: .6rem;
        }
        .add{
            padding-right: .6rem;
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
