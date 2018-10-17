<template>
    <div class='food_detail' v-if='food'>
        <head-top go-back='true' :head-title='food.name'></head-top>

        <section class='wrapper'>
            <img :src="imgBaseUrl + food.image_path" class='avatar'>
            <div class='detail'>
                <p class='description' v-if='food.description'>{{food.description}}</p>
                <h4 class='name'>{{food.name}}</h4>
                <div class='score'>
                    <span class='text'>评分</span>
                    <star :score='food.rating'></star>
                    <span class='num'>{{food.rating}}</span>
                </div>
                <div class='sell'>
                    <span class='month_sales'>月售 {{food.month_sales}} 单</span>
                    <span class='price'>售价￥{{food.specfoods[0].price}}</span>
                    <span v-if='food.specifications.length'>起</span>
                </div>
                <div class='rating'>
                    <span class='count'>评论数 {{food.rating_count}}</span>
                    <span class='satisfy'>好评率 {{food.satisfy_rate}}%</span>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import {imgBaseUrl} from '../../../config/env';
    import headTop from '../../../components/head/header'
    import star from '../../../components/common/star';

    export default {
        data() {
            return {
                food: null,
                imgBaseUrl
            }
        },
        created() {
            this.food = this.$route.query.food;
        },
        components: {
            headTop, star
        }
    }
</script>

<style lang='scss' scoped>
    .food_detail{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 2rem;
        z-index: 28;
        background: #fff;
        padding-top: 1.9rem;

        .wrapper{
            .avatar{
                width: 100%;    
                display: block;          
            }
            .detail{
                padding: 0 .5rem;
                .description{
                    font-size: .6rem;
                    line-height: .8rem;
                    color: #666;
                    padding-top: .5rem;                    
                }
                .name{
                    padding-top: .5rem;                    
                    font-size: .7rem;
                    margin-bottom: .2rem;
                }
                .score{
                    display: flex;
                    align-items: center;
                    margin-bottom: .3rem;
                    .text{
                        font-size: .6rem;
                        color: #666;
                        margin-right: .2rem;
                    }
                    .num{
                        font-size: .6rem;
                        color: #666;
                        margin-left: .2rem;
                    }
                }
                .sell{
                    font-size: 0;
                    margin-bottom: .4rem;
                    span{
                        font-size: .6rem;
                        color: #f60;
                    }
                    .month_sales{
                        margin-right: .4rem;
                        color: #666;
                    }
                }
                .rating{
                    font-size: 0;
                    span{
                        font-size: .6rem;
                        color: #666;
                        margin-right: .4rem;
                    }
                }
            }
        }
        
    }
</style>
