<template>
    <div class='shopcart'>
        <section class='cart_wrapper'>
            <div class='left'>
                <div class='icon_wrapper'>
                    <svg class='cart_icon'>
                        <use xlink:href='#cart-icon'></use>
                    </svg>
                    <span class='count' v-if='totalNum'>{{totalNum}}</span>
                </div>
                <div class='price'>
                    <p class='sum'>￥{{totalPrice}}</p>
                    <p class='delivery'>配送费￥{{deliveryFee}}</p>
                </div>
            </div>
            <div class='right'>
                <span class='not_enough' v-if='minPrice > 0'>还差￥4343起送</span>
                <router-link :to='{path: "confirmOrder", query:{geohash, shopId}}' v-else class='pay'>去结算</router-link>
            </div>
        </section>
    </div>
</template>

<script>
    export default {}
</script>

<style lang='scss'>

</style>
