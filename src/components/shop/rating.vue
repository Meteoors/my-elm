<template>
    <div class='rating' ref='wrapper'>
        <div class='wrapper'>
        
            <header class='head' v-if='score'>
                <div class='left'>
                    <div class='score'>{{score.overall_score.toFixed(1)}}</div>
                    <div class='name'>综合评价</div>
                    <div class='rank'>高于周边商家{{toPercent(score.compare_rating)}}</div>
                </div>
                <div class='right'>
                    <div class='item'>
                        <span class='name'>服务态度</span>
                        <star :score='score.service_score'></star>
                        <div class='score'>{{score.service_score.toFixed(1)}}</div>                   
                    </div>
                    <div class='item'>
                        <span class='name'>菜品评价</span>
                        <star :score='score.food_score'></star> 
                        <div class='score'>{{score.food_score.toFixed(1)}}</div>                                                         
                    </div>
                    <div class='item'>
                        <span class='name'>送达时间</span>
                        <div class='time'>{{score.deliver_time}}分钟</div>                  
                    </div>  
                </div>
            </header>

            <ul class='tag_ul' v-if='tag'>
                <li class='tag_li' v-for='(item, index) in tag' :key='index' @click='chooseTag(index, item.name)' :class='{unsatisfy: item.unsatisfied, active: index == tagIndex}'>
                    {{item.name}}({{item.count}})
                </li>
            </ul>

            <ul class='rating_ul' v-if='rating'>
                <li class='rating_li' v-for='(item, index) in rating' :key='index'>
                    <img class='avatar' :src="getImgPath(item.avatar)">
                    <div class='right'>
                        <div class='user'>
                            <div class='username'>{{item.username}}</div>
                            <div class='date'>{{item.rated_at}}</div>
                        </div>
                        <div class='score'>
                            <star :score='item.rating_star'></star>
                            <span class='time' v-if='item.time_spent_desc'>{{item.time_spent_desc}}</span>
                        </div>
                        <ul class='img_ul' v-if='item.item_ratings.length'>
                            <li class='img_li' v-for='(food, index) in item.item_ratings' :key='index' v-if='food.image_hash'>
                                <img :src="getImgPath(food.image_hash)">
                            </li>
                        </ul>
                        <ul class='name_ul' v-if='item.item_ratings.length'>
                            <li class='name_li ellipsis' v-for='(food, index) in item.item_ratings' :key='index'>
                                {{food.food_name}}
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>

        </div>

        <transition name='load'>
            <loading v-if='showLoading'></loading>
        </transition>
    </div>
</template>

