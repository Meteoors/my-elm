<template>
    <div id='confirm_order'>
        <section v-if='!showLoading'>
            <head-top go-back='true' head-title='确认订单' login='true'></head-top>

            <router-link to='/confirmOrder/chooseAddress' class='address_wrapper'>
                <div class='left'>
                    <svg class='location'>
                        <use xlink:href='#location'></use>
                    </svg>
                    <div class='no_address' v-if='!chosenAddress'>请添加一个收货地址</div>
                    <div v-else class='address'>
                        <header>
                            <span class='name'>{{chosenAddress.name}}</span>
                            <span>{{chosenAddress.sex == 1 ? '先生':'女士'}}</span>
                            <span>{{chosenAddress.phone}}</span>
                        </header>
                        <p>
                            <span class='tag' v-if='chosenAddress.tag' :style='{backgroundColor: tagColor(chosenAddress.tag)}'>{{chosenAddress.tag}}</span>
                            <span class='detail ellipsis'>{{chosenAddress.address_detail}}</span>
                        </p>
                    </div>
                </div>
                <svg class='arrow_right'>
                    <use xlink:href='#arrow-right'></use>
                </svg>
            </router-link>

            <section class='time_wrapper'>
                <div class='left'>送达时间</div>
                <div class='right'>
                    <p class='time'>尽快送达 | 预计 {{checkoutData.delivery_reach_time}}</p>
                    <p v-if='checkoutData.cart.is_deliver_by_fengniao' class='mode'>蜂鸟专送</p>
                </div>
            </section>

            <section class='pay_info'>
                <div class='pay'>
                    <span class='title'>支付方式</span>
                    <div class='more_type' @click="showPayWay = true">
                        <span class='way'>在线支付</span>
                        <svg class='arrow_right'>
                            <use xlink:href='#arrow-right'></use>
                        </svg>
                    </div>
                </div>
                <div class='hongbao'>
                    <span>红包</span>
                    <span>暂时只在饿了么APP中支持</span>
                </div>
            </section>

            <section class='food'>
                <header class='title'>
                    <img :src="imgBaseUrl + checkoutData.cart.restaurant_info.image_path">
                    <span>{{checkoutData.cart.restaurant_info.name}}</span>
                </header>
                <ul class='food_ul'>
                    <li class='food_li' v-for='(item, index) in checkoutData.cart.groups[0]' :key='index'>
                        <span class='name ellipsis'>{{item.name}}</span>
                        <div class='right'>
                            <span class='num'>x {{item.quantity}}</span>
                            <span class='price'>￥{{item.price}}</span>
                        </div>
                    </li>
                </ul>

                <div class='price_item' v-if='checkoutData.cart.extra'>
                    <span class='ellipsis'>{{checkoutData.cart.extra[0].name}}</span>
                    <span>￥ {{checkoutData.cart.extra[0].price}}</span>
                </div>
                <div class='price_item'>
                    <span>配送费</span>
                    <span>￥ {{checkoutData.cart.deliver_amount}}</span>
                </div>

                <div class='total_price'>
                    <span class='ellipsis'>订单 ￥{{checkoutData.cart.total}}</span>
                    <span>待支付 ￥{{checkoutData.cart.total}}</span>
                </div>
            </section>

            <section class='extra'>
                <router-link to='/confirmOrder/remark' class='item'>
                    <span class='title'>订单备注</span>
                    <div class='detail'>
                        <span class='ellipsis'>{{remark ? remark : '口味、偏好等'}}</span>
                        <svg class='arrow_right'>
                            <use xlink:href='#arrow-right'></use>
                        </svg>
                    </div>
                </router-link>

                <router-link to='/comfirmOrder/invoice' class='item'>
                    <span class='title'>发票抬头</span>
                    <div class='detail'>
                        <span>不需要开发票</span>
                        <svg class='arrow_right'>
                            <use xlink:href='#arrow-right'></use>
                        </svg>
                    </div>
                </router-link>
            </section>

            <section class='pay_bar'>
                <div class='num'>待支付 ￥{{checkoutData.cart.total}}</div>
                <div class='pay' @click='confirmOrder'>确认下单</div>
            </section>

            <transition name='slide_up'>
                <section class='pay_way' v-show='showPayWay'>
                <header>支付方式</header>
                <ul class='pay_ul'>
                    <li :class='{chosen: payWayId == item.id}' @click='choosePayWay(item.is_online_payment, item.id)' v-for='(item, index) in checkoutData.payments' :key='index'>
                        <span>{{item.name}}<span v-if='!item.is_online_payment'>{{item.description}}</span></span>
                        <svg class='select'>
                            <use xlink:href='#select'></use>
                        </svg>
                    </li>
                </ul>
                </section>
            </transition>

            <transition name='fade'>
                <div class='cover' @click='showPayWay = false' v-show='showPayWay'></div>                
            </transition>

        </section>

        <alert-tip @closeTip='showAlert= false' v-show='showAlert' :alertText='alertText'></alert-tip>

        <loading v-if='showLoading'></loading>

        <transition name='slide'>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import headTop from '../../components/head/header';
    import alertTip from '../../components/common/alert';
    import loading from '../../components/common/loading';
    import {imgBaseUrl} from '../../config/env';
    import { mapState, mapMutations } from 'vuex';
    import { checkoutData, getAddress, confirmOrder } from '../../service/getData';

    export default {
        data() {
            return {
                geohash: '',
                shopId: null,
                imgBaseUrl,
                checkoutData: null,
                remark: '',
                showPayWay: false,
                payWayId: 1,
                shopCart: null,
                showAlert: false,
                alertText: '',
                showLoading: true
            }
        },
        created() {
            this.geohash = this.$route.query.geohash;
            this.shopId = this.$route.query.shopId;

            this.INIT_BUYCART();    //从localStorage取出buyCart
            this.shopCart = this.buyCart[this.shopId];  //取得当前购物车信息

            this.initData();
        },
        components: {
            headTop, alertTip, loading
        },
        computed: {
            ...mapState([
                'buyCart', 'userInfo', 'chosenAddress'
            ])
        },
        methods: {
            ...mapMutations([
                'INIT_BUYCART', 'CHOOSE_ADDRESS', 'SAVE_ORDER', 'ORDER_SUCCESS', 'SAVE_ADDRESS'
            ]),
            async initData() {
                //checkout，需要newArr作为参数，遍历shopCart取出newArr
                let newArr = [];
                Object.values(this.shopCart).forEach(category => {
                    Object.values(category).forEach(item => {
                        Object.values(item).forEach(food => {
                            newArr.push({
                                attrs: [],
                                extra: {},
                                id: food.id,
                                name: food.name,
                                packing_fee: food.packing_fee,
                                price: food.price,
                                quantity: food.num,
                                sku_id: food.id,
                                specs: [food.specs],
                                stock: food.stock
                            })
                        })
                    })
                })

                this.checkoutData = await checkoutData(this.geohash, [newArr], this.shopId);
                this.initAddress();
                this.showLoading = false;                
            },
            async initAddress() {
                if(this.userInfo && this.userInfo.user_id){ //确保userInfo初始化成功后再请求数据（watch）
                    let res = await getAddress(this.userInfo.user_id);
                    if(res instanceof Array && res.length){
                        this.CHOOSE_ADDRESS(res[0]);
                    }
                    this.SAVE_ADDRESS(res);
                }
            },
            //转换地址标签颜色
            tagColor(tag) {
                switch(tag){
                    case '公司': return '#4cd964';
                    case '学校': return '#3190e8';
                }
            },
            //选择付款方式
            choosePayWay(isOnline, id) {
                if(isOnline){
                    this.payWayId = id;
                    this.showPayWay = false;
                }
            },
            async confirmOrder() {
                //用户未登录弹出提示框
                if(!this.userInfo.user_id){
                    this.showAlert = true;
                    this.alertText = '请登录';
                    return
                //未选择收货地址弹出提示
                }else if(!this.chosenAddress){
                    this.showAlert = true;
                    this.alertText = '请添加一个收货地址';
                    return
                }

                //保存订单信息
                this.SAVE_ORDER({
                    user_id: this.userInfo.user_id,
                    cart_id: this.checkoutData.cart_id,
                    address_id: this.chosenAddress.id,
                    description: this.remark,
                    entities: this.checkoutData.cart.groups,
                    geohash: this.geohash,
                })

                let res = await confirmOrder(this.userInfo.user_id, this,checkoutData.cart.id, this.chosenAddress.id, this.shopId, this.geohash, this.remark, this.checkoutData.cart.groups);
                //第一次下单需要验证手机号
                if(res.need_validation) {
                    this.$router.push('/comfirmOrder/userValidation');
                }else{
                    //成功下单记录后返回信息，跳转支付页
                    this.ORDER_SUCCESS(res);    
                    this.$router.push('/confirmOrder/payment');
                }
            }
        },
        watch: {
            userInfo() {
                this.initAddress();
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../style/mixin';

    #confirm_order{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 40;
        background: #f5f5f5;
        padding-top : 1.8rem;
        padding-bottom: 3rem;
        overflow: auto;
        
        .slide-enter, .slide_leave-to{
            transform: translateX(2rem);
        }
        .slide-enter-active, .slide-leave-active{
            transition: all .4s;
        }

        .slide_up-enter, .slide_up-leave-to{
            opacity: 0;
            transform: translateY(8rem);
        }
        .slide_up-enter-active, .slide_up-leave-active{
            transition: all .4s;
        }

        .fade-enter, .fade-leave-to{
            opacity: 0;
        }
        .fade-enter-active, .fade-leave-active{
            transition: opacity .4s;
        }

        .address_wrapper{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 .6rem;
            background: url(../../images/address_bottom.png) left bottom repeat-x;
            background-color: #fff;
            min-height: 3.5rem;
            background-size: auto .12rem;
            .left{
                flex: 1;
                display: flex;
                align-items: center;
                svg{
                    fill: $blue;
                    height: .8rem;
                    width: .8rem;
                    margin-right: .2rem;
                }
                .no_address{
                    font-size: .7rem;
                    line-height: .7rem;
                }
                .address{
                    header{
                        span{
                            font-size: .6rem;
                        }
                        .name{
                            font-size: .8rem;
                            font-weight: 700;
                        }
                    }
                    .tag{
                        padding: 0 .2rem;
                        font-size: .6rem;
                        line-height: .7rem;
                        height: .8rem;
                        border-radius: .15rem;
                        background: #ff5722;
                        color: #fff;
                        margin-right: .3rem;
                    }
                    .detail{
                        font-size: .6rem;
                        color: #777;
                    }
                }
            }
            svg{
                height: .6rem;
                width: .6rem;
                fill: #999;
            }
        }

        .time_wrapper{
            margin-top: .4rem;
            min-height: 4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-left: 4px solid $blue;
            background: #fff;
            padding: 0 .7rem;
            .left{
                font-size: .8rem;
                font-weight: 700;
                padding-left: .3rem;
            }
            .right{
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                .time{
                    font-size: .7rem;
                    color: $blue;
                }
                .mode{
                    background: $blue;
                    margin-top: .5rem;
                    color: #fff;
                    font-size: .6rem;
                    border-radius: .25rem;
                    padding: .1rem .25rem;
                }
            }
        }

        .pay_info{
            margin-top: .4rem;
            background: #fff;
            padding: 0 .7rem;
            .pay{
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #f5f5f5;
                line-height: 2rem;
                .title{
                    font-size: .7rem;
                    color: #666;
                }
                .more_type{
                    display: flex;
                    align-items: center;
                    .way{
                        font-size: .6rem;
                        color: #aaa;
                        margin-right: .2rem;
                    }
                    svg{
                        fill: #ccc;
                        height: .5rem;
                        width: .5rem;
                    }
                }
            }
            .hongbao{
                line-height: 2rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                span{
                    font-size: .6rem;
                    color: #aaa;
                }
            }
        }

        .food{
            margin-top: .4rem;
            background: #fff;
            header{
                padding: .7rem;
                border-bottom: 1px solid #f5f5f5;
                display: flex;
                align-items: center;
                img{
                    @include wh(1.2rem, 1.2rem);
                    margin-right: .3rem;
                }
                span{
                    font-size: .8rem;
                    line-height: .8rem;
                }
            }

            .food_ul{
                margin-top: .5rem;
                li{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 .7rem;
                    line-height: 1.8rem;
                    .name{
                        font-size: .65rem;
                        color: #666;
                        width: 11rem;
                    }
                    .right{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        flex: 1;
                        .num{
                            font-size: .65rem;
                            color: #f60;
                        }
                        .price{
                            font-size: .65rem;
                            color: #666;
                        }
                    }
                }
            }

            .price_item{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 .7rem;
                line-height: 1.8rem;
                span{
                    font-size: .65rem;
                    color: #666;
                }
                span:first-child{
                    width: 11rem;
                }
            }

            .total_price{
                border-top: 1px solid #f5f5f5;
                display: flex;
                padding: 0 .7rem;
                line-height: 2rem;
                justify-content: space-between;
                align-items: center;
                span{
                    flex: 1;
                    color: #666;
                    font-size: .65rem;
                }
                span:last-child{
                    color: #f60;
                    text-align: right;
                }
            }
            
        }

        .extra{
            background: #fff;
            margin-top: .4rem;
            padding: 0 .7rem;            
            .item{
                display: flex;
                line-height: 2rem;
                justify-content: space-between;
                align-items: center;
                .title{
                    font-size: .7rem;
                    color: #666;
                }
                .detail{
                    display: flex;
                    align-items: center;
                    span{
                        font-size: .6rem;
                        color: #aaa;
                        margin-right: .3rem;
                    }
                    svg{
                        fill: #ccc;
                        @include wh(.5rem, .5rem);
                    }
                }
            }
            .item:first-child{
                border-bottom: 1px solid #f5f5f5;
            }
        }

        .pay_bar{
            position: fixed;
            bottom: 0;
            left: 0;
            width:100%;
            height: 2rem;
            display: flex;
            div{
                line-height: 2rem;
                font-size: .75rem;
                color: #fff;
            }
            .num{
                padding-left: .7rem;
                flex: 5;
                background: #3c3c3c;
            }
            .pay{
                text-align: center;
                flex:2;
                background: #56d176;
            }
        }

        .pay_way{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: #fff;
            min-height: 8rem;
            z-index: 101;
            header{
                line-height: 2rem;
                text-align: center;
                font-size: .7rem;
                background: #fafafa;
            }
            .pay_ul{
                padding: 0 .7rem;
                li{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    line-height: 2.5rem;
                    span{
                        font-size: .7rem;
                        color: #ccc;
                    }
                    svg{
                        fill: #eee;
                        @include wh(.8rem, .8rem);
                    }
                }
                .chosen{
                    span{
                        color: #333;
                    }
                    svg{
                        fill: #4cd964;
                    }
                }
            }
        }

        .cover{
            position: fixed;
            background: rgba(0,0,0,.3);
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 100;
        }


        
    }
</style>
