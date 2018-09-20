<template>
    <div id='order'>
        <head-top go-back='true' head-title='订单列表'></head-top>

        <ul class='order_ul'>
            <li class='order_li' v-for='(order, index) in orderlist' :key='index'>
                <div class='avator'>
                    <img src="imgBaseUrl + order.restaurant_umage_url">
                </div>
                <div class='detail'>
                    <div class='top'>
                        <div class='title'>
                            <span class='name'>效果演示</span>
                            <span class='pay'>等待支付</span>
                        </div>
                        <div class='date'>2018-09-20 17:58</div>
                    </div>
                    <div class='middle'>
                        
                    </div>
                </div>
            </li>
        </ul>

        <foot-guide parent='order'></foot-guide>
    </div>
</template>

<script>
    export default {}
</script>

<style lang='scss'>

</style>
