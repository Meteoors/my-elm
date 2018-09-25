<template>
    <div id='food'>
        <head-top go-back='true' :head-title='headTitle'></head-top>

        <div class='options'>
            <div class='item' @click='chooseType("food")'>
                <div class='item_container' :class='{chooseType: sortBy == "food"}'>
                    <span class='item_title'>{{foodTitle}}</span>
                    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
			        	<polygon points="0,3 10,3 5,8"/>
			        </svg>
                </div>
                <transition name='showlist'>
                    <div class='category' v-show='sortBy == "food"'>
                        <div class='category_left'>
                            <ul>
                                <li class='category_left_li' :class='{category_active: restaurant_category_id == item.id}' v-for='(item, index) in category' :key='index' @click='chooseCategory(item.id, index, item.name)'>
                                    <div>
                                        <img :src="getImgPath(item.img_url)" v-if='index' class='category_icon'>
                                        <span>{{item.name}}</span>
                                    </div>
                                    <div>
                                        <span class='count'>{{item.count}}</span>
                                        <svg v-if="index" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1" class="category_arrow" >
							    			<path d="M0 0 L6 4 L0 8"  stroke="#bbb" stroke-width="1" fill="none"/>
							    		</svg>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class='category_right'>
                            <ul>
                                <li class='category_right_li' :class='{category_right_chosen: restaurant_category_ids == item.id}' v-for='(item, index) in categoryDetail' @click='changeCategoryIds(item.id, item.name)' :key='index' v-if='index'>
                                    <div>{{item.name}}</div>
                                    <div>{{item.count}}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </transition>
            </div>

            <div class='item'>
                <div class='item_container'>
                    <span class='item_title'>排序</span>
                    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
			        	<polygon points="0,3 10,3 5,8"/>
			        </svg>
                </div>
            </div>

            <div class='item'>
                <div class='item_container'>
                    <span class='item_title'>筛选</span>
                    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
			        	<polygon points="0,3 10,3 5,8"/>
			        </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/head/header';
    import { mapState } from 'vuex';
    import { foodCategory } from '../../service/getData';
    import {getImgPath} from '../../components/common/mixin';

    export default {
        data () {
            return {
                headTitle: '',  //food页标题
                sortBy: '',  //选中选项名
                foodTitle: '',  //分类选项标题
                category: [],
                categoryDetail: [],
                restaurant_category_id: '',
                restaurant_category_ids: '',
                sortBytype: '',
                delivery_mode: '',
                supports_ids: ''
            }
        },
        created () {
            this.init();
        },
        computed: {
            ...mapState([
                latitude, longitude
            ])
        },
        components: {
            headTop
        },
        mixins: [getImgPath],
        methods: {
            async init() {
                this.restaurant_category_id = this.$route.query.restaurant_category_id;
                this.restaurant_category_ids = this.$route.query.restaurant_category_ids;
                this.sortBytype = this.$route.query.sortBytype;
                this.delivery_mode = this.$route.query.delivery_mode;
                this.supports_ids = this.$route.query.supports_ids;

                this.headTitle = this.$route.query.title;
                this.foodTitle = this.headTitle;
                
                //category分类左侧数据
                let res = await foodCategory(this.latitude, this.longitude);
                res.forEach((item, index, arr) => {
                    if(item.name == '全部商家'){
                        let cut = arr.splice(index, 1);
                        arr.unshift(cut);
                        console.log(arr);
                    }
                })
                this.category = res;

                //category分类右侧数据
                this.category.forEach(item => {
                    if(this.restaurant_category_id == item.id){
                        this.categoryDetail = item.sub_categories;
                    }
                })
            },
            chooseType(type) {
                if(this.sortBy !== type){
                    this.sortBy = type;
                }else{
                    this.sortBy = '';
                }
            },
            chooseCategory(id, index, name) {
                if(index == 0){
                    this.sortBy = '';
                    this.foodTitle = this.headTitle = name;
                    this.restaurant_category_ids = '';
                    this.restaurant_category_id = this.category[1].id
                }else{
                    this.categoryDetail = category[index].sub_categories;
                    this.restaurant_category_id = id;
                }
            },
            changeCategoryIds(id, name) {
                this.restaurant_category_ids = id;
                this.sortBy = '';
                this.foodTitle = this.headTitle = name;
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../style/mixin';

    #food{
        padding-top: 1.9rem;
        .options{
            color: #fff;
            padding: .2rem 0;
            display: flex;
            border-bottom: 1px solid #f1f1f1;
            height: 1.6rem;
            position: relative;
            .item{
                width: 33.3%;
                flex: 1;
                border-right: .5px solid #e4e4e4;
                .item_container{
                    font-size: .6rem;
                    color: #333;
                    text-align: center;
                    .sort_icon{
                        transition: all .3s;
                        fill: #666;
                    }
                }
                .chooseType{
                    color: $blue;
                    .sort_icon{
                        fill: $blue;
                        transform: rotate(180deg);
                    }
                }

                .showlist-enter-active, .showlist-leave-active{
                    transition: all .3s;
                    transform: translateY(0);
                }
                .showlist-enter, .showlist-leave-to{
                    opacity: 0;
                    transform: translateY(-100%);
                }
                .category{
                    z-index: 1;
                    position: absolute;
                    top: 1.6rem;
                    left: 0;
                    width: 100%;
                    display: flex;
                    .category_left{
                        background: #f1f1f1;
                        flex: 1;
                        height: 16rem;
                        overflow: hidden;
                        li{
                            display: flex;
                            justify-content: space-between;
                            .category_icon{
                                height: .8rem;
                                width: .8rem;
                                vertical-align: middle;
                                margin-right: .2rem;
                            }
                            span{
                                font-size: .6rem;
                                color: #666;
                                line-height: 1.8rem;
                            }
                            .count{
                                padding: 0 .1rem;
                                color: #fff;
                                background: #ccc;
                                border-radius: .8rem;
                                border: .025rem solid #ccc;
                                font-size: .6rem;
                                margin-right: .25rem;
                                vertical-align: middle;
                            }
                            .category_arrow{
                                vertical-align: middle;
                            }
                        }
                        .category_active{
                            background: #fff;
                        }
                    }
                    .category_right{
                        flex: 1;
                        padding-left: .5rem;
                        height: 16rem;
                        overflow: hidden;
                        li{
                            display: flex;
                            justify-content: space-between;
                            height: 1.8rem;
                            line-height: 1.8rem;
                            border-bottom: 1px solid $bc;
                            padding-right: .5rem;
                            span{
                                color: #666;
                                font-size: .6rem;
                            }
                        }
                        .category_right_chosen{
                            span{
                                color: $blue;
                            }
                        }
                    }
                }
            }
        }
    }

</style>
