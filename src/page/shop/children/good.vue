<template>
    <div class='goods' v-if='menu'>
        <section class='nav' ref='left'>
            <ul class='nav_ul'>
                <li class='nav_li' :class='{active: index==currentIndex}' v-for='(item, index) in menu' :key='index' @click='selectNav(index, $event)'>
                    <img :src="getImgPath(item.icon_url)" v-if='item.icon_url'>
                    <span class='name'>{{item.name}}</span>
                    <div class='num' v-if='categoryNumList[index]'>{{categoryNumList[index]}}</div>
                </li>
            </ul>
        </section>

        <section class='good_wrapper' ref='right'>
            <ul class='type_ul'>
                <li class='type_li' v-for='(item, index) in menu' :key='index'>
                    <header class='type_head'>
                        <span class='name'>{{item.name}}</span>
                        <span class='text'>{{item.description}}}</span>
                    </header>

                    <ul class='good_ul'>
                        <li class='good_li' v-for='(good, index) in item.foods' :key='index'>
                            <img :src="imgBaseUrl + good.image_path" class='avatar'>
                            <div class='detail'>
                                <h4 class='title'>
                                    <span class='name'>{{good.name}}</span>
                                    <ul class='icon_ul'>
                                        <li class='icon_li' :class='{new: icon.icon_name == "新"}' :style="{borderColor:'#'+icon.icon_color}" v-for='(icon, index) in good.attributes' :key='index'>
                                            <p :style="{color: icon.icon_name=='新' ? '#fff' : '#' + icon.icon_color}">
                                                {{icon.icon_name == '新' ? '新品' : icon.icon_name}}
                                            </p>
                                        </li>
                                    </ul>
                                </h4>
                                <p class='description' v-if='good.description'>{{good.description}}</p>
                                <p class='sell'>
                                    <span>月售{{good.month_sales}}份</span>
                                    <span>好评率{{good.satisfy_rate}}</span>
                                </p>
                                <p class='activity' v-if='good.activity'>
                                    <span :style='{color: "#"+good.activity.image_text_color, borderColor: "#" + good.activity.icon_color}'>
                                        {{good.activity.image_text}}
                                    </span>
                                </p>
                                <div class='price'>
                                    <span class='num'>￥{{good.specfoods[0].price}}</span>
                                    <span v-if='good.specifications.length'>起</span>
                                    <div class='cart_conrtol_wrapper'>
                                        <cart-control :item='good' parent='good' @showSpecsList='showSpecsList' @showReduce='showReduce'></cart-control>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>

        <section class='specs_wrapper' v-if='showSpecs'>
            <transition name='fade'>
                <div class='cover' v-show='showSpecs' @click='showSpecsList'></div>
            </transition>

            <div class='specs'>
                <header class='name'>{{specsFood.name}}</header>
                <h4 class='title'>{{specsFood.specifications[0].name}}</h4>
                <ul class='specs_ul'>
                    <li class='specs_li' :class='{choose: index == specsIndex}' v-for='(item, index) in specsFood.specifications[0].values' :key='index' @click='chooseSpecs(index)'>
                        {{item}}
                    </li>
                </ul>
                <footer class='foot'>
                    <span class='price'>￥{{specsFood.specfoods[specsIndex].price}}</span>
                    <div class='add_cart' @click='addSpecs(specsFood)'>加入购物车</div>
                </footer>
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" class="close" @click="showSpecsList">
                    <line x1="0" y1="0" x2="16" y2="16"  stroke="#666" stroke-width="1.2"/>
                    <line x1="0" y1="16" x2="16" y2="0"  stroke="#666" stroke-width="1.2"/>
                </svg>
            </div>
        </section>

        <section class='reduce_tip' v-show='showReduceTip'>多规格商品只能去购物车删除哦</section>

    </div>
</template>

