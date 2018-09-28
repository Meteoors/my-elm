<template>
    <div id='food'>
        <head-top go-back='true' :head-title='headTitle'></head-top>

        <div class='options' @touchmove.prevent>
            <div class='item' @click='chooseType("food")'>
                <div class='item_container' :class='{chooseType: sortBy == "food"}'>
                    <div class='item_border'>
                        <span class='item_title'>{{foodTitle}}</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
			        	    <polygon points="0,3 10,3 5,8"/>
			            </svg>
                    </div>
                </div>
                <transition name='showlist'>
                    <div class='category' v-show='sortBy == "food"'>
                        <div class='category_left'>
                            <ul>
                                <li class='category_left_li' :class='{category_active: restaurant_category_id === item.id}' v-for='(item, index) in category' :key='index' @click.stop='chooseCategory(item.id, index, item.name)'>
                                    <div>
                                        <img :src="getImgPath(item.image_url)" v-if='index' class='category_icon'>
                                        <span>{{item.name}}</span>
                                    </div>
                                    <div>
                                        <span class='count' v-if='index'>{{item.count}}</span>
                                        <svg v-if="index" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1" class="category_arrow" >
							    			<path d="M0 0 L6 4 L0 8"  stroke="#bbb" stroke-width="1" fill="none"/>
							    		</svg>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class='category_right'>
                            <ul>
                                <li class='category_right_li' :class='{category_right_chosen: restaurant_category_ids == item.id}' v-for='(item, index) in categoryDetail' @click.stop='changeCategoryIds(item.id, item.name)' :key='index' v-if='index'>
                                    <div>{{item.name}}</div>
                                    <div>{{item.count}}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </transition>
            </div>

            <div class='item' @click='chooseType("sort")'>
                <div class='item_container' :class='{chooseType: sortBy == "sort"}'>
                    <div class='item_border'>
                        <span class='item_title'>排序</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
			        	    <polygon points="0,3 10,3 5,8"/>
			            </svg>
                    </div>                    
                </div>
                <transition name='showlist'>
                    <div class='category sort' v-show='sortBy == "sort"'>
                        <ul>
                            <li class='sort_li' @click.stop='chooseSortType($event)' data='0'>
                                <svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
								</svg>
                                <p :class='{sort_choose: sortByType == 0}'>
                                    <span>智能排序</span>
                                    <svg v-if="sortByType == 0">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
                                </p>
                            </li>
                            <li class='sort_li' @click.stop='chooseSortType($event)' data='5'>
                                <svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#distance"></use>
								</svg>
                                <p :class='{sort_choose: sortByType == 5}'>
                                    <span>距离最近</span>
                                    <svg v-if="sortByType == 5">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
                                </p>
                            </li>
                            <li class='sort_li' @click.stop='chooseSortType($event)' data='6'>
                                <svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
								</svg>
                                <p :class='{sort_choose: sortByType == 6}'>
                                    <span>销量最高</span>
                                    <svg v-if="sortByType == 6">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
                                </p>
                            </li>
                            <li class='sort_li' @click.stop='chooseSortType($event)' data='1'>
                                <svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#price"></use>
								</svg>
                                <p :class='{sort_choose: sortByType == 1}'>
                                    <span>起送价最低</span>
                                    <svg v-if="sortByType == 1">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
                                </p>
                            </li>
                            <li class='sort_li' @click.stop='chooseSortType($event)' data='2'>
                                <svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
								</svg>
                                <p :class='{sort_choose: sortByType == 2}'>
                                    <span>配送速度最快</span>
                                    <svg v-if="sortByType == 2">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
                                </p>
                            </li>
                            <li class='sort_li' @click.stop='chooseSortType($event)' data='3'>
                                <svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating"></use>
								</svg>
                                <p :class='{sort_choose: sortByType == 3}'>
                                    <span>评分最高</span>
                                    <svg v-if="sortByType == 3">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
                                </p>
                            </li>
                        </ul>
                    </div>
                </transition>
            </div>

            <div class='item' @click='chooseType("activity")'>
                <div class='item_container' :class='{chooseType: this.sortBy == "activity"}'>
                    <span class='item_title'>筛选</span>
                    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
			    	    <polygon points="0,3 10,3 5,8"/>
		            </svg>
                </div>
                <transition name='showlist'>
                    <div class='activity category' v-show='this.sortBy == "activity"'>
                        <p class='title'>配送方式</p>
                        <ul>
                            <li class='activity_li' v-for='(item, index) in delivery' :key='index' @click.stop='chooseDelivery(item.id)'>
                                <svg>
                                    <use :xlink:href='delivery_mode == item.id ? "#selected":"#fengniao"'></use>
                                </svg>
                                <span :class='{active: delivery_mode == item.id}'>{{item.text}}</span>
                            </li>
                        </ul>
                        <p class='title'>商家属性（可以多选）</p>
                        <ul>
                            <li class='activity_li' v-for='(item, index) in activity' :key='index' @click.stop='chooseActivity(index, item.id)'>
                                <span class='icon' :style='{color: "#"+ item.icon_color, borderColor: "#" + item.icon_color}' v-show='!supports_ids[index].status'>
                                    {{item.icon_name}}
                                </span>
                                <svg v-show='supports_ids[index].status' class='activity_svg'>
                                    <use xlink:href='#selected'></use>
                                </svg>
                                <span :class='{active: supports_ids[index].status}'>{{item.name}}</span>
                            </li>
                        </ul>
                        <div class='btns'>
                            <div class='btn' @click.stop='clearSelect'>清空</div>
                            <div class='btn ensure' @click.stop='confirmSelect'>
                                <span>确定</span>
                                <span v-show='filterNum'>({{filterNum}})</span>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>

        <shop-list 
                :restaurantCategoryId='restaurant_category_id' 
                :restaurantCategoryIds='restaurant_category_ids' 
                :sortByType='sortByType'
                :deliveryMode='delivery_mode'
                :supportsIds='supports_ids'
                :confirmStatus='confirmStatus'
        >
        </shop-list>

        <transition name='showcover'>
            <div class='cover' v-if='sortBy'></div>
        </transition>
    </div>
