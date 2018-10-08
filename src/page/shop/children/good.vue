<template>
    <div class='goods' v-if='menu'>
        <div class='nav' ref='left'>
            <ul class='nav_ul'>
                <li class='nav_li' :class='{active: index==currentIndex}' v-for='(item, index) in menu' :key='index' @click='selectNav(index, $event)'>
                    <img :src="getImgPath(item.icon_url)" v-if='item.icon_url'>
                    <span class='name'>{{item.name}}</span>
                    <div class='num' v-if='categoryNum[index]'>{{categoryNum[index]}}</div>
                </li>
            </ul>
        </div>

        <div class='good_wrapper' ref='right'>
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
                                <p class='price'>
                                    <span class='num'>￥{{good.specfoods[0].price}}</span>
                                    <span v-if='good.specifications.length'>起</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { shopMenu } from '../../../service/getData';
    import {imgBaseUrl} from '../../../config/env';
    import {getImgPath} from '../../../components/common/mixin';
    import BScroll from 'better-scroll';

    export default {
        data() {
            return {
                menu: null,
                imgBaseUrl,
                categoryNum: [],
                topList: [],
                scrollY: 0,
                changeIndex: true,
                currentIndex: 0
            }
        },
        props: ['shopId'],
        async created() {
            this.menu = await shopMenu(this.shopId);
            this.$nextTick(() => {
                this._initScroll();
                this._initTops();
            })
        },
        mixins: [getImgPath],
        methods: {
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
            }
        }
        // computed: {
        //     currentIndex() {
        //         const {scrollY, topList} = this;
        //         return topList.findIndex((top, index) => {
        //             return scrollY >= top && scrollY < topList[index+1]; 
        //         })
        //     }
        // }
    }
</script>

<style lang='scss' scoped>
    @import '../../../style/mixin';

    .goods{
        flex: 1;
        display: flex;
        padding-bottom: 2rem;
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
                        padding: 0 .1rem;
                        height: .8rem;
                        line-height: .8rem;
                        border-radius: 50%;
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
                                    .num{
                                        color: #f60;
                                        font-weight: 700;
                                        margin-right: .3rem;
                                    }
                                    span{
                                        font-size: .7rem;
                                        line-height: .7rem;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

</style>