<script>
    import {getImgPath} from '../common/mixin';
    import star from '../common/star';
    import loading from '../common/loading';
    import { mapState } from 'vuex';
    import {getScore, getTag, getRating} from '../../service/getData';
    import BScroll from 'better-scroll';

    export default {
        data() {
            return {
                tagIndex: 0,
                rating: null,
                tag: null,
                score: null,
                tagName: '',
                showLoading: false,
                offset: 0,
                preventRepeatRequest: false //防止重复请求
            }
        },
        props: ['tab'],
        created() {
            this.initData();
            this.initScroll();
        },
        mixins: [getImgPath],
        components: {
            star, loading
        },
        computed: {
            ...mapState([
                'shopId'
            ])
        },
        methods: {
            async initData() {
                this.score = await getScore(this.shopId);
                this.tag = await getTag(this.shopId);
            },
            async initScroll() {
                this.rating = await getRating(this.shopId);
                this.$nextTick(() => {
                    this.scroll = new BScroll(this.$refs.wrapper, {
                        probeType: 3,
                        click: true
                    });
                    // console.log(this.scroll.maxScrollY);
                    this.scroll.on('scroll', (pos) => {
                        if(Math.abs(pos.y) >= Math.abs(this.scroll.maxScrollY)){
                            this.loadMore();
                            this.scroll.refresh();
                        }
                    });                    
                })
                
            },
            toPercent(num) {
                let percent = (num*100).toFixed(1);
                return percent;
            },
            chooseTag(index, name) {
                this.tagIndex = index;
                this.tagName = name;
            },
            async loadMore() {
                if(this.preventRepeatRequest) return;

                this.showLoading = true;
                this.preventRepeatRequest = true;
                this.offset += 10;

                let res = await getRating(this.shopId, this.tagName, this.offset);
                this.rating = [...this.rating, ...res];
                this.showLoading = false;

                if(res.length == 10){
                    this.preventRepeatRequest = false;
                }
            }
        },
        watch: {
            async tagIndex() {
                this.offset = 0;
                this.rating = await getRating(this.shopId, this.tagName);
            },
            tab(val) {
                if(val == 'rating'){
                    this.scroll.refresh();
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../style/mixin';

    .rating{
        height: 445px;
        overflow: hidden;

        .head{
            background: #fff;
            display: flex;
            padding: .8rem .5rem;
            align-items: center;
            margin-bottom: .5rem;
            .left{
                flex: 3;
                text-align: center;
                margin-right: 1rem;
                .score{
                    color: #f60;
                    font-size: 1.2rem;
                    line-height: 1.5rem;
                }
                .name{
                    font-size: .65rem;
                    color: #666;
                    line-height: .8rem;
                    margin-bottom: .1rem;
                }
                .rank{
                    font-size: .6rem;
                    color: #999;
                }
            }
            .right{
                flex: 4;
                .item{
                    display: flex;
                    align-items: center;
                    height: 1rem;
                    span{
                        color: #666;
                        font-size: .65rem;
                        line-height: .65rem;
                        margin-right: .5rem
                    }
                    .score{
                        margin-left: .3rem;
                        color: #f60;
                        font-size: .6rem;
                    }
                    .time{
                        color: #999;
                        font-size: .6rem;
                    }
                }
            }
        }

        .tag_ul{
            background: #fff;
            padding: .5rem .5rem .3rem;
            display: flex;
            flex-wrap: wrap;
            li{
                background: #ebf5ff;
                padding: .3rem;
                font-size: .6rem;
                line-height: .8rem;
                color: #6d7885;
                margin: 0 .4rem .2rem 0;
                border-radius: .2rem;
            }
            .unsatisfy{
                background: #f5f5f5;
                color: #aaa;
            }
            .active{
                background: $blue;
                color: #fff;
            }
        }

        .rating_ul{
            padding: 0 .5rem;
            background: #fff;
            .rating_li{
                display: flex;
                padding: .6rem 0 .4rem;
                border-top: 1px solid #f1f1f1;
                .avatar{
                    width: 1.5rem;
                    height: 1.5rem;
                    border-radius: 50%;
                    margin-right: .8rem;
                }
                .right{
                    flex: 1;
                    .user{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: .2rem;
                        .username{
                            color: #666;
                            font-size: .6rem;
                        }
                        .date{
                            color: #999;
                            font-size: .6rem;
                        }
                    }
                    .score{
                        display: flex;
                        align-items: center;
                        margin-bottom: .3rem;
                        .time{
                            margin-left: .15rem;
                            color: #666;
                            font-size: .6rem;
                        }
                    }
                    .img_ul{
                        display: flex;
                        margin-bottom: .4rem;
                        li{
                            margin-right: .4rem;
                          img{
                              width: 3rem;
                              height: 3rem;
                          }  
                        }
                    }
                    .name_ul{
                        display: flex;
                        li{
                            font-size: .6rem;
                            padding: .2rem;
                            color: #999;
                            width: 2.2rem;
                            border: .025rem solid #ebebeb;
                            border-radius: .15rem;
                            margin-right: .3rem;
                            margin-bottom: 4px;
                        }
                    }
                }
            }
        }
    }
</style>
