<template>
    <div id='city'>
        <head-top :head-title='cityname' go-back='true'>
            <div slot='changeCity' class='change_city' @click='$router.go(-1)'>切换城市</div>
        </head-top>

        <form class='search' v-on:submit.prevent>
            <input type="search" class='input' name="city" placeholder="输入学校、商务楼、地址" v-model='inputAddress' required>
            <input type="submit" class='submit' name='submit' value='提交' @click='postpos'>
        </form>

        <div class='title' v-if='historyTitle'>搜索历史</div>

        <ul class='place_ul'>
            <li class='place_li' v-for='(item, index) in placelist' :key='index' @click='nextpage(index, item.geohash)'>
                <h4 class='place_name ellipsis'>{{item.name}}</h4>
                <div class='place_address ellipsis'>{{item.address}}</div>
            </li>
        </ul>

        <div class='clearAll' v-if='historyTitle&&placelist.length' @click='clearAll'>清空所有</div>

        <div class='no_place' v-if='placeNone'>很抱歉！无搜索结果</div>
    </div>
</template>

<script>
    import headTop from '../../components/head/header'
    import {currentcity, searchplace} from '../../service/getData'
    import {getStore, setStore, removeStore} from '../../config/mUtils'

    export default {
        data() {
            return {
                cityname: '广州', //当前城市名字
                cityid: '',  //当前城市id
                inputAddress: '', //搜索地址
                historyTitle: true, //默认显示搜索历史头部，点击搜索后隐藏
                placelist: [], //搜索地址列表
                placeNone: false, //搜索无结果，显示提示信息
                placeHistory: [] //历史搜索记录
            }
        },
        created () {
            this.cityid = this.$route.params.cityid;

            currentcity(this.cityid).then(res => {
                this.cityname = res.name;
            })            
        },
        components: {
            headTop
        },
        methods: {
            //取出历史记录并显示
            init () {
                if (getStore('placeHistory')) {
                    this.placelist = JSON.parse(getStore('placeHistory'));
                }
            },
            //搜索地址
            postpos() {         
                if (this.inputAddress){
                    searchplace(this.cityid, this.inputAddress).then(res => {
                        this.historyTitle = false;
                        this.placelist = res;
                        this.placeNone = res.length? false:true;
                    })
                } 
            },
            //判断缓存的搜索历史记录中是否有当前地址，如果没有则添加
            //如果有则不重复添加，判断完成后进入下一页
            nextpage(index, geohash) {
                let choosePlace = this.placelist[index];
                let history = getStore('placeHistory'); //从缓存里取出历史记录，为JSON字符串
                
                if(history){
                    let repeat = false;  //默认为不重复
                    this.placeHistory = JSON.parse(history);
                    this.placeHistory.forEach(place => {
                        if(place.geohash === geohash){
                            repeat = true;
                        }
                    });
                    if(!repeat){  //判断地址没有重复，添加进placeHistory里
                        this.placeHistory.push(choosePlace);
                    }
                }else{ //localstorage里没有历史记录，则直接添加
                    this.placeHistory.push(choosePlace);
                }

                setStore('placeHistory', this.placeHistory) //重置缓存
                this.$routere.push({path: '/msite', query: {geohash}}); //下一页
            },
            //从缓存里清除搜索历史，更新页面
            clearAll() {
                removeStore('placeHistory');
                this.init();
            }

        },
    }
</script>

<style lang='scss' scoped>
    @import '../../style/mixin';

    #city{
        padding-top: 2.35rem;
        .change_city{
            @include ct;
            right: 0.4rem;
            font-size: 0.6rem;
            color: #fff;
        }

        .search{
            background-color: #fff;
            border-top: 1px solid $bc;
            border-bottom: 1px solid $bc;
            padding: 0.4rem 0.65rem;
            .input{
                width: 100%;
                height: 1.5rem;
                line-height: 1.5rem;
                border: 1px solid $bc;
                margin-bottom: 0.4rem;
                @include sc(0.65rem, #333);
            }
            .submit{
                background-color: $blue;
                @include wh(100%, 1.5rem);
                @include sc(0.65rem, #fff);
            }
        }

        .title{
            font-size: 0.6rem;
            line-height: 0.8rem;
            padding-left: 0.5rem;
            border-bottom: 1px solid $bc;
        }

        .place_ul{
            background: #fff;
            li{
                border-bottom: 1px solid $bc;
                padding: 0.3rem 0.65rem;
                .place_name{
                    @include sc(0.65rem, #333);
                    height: 1rem;
                    line-height: 1rem;
                }
                .place_address{
                    @include sc(0.45rem, #999);
                    height: 0.8ren;
                    line-height: 0.8rem;
                }
            }
        }

        .clearAll{
            background-color: #fff;
            height: 1.9rem;
            line-height: 1.9rem;
            text-align: center;
            @include sc(0.7rem, #666);
        }

        .no_place{
            background-color: #fff;
            height: 1.9rem;
            line-height: 1.9rem;
            text-align: center;
            @include sc(0.7rem, #666);
        }
    }
</style>
