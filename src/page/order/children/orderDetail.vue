<template>
    <div id='order_detail'>
        <head-top go-back='true' head-title='订单详情'></head-top>
        
        <section class='overview'>
            <img :src="imgBaseUrl + orderDetail.restaurant_image_url">
            <div class='status'>{{orderDetail.status_bar.title}}</div>
            <div class='more'>再来一单</div>
        </section>

        <section class='food'>
            <header>
                <img :src="imgBaseUrl + orderDetail.restaurant_image_url">
                <span class='name'>{{orderDetail.restaurant_name}}</span>
                <svg>
                    <use xlink:href='#arrow-right'></use>
                </svg>
            </header>
            <ul class='food_ul'>
                <li v-for='(food, index) in orderDetail.basket.group[0]' :key='index'>
                    <span class='name'>{{food.name}}</span>
                    <div class='right'>
                        <span class='num'>X{{food.quantity}}</span>
                        <span class='price'>￥{{food.price}}</span>
                    </div>
                </li>
            </ul>
            <div class='item'>
                <span>{{orderDetail.basket.deliver_fee.name}}</span>
                <span>￥{{orderDetail.basket.deliver_fee.price}}</span>
            </div>
            <div class='item'>
                <span>{{orderDetail.basket.packing_fee.name}}</span>
                <span>￥{{orderDetail.basket.packing_fee.price}}</span>
            </div>

            <div class='total'>实付{{orderDetail.total_amount}}</div>
        </section>

        <section class='info'>
            <header>配送信息</header>
            <p>送达时间：{{orderData.deliver_time}}</p>
            <div class='address'>
                <span class='left'>送货地址</span>
                <div class='right'>
                    <p>{{orderData.consignee}}</p>
                    <p>{{orderData.phone}}</p>
                    <p>{{orderData.addressDetail}}</p>
                </div>
            </div>
            <p>配送方式：蜂鸟专送</p>
        </section>
        <section class='info'>
            <header>订单信息</header>
            <p>订单号：{{orderDetail.id}}</p>
            <p>支付方式：在线支付</p>
            <p>下单时间：{{orderDetail.formatted_created_at}}</p>
        </section>
    </div>
</template>

<script>
    import headTop from '../../../components/head/header';
    import { mapState, mapMutations } from 'vuex';
    import { getOrderDetail } from '../../../service/getData';

    export default {
        data() {
            return {
                orderData
            }
        },
        created() {
            this.init();
        },
        components: {
            headTop
        },
        computed: {
            ...mapState([
                'orderDetail', 'userInfo'
            ])
        },
        methods: {
            ...mapMutations([
                'SAVE_ORDERDETAIL'
            ]),
            async init() {
                if(this.userInfo && this.userInfo.user_id){
                    this.orderData = await getOrderDetail(this.userInfo.user_id, this.orderDetail.id);
                }
            },

        }
    }
</script>

<style lang='scss'>

</style>