</template>

<script>
    import headTop from '../../components/head/header';
    import shopList from '../../components/common/shoplist';
    import { mapState } from 'vuex';
    import { foodCategory, foodDelivery, foodActivity } from '../../service/getData';
    import {getImgPath} from '../../components/common/mixin';

    export default {
        data () {
            return {
                headTitle: '',  //food页标题
                sortBy: '',  //选中选项名
                foodTitle: '',  //分类选项标题
                category: [],   //category分类左侧数据
                categoryDetail: [], //category分类右侧数据
                activity: [],  //商家支持活动数据
                delivery: [],  //配送方式数据
                restaurant_category_id: '', //食品类型id值
                restaurant_category_ids: '',  //筛选类型id值
                sortByType: '',   //排序方式
                delivery_mode: '', //选中的配送方式
                supports_ids: '',  //选中的商铺活动列表
                filterNum: 0,  //配送方式和商家活动选中项总数
                confirmStatus: false
            }
        },
        created () {
            this.init();
        },
        computed: {
            ...mapState([
                'latitude', 'longitude', 'categoryData'
            ])
        },
        components: {
            headTop, shopList
        },
        mixins: [getImgPath],
        methods: {
            print() {
                console.log(1);
            },
            async init() {
                this.restaurant_category_id = this.categoryData.restaurant_category_id;
                this.restaurant_category_ids = this.categoryData.restaurant_category_ids;
                this.sortByType = this.categoryData.sortBytype;
                this.delivery_mode = this.categoryData.delivery_mode;
                this.supports_ids = this.categoryData.supports_ids;

                this.headTitle = this.$route.query.title;
                this.foodTitle = this.headTitle;
                
                //category分类左侧数据
                let res = await foodCategory(this.latitude, this.longitude);
                res.forEach((item, index, arr) => {
                    if(item.name == '全部商家'){
                        let cut = arr.splice(index, 1);
                        arr.unshift(cut[0]);
                    }
                })
                this.category = res;

                //category分类右侧数据
                this.category.forEach(item => {
                    if(this.restaurant_category_id == item.id){
                        this.categoryDetail = item.sub_categories;
                    }
                })

                this.delivery = await foodDelivery(this.latitude, this.longitude);
                this.activity = await foodActivity(this.latitude, this.longitude);
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
                    this.categoryDetail = this.category[1].sub_categories;
                }else{
                    this.categoryDetail = this.category[index].sub_categories;
                    this.restaurant_category_id = id;
                }
            },
            changeCategoryIds(id, name) {
                this.restaurant_category_ids = id;
                this.sortBy = '';
                this.foodTitle = this.headTitle = name;
            },
            chooseSortType(event) {
                this.sortByType = event.currentTarget.getAttribute('data');
                this.sortBy = '';
            },
            chooseDelivery(id) {
                if(this.delivery_mode == ''){
                    this.delivery_mode = id;
                    this.filterNum++;
                }else{
                    this.delivery_mode = '';
                    this.filterNum--
                }
            },
            chooseActivity(index, id) {
                if(this.supports_ids[index].status){
                    this.filterNum--
                }else{
                    this.filterNum++
                }

                this.supports_ids[index].status = !this.supports_ids[index].status;                
            },
            clearSelect() {
                this.filterNum = 0;
                this.delivery_mode = '';
                this.supports_ids.forEach(item => {
                    item.status = false;
                })
            },
            confirmSelect() {
                this.confirmStatus = !this.confirmStatus;
                this.sortBy = '';
            }
        },
        watch: {
            sortBy: function(newVal, oldVal){
                if(newVal) {
                    // let cssStr = 'overflow: hidden; height: 100%;';
                    // document.getElementsByTagName('html')[0].style.cssText += cssStr
                    document.getElementsByTagName('html')[0].className = 'noScroll';
                    document.body.className = 'noScroll';
                }else{
                    document.getElementsByTagName('html')[0].className = '';
                    document.body.className = '';
                }
                
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../style/mixin';

    #food{
        padding-top: 3.5rem;
        background: #fff;
        .options{
            color: #fff;
            display: flex;
            border-bottom: 1px solid #f1f1f1;
            height: 1.65rem;
            position: fixed;
            left: 0;
            top: 1.9rem;
            width: 100%;
            z-index: 16;
            .item{
                width: 33.3%;
                flex: 1;
                .item_container{
                    padding: .3rem 0;
                    font-size: .6rem;
                    position: relative;
                    z-index: 17;
                    background: #fff;
                    text-align: center;
                    line-height: 1rem;
                    .item_border{
                        border-right: .5px solid $bc;                        
                    }
                    .sort_icon{
                        transition: all .3s;
                        fill: #666;
                    }
                }
                .chooseType{
                    .item_title{
                        color: $blue;
                    }
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
                    position: absolute;
                    top: 1.6rem;
                    left: 0;
                    width: 100%;
                    display: flex;
                    border-top: 1px solid $bc;
                    z-index: 12;
                    .category_left{
                        background: #f1f1f1;
                        flex: 1;
                        height: 16rem;
                        overflow: auto;
                        li{
                            display: flex;
                            justify-content: space-between;
                            padding: 0 .5rem;
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
                        overflow: auto;
                        background: #fff;
                        li{
                            display: flex;
                            justify-content: space-between;
                            height: 1.8rem;
                            line-height: 1.8rem;
                            border-bottom: 1px solid $bc;
                            font-size: .6rem;
                            padding-right: .5rem;
                            div{
                                color: #666;
                            }
                        }
                        .category_right_chosen{
                            div{
                                color: $blue;
                            }
                        }
                    }
                }

                .sort{
                    display: block;
                    background: #fff;
                    .sort_li{
                        display: flex;
                        align-items: center;
                        svg{
                            @include wh(.7rem, .7rem);
                            margin: 0 .3rem 0 .8rem;
                        }
                        p{
                            height: 2.5rem;
                            line-height: 2.5rem;
                            border-bottom: 1px solid $bc;
                            flex: 1;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding-left: .2rem;
                            span{
                                color: #666;
                                font-size: .6rem;
                            }
                        }
                    }
                }

                .activity{
                    background: #fff;
                    padding-top: .5rem;
                    display: block; 
                    p{
                        padding-left: .5rem;
                        font-size: .6rem;
                        line-height: .6rem;
                    }
                    ul{
                        padding: .4rem 0 .5rem .5rem;
                        display: flex;
                        flex-wrap: wrap;
                        li{
                            display: flex;
                            align-items: center;
                            border: .025rem solid #f1f1f1;
                            border-radius:.125rem;
                            margin-bottom: .25rem;
                            margin-right: .25rem;  
                            padding-left: .25rem; 
                            width: 4.7rem;
                            height: 1.4rem;
                            .icon{
                                font-size: .6rem;
                                border: .025rem solid $bc;
                                border-radius: .15rem;
                                width: 0.8rem;
                                text-align: center;
                                line-height: .8rem;
                                margin-right: .25rem;
                            }
                            span{
                                font-size: .6rem;
                            }
                            .active{
                                color: $blue;
                            }
                            svg{
                                @include wh(.8rem, .8rem);
                                margin-right: .25rem;
                            }
                        }
                    }
                    .btns{
                        background: #f1f1f1;
                        padding: .3rem .2rem;
                        display: flex;
                        .btn{
                            flex: 1;
                            height: 1.8rem;
                            line-height: 1.8rem;
                            font-size: .8rem;
                            border-radius: .2rem;
                            text-align: center;
                            background: #fff;
                        }
                        .ensure{
                            background: #56d176;
                            margin-left: .5rem;
                            span{
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }

        .cover{
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 10;
            background: rgba(0,0,0,0.3);	
        }
    }

</style>