<script>
    import { shopMenu } from '../../../service/getData';
    import {imgBaseUrl} from '../../../config/env';
    import {getImgPath} from '../../../components/common/mixin';
    import BScroll from 'better-scroll';
    import cartControl from './children/cartcontrol';
    import {mapState, mapMutations} from 'vuex';

    export default {
        data() {
            return {
                menu: null, //当前商铺食品列表
                imgBaseUrl,
                categoryNumList: [],  //各分类下食品数量列表
                topList: [],  //右侧菜单各分类顶部高度列表
                scrollY: 0,  //滚动高度
                changeIndex: true,  //控制滚动右侧菜单时是否监听分类index的改变
                currentIndex: 0,  //右侧菜单当前滚动分类index
                specsFood: null,  //选中的多规格食物
                specsIndex: 0,  //多规格食物的规格index
                showSpecs: false,  //显示多规格选择框,
                showReduceTip: false    //多规格移除提示
            }
        },
        async created() {
            this.menu = await shopMenu(this.shopId);
            this.$nextTick(() => {
                this._initScroll();
                this._initTops();
            });
            this.initData();
        },
        mixins: [getImgPath],
        methods: {
            ...mapMutations([
                'ADD_CART', 'RECORD_CARTLIST'
            ]),
            _initScroll() {
                //better-scroll阻止了默认的事件（preventDefault）
                //若要实现点击事件，初始化的时候传递属性click，可派发点击事件
                //pc下没被阻止，可能发生2次点击事件，BS派发的事件含有_constructed属性
                this.left = new BScroll(this.$refs.left, {
                    click: true
                });

                this.right = new BScroll(this.$refs.right, {
                    click: true,
                    probeType: 3
                })

                this.right.on('scroll', pos => {
                    this.scrollY = Math.abs(pos.y);
                    this.computeIndex();
                })
            },
            //计算右侧每个食品分类的高度
            _initTops() {
                let top = 0;
                this.topList.push(top);
                
                let rightItems = this.$refs.right.getElementsByClassName('type_li');
                [].slice.call(rightItems).forEach(li => {
                    top += li.clientHeight;
                    this.topList.push(top);
                });
            },
            //点击左侧导航，右侧食品列表滚动到对应位置
            selectNav(index, event) {
                //过滤原生点击事件
                if(!event._constructed){
                    return
                }else{
                    let el = this.$refs.right.getElementsByClassName('type_li')[index];

                    //changeIndex解决运动时computeIndex依旧监听的bug
                    this.changeIndex = false;
                    this.currentIndex = index;
                    this.right.scrollToElement(el, 300);

                    //滚动结束后重置changeIndex
                    this.right.on('scrollEnd', () => {
                        this.changeIndex = true;
                    })
                }
            },
            //计算属性 -> 方法，解决点击左侧菜单导航时currentIndex不稳定的问题
            computeIndex() {
                if(this.changeIndex){
                    const {scrollY, topList} = this;
                    this.currentIndex = topList.findIndex((top, index) => {
                        return scrollY >= top-140 && scrollY < topList[index+1]-140; 
                    })
                }
            },
            //初始化cartList和categoryNumList
            initData() {
                let cartList = [];     //购物车商品列表
                let cartListNum = 0;    //购物车商品列表序号
                let newArr = [];    //临时的categoryNumList
                this.menu.forEach((category, index) => {   //遍历商品分类列表
                    if(this.shopcart && this.shopcart[category.id]){  //商家有购物车信息且购物车信息中含有当前分类下商品
                        let categoryNum = 0;    //该分类下初始商品数量
                        Object.keys(this.shopcart[category.id]).forEach((item_id) => {  //遍历该分类下所有商品
                            Object.keys(this.shopcart[category.id][item_id]).forEach((food_id) => { //遍历商品规格
                                let food = this.shopcart[category.id][item_id][food_id];    //取得该规格商品
                                if(!food) return;
                                categoryNum += food.num;    //更新分类商品数量（food.num可能为0）
                                if(food.num > 0){   //该规格商品数量大于0时，向购物车商品列表加入该商品
                                    cartList[cartListNum] = {};
                                    cartList[cartListNum].category_id = category.id;
                                    cartList[cartListNum].item_id = item_id;
                                    cartList[cartListNum].food_id = food_id;
                                    cartList[cartListNum].num = food.num;
                                    cartList[cartListNum].name = food.name;
                                    cartList[cartListNum].price = food.price;
                                    cartList[cartListNum].specs = food.specs;
                                    cartList[cartListNum].packing_fee = food.packing_fee;
                                    cartListNum ++;
                                }
                            })
                        })
                        newArr[index] = categoryNum; 
                    }else{
                        newArr[index] = 0; 
                    }
                })
                this.categoryNumList = newArr;
                this.RECORD_CARTLIST(cartList);
                console.log(cartList)
            },
            showSpecsList(food) {
                if(food){
                    this.specsFood = food;
                }
                this.showSpecs = !this.showSpecs;
                this.specsIndex = 0;
            },
            chooseSpecs(index) {
                this.specsIndex = index;
            },
            addSpecs(food) {
                let shop_id = this.shopId,
                    category_id = food.category_id,
                    item_id = food.item_id,
                    food_id = food.specfoods[this.specsIndex].food_id,
                    name = food.name,
                    price = food.specfoods[this.specsIndex].price,
                    specs = food.specifications[0].values[this.specsIndex],
                    packing_fee = food.specfoods[this.specsIndex].packing_fee;

                this.ADD_CART({shop_id, category_id, item_id, food_id, name, price, specs, packing_fee});
                this.showSpecsList();
            },
            showReduce() {
                this.showReduceTip = true;
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.showReduceTip = false;
                }, 1800);
                
            }
        },
        // computed: {
        //     currentIndex() {
        //         const {scrollY, topList} = this;
        //         return topList.findIndex((top, index) => {
        //             return scrollY >= top && scrollY < topList[index+1]; 
        //         })
        //     }
        // }
        computed: {
            ...mapState([
                'buyCart', 'shopId'
            ]),
            shopcart() {
                return this.buyCart[this.shopId];
            }
        },
        watch: {
            shopcart: function (value){
                console.log(111);
                this.initData();
            }
        },
        components: {
            cartControl
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../style/mixin';

    .goods{
        flex: 1;
        display: flex;
        padding-bottom: 2rem;
        position: relative;
        .nav{
            width: 3.8rem;
            .nav_ul{
                li{
                    height: 2.7rem;
                    position: relative;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid $bc;
                    border-left: 3px solid #f8f8f8;
                    padding-left: .3rem;
                    img{
                        width: .5rem;
                        height: .6rem;
                        margin-right: .2rem;
                    }
                    .name{
                        font-size: .6rem;
                        color: #666;
                    }
                    .num{
                        position: absolute;
                        background: #ff461d;
                        color: #fff;
                        font-size: .6rem;
                        top: .1rem;
                        right: 0;
                        height: .75rem;
                        min-width: .75rem;
                        text-align: center;
                        line-height: .75rem;
                        border-radius: 50%;
                        padding: 0 .1rem;
                    }
                }
                .active{
                    border-left: 3px solid $blue;
                    background: #fff;
                    .name{
                        color: #666;
                        font-weight: 700;
                    }
                }
            }
        }

        .good_wrapper{
            flex: 1 0 auto;
            overflow: auto;
            .type_ul{
                .type_li{
                    .type_head{
                        height: 2rem;
                        display: flex;
                        padding: .4rem;
                        align-items: center;
                        overflow: hidden;
                        white-space: nowrap;
                        .name{
                            font-size: .7rem;
                            font-weight: 700;
                            color: #666;
                            margin-right: .3rem;
                        }
                        .text{
                            font-size: .6rem;
                            color: #999;
                        }
                    }
                    .good_ul{
                        background: #fff;
                        .good_li{
                            display: flex;
                            padding: .6rem .4rem;
                            position: relative;
                            overflow: hidden;
                            border-bottom: 1px solid #f2f2f2;
                            .avatar{
                                width: 2rem;
                                height: 2rem;
                                margin-right: .4rem;
                            }
                            .detail{
                                flex: 1;
                                .title{
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    margin-bottom: .2rem;
                                    .name{
                                        font-size: .7rem;
                                        line-height: .95rem;
                                        font-weight: bold;
                                    }
                                    .icon_ul{
                                        display: flex;
                                        li{
                                            border: 1px solid #666;
                                            border-radius: .3rem;
                                            padding: 0 .1rem;
                                            font-size: 0;
                                            margin-right: .1rem;
                                            height: .8rem;
                                            transform: scale(.85);
                                            p{
                                                font-size: .6rem;
                                                line-height: .7rem;
                                            }                                            
                                        }
                                        .new{
                                            position: absolute;
                                            top: 0;
                                            left: 0;
                                            background: #4cd946;
                                            @include wh(2rem, 2rem);
                                            display: flex;
                                            align-items: flex-end;
                                            border: none;
                                            border-radius: 0;
                                            padding: 0;
                                            transform: translate(-1rem, -1rem) rotate(-45deg);
                                            p{
                                                font-size: .6rem;
                                                line-height: .6rem;
                                                text-align: center;
                                                flex: 1;
                                                color: #fff;
                                            }
                                        }
                                    }
                                }
                                .description{
                                    font-size: .6rem;
                                    color: #999;
                                    line-height: .6rem;
                                }
                                .sell{
                                    line-height: .85rem;
                                    margin-bottom: .1rem;
                                    span{
                                        font-size: .6rem;
                                        line-height: .6rem;
                                    }
                                }
                                .activity{
                                    line-height: .6rem;
                                    span{
                                        font-size: .6rem;
                                        border: 1px solid #fff;
                                        border-radius: .3rem;
                                        padding: 0 .08rem;
                                        display: inline-block;
                                        transform: scale(.8);
                                        transform-origin: left center;
                                    }
                                }
                                .price{
                                    line-height: .7rem;
                                    margin-top: .35rem;
                                    position: relative;
                                    .num{
                                        color: #f60;
                                        font-weight: 700;
                                        margin-right: .3rem;
                                    }
                                    span{
                                        font-size: .7rem;
                                        line-height: .7rem;
                                    }
                                    .cart_conrtol_wrapper{
                                        @include ct;
                                        right: 0;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        //无效？？？？！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        .fade-enter, .fade-leave-to{
            opacity: 0;
        }
        .fade-enter-active, .fade-leave-active{
            transition: all 1s;
        }
        .specs_wrapper{
            position: fixed;
            top: 11rem;
            left: 2.4rem;
            width: 11.2rem;
            background: #fff;
            .cover{
                position: fixed;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.4);
                z-index: 40;
            }

            .specs{
                position: relative;
                z-index: 50;
                background: #fff;
                border-radius: .25rem;
            }

            .name{
                height: 2rem;
                line-height: 2rem;
                text-align: center;
                font-size: .7rem;
                color: #222;
                font-weight: 400;
                margin-bottom: .5rem;
            }
            .title{
                padding-left: .5rem;
                font-size: .6rem;
                color: #666;
            }
            .specs_ul{
                padding: .4rem .5rem;;
                display: flex;
                margin-bottom: .5rem;
                li{
                    padding: .3rem .5rem;
                    font-size: .6rem;
                    border: 1px solid #ddd;
                    margin: 0 .5rem .2rem 0;
                    border-radius: .2rem;
                }
                .choose{
                    border-color: $blue;
                    color: $blue;
                }
            }
            .foot{
                padding: .5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .price{
                    font-size: .8rem;
                    font-weight: 700;
                    color: #ff6000;
                }
                .add_cart{
                    color: #fff;
                    background: $blue;
                    border-radius: .2rem;
                    text-align: center;
                    width: 4rem;
                    height: 1.3rem;
                    line-height: 1.3rem;
                    font-size: .6rem; 
                }
            }
            .close{
                position: absolute;
                top: .5rem;
                right: .5rem;
            }
        }

        .reduce_tip{
            position: fixed;
            z-index: 40;
            top: 50%;
            left: 15%;
            width: 70%;
            background: rgba(0,0,0,.8);
            text-align: center;
            padding: .5rem 0;
            color: #fff;
            font-size: .65rem;
            border-radius: .25rem;
        }
    }

</style>
