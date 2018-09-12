<template>
    <div id='msite'>
        <head-top login='true'>
            <router-link class='search' to='/food/geohash' slot='search'>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
	    			<circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
	    			<line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
	    		</svg>
            </router-link>

            <router-link to='/home' slot='msite-title' class='title'>
                <span class='title_text ellipsis'>{{address}}</span>
            </router-link>
        </head-top>

        <nav class='nav'>
            <div class='swiper-container'>
                <div class='swiper-wrapper'>
                    <div class='swiper-slide' v-for='(foodgroup, index) in foodType' :key='index'>
                        <router-link to='/food' v-for='food in foodgroup' :key='food.id' class='food'>
                            <figure>
                                <img :src="imgBaseUrl + food.image_url" class='food_img'>
                                <figcaption class='food_title'>{{food.title}}</figcaption>
                            </figure>
                        </router-link>
                    </div>
                </div>
                <div class='swiper-pagination'></div>
            </div>
        </nav>

        <div class='shoplist_container'>
            <header class='shoplist_head'>
                <svg class='shop_icon'>
                    <use xlink:href='#shop'></use>
                </svg>
                <span>附近商家</span>
            </header>

            <!-- <shop-list></shop-list> -->
        </div>

    </div>
</template>

<script>
    import '../../plugin/swiper.min.js'
    import '../../style/swiper.min.css'
    import {msiteAddress, msiteFoodTypes} from '../../service/getData'


    export default {
        data () {
            return {
                address: '',
                foodType: [],
                geohash: '',
                imgBaseUrl: 'https://fuss10.elemecdn.com'
            }
        },
        async created () {
            this.geohash = this.$route.query.geohash;
            let res = await msiteAddress();
            this.address = res.name; //根据url查询地址名称
        },
        mounted () {
            msiteFoodTypes(this.geohash).then(res => {
                let time = res.length % 8;
                let arr = [];
                for(var i=0; i<time; i++){
                    arr[i] = res.splice(0, 8);
                }
                if (res.length > 0){
                    arr[i+1] = res;
                }
                this.foodType = arr;
            }).then(() => {
                new Swiper('.swiper-container'), {
                    pagination: '.swiper-pagination',
                    loop: true
                }
            })
        }

    }
</script>

<style lang='scss'>
    @import '../../style/mixin';

    #msite{
        padding-top: 2.1rem;

        .search{
            @include wh(1.5rem, 1.5rem);
            @include ct;
            left: .8rem;
        }
        .title{
            width: 50%;
            @include center;
            text-align: center;
            .title_text{
                @include sc(1rem, #fff);
            }
        }

        .nav{
            height: 8.5rem;
            background: #fff;
            border-bottom: 1px solid $bc;
            margin-bottom: .4rem;
        }
    }
</style>
