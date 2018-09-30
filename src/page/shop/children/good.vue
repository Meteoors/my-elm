<template>
    <div class='goods' v-if='menu'>
        <div class='nav'>
            <ul class='nav_ul'>
                <li class='nav_li' :class='{active: index==activeMenu}' v-for='(item, index) in menu' :key='index'>
                    <img :src="getImgPath(item.icon_url)" v-if='item.icon_url'>
                    <span class='name'>{{item.name}}}</span>
                    <div class='num' v-if='categoryNum[index]'>{{categoryNum[index]}}</div>
                </li>
            </ul>
        </div>

        <div class='good_wrapper'>
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
                                        <li class='icon_li' :class='{new: icon.icon_name == "新"}' :style="{borderColor:'#'+icon.icon_color, color: icon.icon_name=='新' ? '#fff' : '#' + icon.icon_color}" v-for='(icon, index) in food.attributes' :key='index'>
                                            <!-- <p :style="{color: icon.icon_name=='新' ? '#fff' : '#' + icon.icon_color}"> -->
                                            {{icon.icon_name == '新' ? '新品' : icon.icon_name}}
                                            <!-- </p> -->
                                        </li>
                                    </ul>
                                </h4>
                                <p class='description' v-if='food.description'>{{good.description}}</p>
                                <p class='sell'>
                                    <span>月售{{good.month.sales}}份</span>
                                    <span>好评率{{good.satisfy_rate}}</span>
                                </p>
                                <p class='activity' :style='{color: "#"+good.activity.image_text_color, borderColor: "#" + good.activity.icon_color}' v-if='good.activity'>
                                    {{good.activity.image_text}}
                                </p>
                                <p class='price'>
                                    <span>￥{{good.specfoods[0].price}}</span>
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
    import {getImgPath} from '../../../components/common/mixin'

    export default {
        data() {
            return {
                menu: null,
                imgBaseUrl,
                activeMenu: 0,
                categoryNum: []
            }
        },
        props: [shopId],
        async created() {
            this.menu = await shopMenu(this.shopId);
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../style/mixin';

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
                    padding-left: .15rem;
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
                        color: #333;
                        font-weight: 700;
                    }
                }
            }
        }

        .good_wrapper{
            flex: 1;
            .type_ul{
                .type_li{
                    .type_head{
                        height: 2rem;
                        display: flex;
                        padding: .4rem;
                        align-items: center;
                        .name{
                            font-size: .7rem;
                            font-weight: 700;
                            color: #666;
                        }
                    }
                }
            }
        }
    }

</style>
