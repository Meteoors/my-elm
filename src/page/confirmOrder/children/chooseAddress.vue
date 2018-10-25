<template>
    <div id='choose_address'>
        <head-top go-back='true' head-title='选择地址'></head-top>

        <section class='address_wrapper'>
            <ul class='address_ul' v-if='deliverable.length'>
                <li class='address_li' v-for='(item, index) in deliverable' :key='index' @click='chooseAddress(item)'>
                    <svg class='select' :class='{default_icon: chosenAddress.id == item.id}'>
                        <use xlik:href='#select'></use>
                    </svg>                
                    <div class='right'>
                        <header>
                            <span class='name'>{{item.name}}</span>
                            <span>{{item.sex == 1? '先生':'女士' }}</span>
                            <span>{{item.phone}}</span>
                        </header>
                        <p>
                            <span class='tag' v-if='item.tag' :style='{backgroundColor: tagColor(item.tag)}'>{{item.tag}}</span>
                            <span class='detail ellipsis'>{{item.address_detail}}</span>
                        </p>
                    </div>
                </li>
            </ul>
            
            <section id='out_reach' v-if='deliverDisable'>
                <header>以下地址超出配送范围</header>
                <ul class='address_ul' v-if='deliverable.length'>
                    <li class='address_li' v-for='(item, index) in deliverDisable' :key='index'>
                        <svg class='select'>
                            <use xlik:href='#select'></use>
                        </svg>                
                        <div class='right'>
                            <header>
                                <span class='name'>{{item.name}}</span>
                                <span>{{item.sex == 1? '先生':'女士' }}</span>
                                <span>{{item.phone}}</span>
                            </header>
                            <p>
                                <span class='tag' v-if='item.tag' :style='{backgroundColor: "#ccc", color: "#fff"}'>{{item.tag}}</span>
                                <span class='detail ellipsis'>{{item.address_detail}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </section>

        </section>

        <router-link class='add' to='/confirmOrder/chooseAddress/addAddress'>
            <img src="../../../images/add_address.png" height="24" width="24">
            <span>新增收货地址</span>
        </router-link>

        <transition name='slide'>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    import headTop from '../../../components/head/header';

    export default {
        data() {
            return {
                
            }
        },
        computed: {
            ...mapState([
                'addressList', 'chosenAddress'
            ]),
            defaultIndex() {
                if(this.chosenIndex){
                    return this.chosenIndex;
                }else{
                    return 0;
                }
            }
        },
        methods: {
            ...mapMutations([
                'CHOOSE_ADDRESS'
            ]),
            tagColor(tag) {
                switch(tag){
                    case '公司': return '#4cd964';
                    case '学校': return '#3190e8';
                }
            },
            chooseAddress(address, index){
                this.CHOOSE_ADDRESS(address); //选中地址存入vuex
                this.$router.go(-1);
            }
        },
        components: {
            headTop
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../style/mixin';

    #choose_address{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 45;
        padding-top: 1.9rem;
        background: #fff;

        .slide-enter, .slide-leave-to{
            transform: translateX(2rem);
        }
        .slide-enter-active, .slide-leave-active{
            transition: all .4s;
        }

        .address_ul{
            li{
                padding: .7rem;
                display: flex;
                align-items: center;
                line-height: 1rem;
                border-bottom: 1px solid #f5f5f5;
                svg{
                    width: .8rem;
                    height: .8rem;
                    fill: #4cd964;
                    margin-right: .4rem;
                    opacity: 0;
                }
                .default_icon{
                    opacity: 1;
                }

                header{
                    span{
                        font-size: .6rem;
                    }
                    .name{
                        font-size: .8rem;
                        font-weight: 700;
                    }
                }
                .tag{
                    padding: 0 .2rem;
                    font-size: .6rem;
                    line-height: .7rem;
                    height: .8rem;
                    border-radius: .15rem;
                    background: #ff5722;
                    color: #fff;
                    margin-right: .3rem;
                }
                .detail{
                    font-size: .6rem;
                    color: #777;
                }
            }
            li:last-child{
                border: none;
            }
        }

        .address_wrapper{
            position: fixed;
            left: 0;
            top: 1.9rem;
            right: 0;
            bottom: 2.5rem;
            overflow: auto;
            #out_reach{
                border-bottom: 1px solid #f5f5f5;
                border-top: 1px solid #f5f5f5;
                header{
                    color: #666;
                    font-size: .6rem;
                    padding-left: .5rem;
                    line-height: 1.5rem;
                }
                span{
                    color: #ccc;
                }
            } 
        }

        .add{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-top: 1px solid #f5f5f5;
            span{
                margin-left: .3rem;
                font-size: .7rem;
                line-height: .7rem;
                color: $blue;
            }
        }
    }
</style>
