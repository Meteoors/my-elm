<template>
    <div id='msite'>
        <head-top login='true'>
            <router-link class='search' :to="`/search/${geohash}`" slot='search'>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
	    			<circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
	    			<line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
	    		</svg>
            </router-link>

            <router-link to='/home' slot='msite-title' class='title ellipsis'>
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

            <shop-list></shop-list>
        </div>

        <foot-guide parent='msite'></foot-guide>
    </div>
</template>

<script>
    import '../../plugins/swiper.min.js'
    import '../../style/swiper.min.css'
    import headTop from '../../components/head/header'
    import footGuide from '../../components/foot/footer'
    import shopList from '../../components/common/shoplist'
    import {msiteAddress, msiteFoodTypes, cityGuess} from '../../service/getData'
    import {mapMutations, mapState} from 'vuex'


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
            if(!this.$route.query.geohash){
                let address = await cityGuess();
                this.geohash = address.latitude + ',' + address.longitude;  //默认地址
            }else{
                this.geohash = this.$route.query.geohash; //从url取出geohash           
            }
            this.SAVE_GEOHASH(this.geohash); //geohash存入vuex
            let res = await msiteAddress(this.geohash);     //等待回应时子组件shoplist的created已经开始使用vuex的latitude和longitude
            this.address = res.name; //根据geohash详细定位，取得地址名称

            this.RECORD_ADDRESS(res); //latitude,longitude存入vuex
        },
        mounted () {
            msiteFoodTypes().then(res => {
                let time = Math.floor(res.length/8);    //将食品类型列表分组（每8个一组）
                let arr = [];
                for(var i=0; i<time; i++){
                    arr[i] = res.splice(0, 8);
                }
                if (res.length > 0){
                    arr[i+1] = res;
                }
                this.foodType = arr;
            }).then(() => {
                new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    loop: true
                })
            })
        },
        computed: {
            ...mapState([
                'longitude', 'latitude'
            ])
        },
        components: {
            headTop,
            shopList,
            footGuide
        },
        methods: {
            ...mapMutations([
                'RECORD_ADDRESS', 'SAVE_GEOHASH'    
            ])
        }

    }
</script>

<style lang='scss' scoped>
    @import '../../style/mixin';

    #msite{
        padding-top: 2.1rem;

        .search{
            @include wh(0.9rem, 0.95rem);    
            @include ct;
            left: .8rem;
        }
        .title{
            width: 50%;
            @include center;
            text-align: center;
            color: #fff;
            line-height: 1rem;
            margin-left: -.5rem;
            .title_text{
                @include sc(0.8rem, #fff);
            }
        }

        .nav{
            height: 8.65rem;
            background: #fff;
            padding-top: 0.1rem;
            border-bottom: 1px solid $bc;
            margin-bottom: .4rem;
            .swiper-container{
                // height: 8.1rem;
                padding-bottom: 0.6rem;
                overflow: hidden;
                position: relative;
                .swiper-wrapper{
                    height: 7.5rem;
                    .swiper-slide{
                        height: 7.5rem;
                        display: flex;
                        flex-wrap: wrap;
                        .food{
                            @include wh(25%, 3.75rem);
                            padding: 0.3rem 0;
                            .food_img{
                                @include wh(1.8rem, 1.8rem);
                                display: block;
                                margin:0 auto;
                                margin-bottom: 0.5rem;
                            }
                            .food_title{
                                line-height: 0.8rem;
                                font-size: 0.6rem;
                                color: #666;
                                text-align: center;
                            }
                        }
                    }
                }
                .swiper-pagination{
                    position: absolute;
                    bottom: 0.2rem;
                }
            }
        }

        .shoplist_container{
            border-top: 1px solid $bc;
            background-color: #fff;
            .shoplist_head{
                .shop_icon{
                    vertical-align: middle;
                    margin-left:.6rem;
                    fill: #999;
                    @include wh(.6rem, .6rem);
                }
                span{
                    color: #999;
                    font-size: .6rem;
                    line-height: 1.6rem;
                }
            }
            
        }
    }
</style>
