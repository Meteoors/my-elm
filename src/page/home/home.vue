<template>
    <div class='home'>
        <head-top login='true'>
            <span slot='logo' class='logo' @click='reload'>ele.me</span>
        </head-top>

        <div class='location'>
            <span class='left'>当前定位城市：</span>
            <span class='right'>定位不准时，请在城市列表中选择</span>
        </div>

        <router-link :to="'/city/' + guessid" class='city_guess' tag='div'>
            <span class='left'>{{guessCity}}</span>
            <svg class='right'>
                <use xlink:href='#arrow-right'></use>
            </svg>
        </router-link>

        <div class='hot'>
            <div class='title'>热门城市</div>
            <ul class='hot_list clear'>
                <router-link :to="'/city/' + item.id" tag='li' class='hot_item' v-for='(item, index) in hotCity' :key='index'>
                    {{item.name}}
                </router-link>
            </ul>
        </div>

        <div class='group'>
            <ul>
                <li v-for='(group, key, index) in groupCity' :key='key'>
                    <div class='title'>{{key}}
                        <span class='explain' v-if='index == 0'>（按字母排序）</span>
                    </div>
                    <ul class='group_list clear'>
                        <router-link :to="'/city/' + city.id" tag='li' class='group_item' v-for='(city, index) in group' :key='index' >
                            {{city.name}}
                        </router-link>
                    </ul>
                </li>
            </ul>        
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/head/header.vue'
    import {cityGuess, hotCity, groupCity} from '../../service/getData'

    export default {
        data() {
            return {
                guessCity:'广州',
                hotCity: ['上海','北京','广州','杭州','成都','重庆','深圳'],
                groupCity: ['上海','北京','广州','杭州','成都','重庆','深圳'],
                guessid: 0
            }
        },
        created() {
            //获取当前城市
            cityGuess().then(res => {
                this.guessCity = res.name;
                this.guessid = res.id;
            })

            //获取热门城市
            hotCity().then(res => {
                this.hotCity = res;
            })

            //获取所有城市
            groupCity().then(res => {
                this.groupCity = res;
            })
        },
        components: {
            headTop
        },
        methods: {
            reload () {
                window.location.reload();
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../style/mixin.scss';

    .home{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 0;
        background-color: #f5f5f5;

        .logo{
            left: 0.4rem;
            @include ct;
            font-size: 0.7rem;
            color: #fff;
            height: 0.7rem;
        }

        .location{
            background-color: #fff;
            height: 3.8rem;
            font-size: 0.6rem;
            border-bottom: 1px solid $bc;
            position: relative;
            .left{
                position: absolute;
                left: 0.4rem;
                bottom:0.4rem;
                color:#666;
            }
            .right{
                position: absolute;
                right: 0.4rem;
                bottom: 0.4rem;
                color: #9f9f9f;
                font-weight: 900;
            }
        }

        .city_guess{
            background-color: #fff;
            margin-bottom: 0.4rem;
            height: 1.8rem;
            border-bottom: 1px solid $bc;
            position: relative;
            .left{
                left: 0.4rem;
                color: $blue;
                @include ct;
                font-size:0.7rem;
            }
            .right{
                right: 0.4rem;
                fill: #999;
                @include ct;
                width: 0.6rem;
                height: 0.6rem;
            }
        }

        .hot{
            font-size: 0.6rem;
            border-top: 1px solid $bc;
            background-color: #fff;
            .title{
                height: 1.6rem;
                line-height: 1.6rem;
                padding-left: 0.4rem;
                border-bottom: 1px solid $bc;
            }
            .hot_list{
                li{
                    float: left;
                    width: 25%;
                    height: 1.8rem;
                    line-height: 1.8rem;
                    color: $blue;
                    text-align: center;
                    border-right: 1px solid $bc;
                    border-bottom: 1px solid $bc;
                }
                li:nth-of-type(4n){
                    border-right: none;
                }
            }
        }

        .group{
            margin-top: 0.4rem;
            font-size: 0.6rem;
            background-color: #fff;
            border-top: 1px solid $bc;
            .title{
                height: 1.6rem;
                line-height: 1.6rem;
                padding-left: 0.4rem;
                border-bottom: 1px solid $bc;
                .explain{
                    color: #999;
                }
            }
            .group_list{
                li{
                    line-height: 1.8rem;
                    height: 1.8rem;
                    width: 25%;
                    float:left;
                    text-align: center;
                    border-bottom: 1px solid $bc;
                    border-right: 1px solid $bc;
                }
                li:nth-of-type(4n){
                    border-right: none;
                }
            }
        }
    }
    
</style>
