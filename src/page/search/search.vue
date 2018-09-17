<template>
    <div id='search'>
        <head-top headTitle='搜索' goBack='true'></head-top>

        <form class='search_form'>
            <input type="search" name='search' class='search_text' placeholder="请输入商家或美食名称" v-model='searchValue' @input='checkInput'>
            <input type="submit" name='submit' class='submit' value='提交' @click.prevent='search(searchValue)'>
        </form>

        <div class='seller' v-if='shoplist.length'>
            <h4 class='title'>商家</h4>
            <ul class='shop_ul'>
                <router-link class='shop' :to="{path:'/shop', query:{geohash, id:shop.id}}" v-for='(shop, index) in shoplist' :key='index' tag='li'>
                    <div class='avator'>
                        <img :src="imgBaseUrl + shop.image_path">
                    </div>
                    <div class='right'>
                        <div class='detail'>
                            <p class='shop_title'>
                                <span class='name'>{{shop.name}}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="14" class="pay_icon">
                                    <polygon points="0,14 4,0 24,0 20,14" style="fill:none;stroke:#FF6000;stroke-width:1" />
                                    <line x1="1.5" y1="12" x2="20" y2="12" style="stroke:#FF6000;stroke-width:1.5"/>
                                    <text x="3.5" y="9" style="fill:#FF6000;font-size:9;font-weight:bold;">支付</text>
                                </svg>
                            </p>
                            <p class='count'>月售{{shop.recent_order_num}}单</p>
                            <p class='delivery'>
                                {{shop.float_minimum_order_amount}} 元起送 / 距离{{shop.distance}}
                            </p>
                        </div>
                        <ul class='activities'>
                            <li class='activity' v-for='(activity, index) in shop.activities' :key='index'>
                                <span class='icon' :style="{backgroundColor: '#' + activity.icon_color}">
                                    {{activity.icon_name}}
                                </span>
                                <span class='name'>{{activity.name}}</span>
                                <span class='only_phone'>手机用户专享</span>
                            </li>
                        </ul>
                    </div>
                </router-link>
            </ul>
        </div>

        <div class='history' v-if='searchList.length&&showHistory'>
            <h4 class='title'>搜索历史</h4>
            <ul class='history_ul'>
                <li class='history_li' v-for='(history, index) in searchList' :key='index' @click='search(history)'>
                    <span class='text ellipsis'>{{history}}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="delete_icon" @click.stop="deleteHistory(index)">
                        <line x1="8" y1="8" x2="18" y2="18" style="stroke:#999;stroke-width:3" />
                        <line x1="18" y1="8" x2="8" y2="18" style="stroke:#999;stroke-width:3" />
                    </svg>
                </li>
            </ul>
            <div class='clear_history' @click="clearAll">清空搜索历史</div>
        </div>

        <div class='none' v-if='emptyResult'>很抱歉！无搜索结果</div>

        <foot-guide parent='search'></foot-guide>
    </div>
</template>

<script>
    import headTop from '../../components/head/header'
    import footGuide from '../../components/foot/footer'
    import {searchRestaurant} from '../../service/getData'
    import {getStore, setStore} from '../../config/mUtils'
    import {imgBaseUrl} from '../../config/env';

    export default {
        data() {
            return {
                geohash: '',
                searchValue: '',
                searchList: [],
                showHistory: true,
                shoplist: [],
                emptyResult: false,
                imgBaseUrl
            }
        },
        created () {
            //从url中取得geohash
            this.geohash = this.$route.params.geohash;  

            //从localStorage中取得搜索历史记录
            if(getStore('searchHistory')){
                this.searchList = JSON.parse(getStore('searchHistory'));
            }
        },
        components: {
            headTop,
            footGuide
        },
        methods: {
            //搜索结束后，删除搜索内容直到为空时，清空搜索结果并显示历史记录
            checkInput() {
                if(this.searchValue == ''){
                    this.shoplist = [];
                    this.showHistory = true;
                    this.emptyResult = false;
                }
            },
            //点击提交按钮，搜索结果并显示，同时将搜索内容存入历史记录
            async search(val) {
                if (!val) return;
                this.searchValue = val;
                this.showHistory = false; //隐藏搜索历史

                this.shoplist = await searchRestaurant(this.geohash, val);  //获取搜索结果
                this.emptyResult = !this.shoplist.length;    //当搜索结果为空时，显示提示信息

                //将搜索历史存入localStorage
                if (this.searchList.length) {
                    let repeat = false;
                    this.searchList.forEach(history => {
                        if (val == history) {
                            repeat = true;
                        }
                    });
                    if (!repeat) {
                        this.searchList.push(val);
                    }
                }else{
                    this.searchList.push(val);
                }

                setStore('searchHistory', this.searchList);
            },
            //删除当前搜索历史
            deleteHistory(index) {  
                this.searchList.splice(index, 1);
                setStore('searchHistory', this.searchList);
            },
            //清空搜索历史
            clearAll() {   
                this.searchList = [];
                setStore('searchHistory', this.searchList);
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../style/mixin';

    #search{
        padding-top: 1.9rem;
        padding-bottom: 2rem;
        .search_form{
            background: #fff;
            padding: .5rem;
            display: flex;
            input{
                height: 1.5rem;
                border-radius: .125rem;
                font-weight: 700;
                font-size: .65rem;
            }
            .search_text{
                flex: 4;
                background: #f2f2f2;
                border: 1px solid $bc;
                text-indent: 0.2rem;
                color: #333;
            }
            .submit{
                flex: 1;
                background: $blue;
                color:#fff;
                margin-left: .2rem;
            }
        }

        .seller{
            background: #fff;
            .title{
                background: #f2f2f2;
                height: 2rem;
                line-height: 2rem;
                font-size: .6rem;
                text-indent: .5rem;
                font-weight: 700;
                color: #666;
            }
            .shop_ul{
                .shop{
                    display: flex;
                    border-bottom: 1px solid $bc;
                    padding: .5rem;
                    .avator{
                        img{
                            width: 1.8rem;
                            height: 1.8rem
                        }
                    }
                    .right{
                        margin-left: .3rem;
                        color: #666;
                        flex: 1;
                        .detail{
                            padding-bottom: .2rem;
                            border-bottom: 1px solid $bc;
                            font-size: .6rem; 
                            p{
                                line-height: .9rem;
                            }
                        }
                        .activities{
                            padding-top: .1rem;
                            li{
                                font-size:0;
                                span{
                                    font-size: .6rem;
                                    display: inline-block;
                                    vertical-align: middle;
                                }
                                .icon{
                                    @include sc(.6rem, #fff);
                                    padding: .04rem;
                                    border-radius: .15rem;
                                    margin-right: .125rem;
                                }
                                .only_phone{
                                    color: #ff6000;
                                }
                            }
                        }
                    }
                }
            }
        }

        .history{
            background: #fff;
            .title{
                background: #f2f2f2;
                height: 2rem;
                line-height: 2rem;
                font-size: .6rem;
                text-indent: .5rem;
                font-weight: 700;
                color: #666;
            }
            .history_ul{
                li{
                    @include font(0.7rem, 2rem);
                    border-bottom: .025rem solid $bc;
                    display: flex;
                    padding: 0 .3rem;
                    justify-content: space-between;
                    align-items: center;
                    .text{
                        width: 80%;
                    }
                    .delete_icon{
                        height: 20px;
                        width: 20px;
                    }
                }
            }
            .clear_history{
                height: 2rem;
                line-height: 2rem;
                text-align: center;
                color: $blue;
                font-size: .7rem;
                font-weight: 700;
            }
        }

        .none{
            margin-top: .125rem;
            text-align: center;
            background: #fff;
            color: #333;
            @include font(0.65rem, 1.75rem);
        }
    }
</style>
