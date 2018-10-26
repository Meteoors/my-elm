<template>
    <div id='add_address'>
        <head-top go-back='true' head-title='添加地址'></head-top>

        <section class='form'>
            <div class='item'>
                <div class='title'>联系人</div>
                <div class='detail'>
                    <input type="text" placeholder="你的名字" v-model="name">
                    <div class='sex'>
                        <span class='option' :class='{active: sex == 1}' @click='chooseSex(1)'>
                            <svg>
                                <use xlink:href='#select'></use>
                            </svg>
                            <span>先生</span>
                        </span>
                        <span class='option' :class='{active: sex == 1}' @click='chooseSex(1)'>
                            <svg>
                                <use xlink:href='#select'></use>
                            </svg>
                            <span>女士</span>
                        </span>
                    </div>
                </div>
            </div>

            <div class='item'>
                <div class='title'>联系电话</div>
                <div class='detail'>
                    <p class='phone'>
                        <input type="text" placeholder="你的手机号" v-model="phone">
                        <img src="../../../../images/add_phone.png" height='20' width='20' @click="showExPhone = true">
                    </p>
                    <input type="text" placeholder="备选电话" v-if='showExPhone' v-model="exPhone"> 
                </div>
            </div>

            <div class='item'>
                <div class='title'>送餐地址</div>
                <div class='detail'>
                    <router-link to='/confirmOrder/chooseAddress/addAddress/searchAddress' class='address'>{{searchAddress? searchAddress : '小区/写字楼/学校等'}}</router-link>
                    <input type="text" placeholder="详细地址（如门牌号等）" v-if='showExPhone' v-model="addressDetail"> 
                </div>
            </div>

            <div class='item'>
                <div class='title'>标签</div>
                <div class='detail'>
                    <input type="text" placeholder="无/家/学校/公司" v-model="tag">
                </div>
            </div>
        </section>

        <div class='btn' @click='addAddress'>确定</div>

        <transition name='slide'>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import headTop from '../../../../components/head/header';
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                name: null,
                sex: 1,
                phone: null,
                showExPhone: false,
                exPhone: null,
                addressDetail: null,
                tag: null
            }
        },
        components: {
            headTop
        },
        computed: {
            ...mapState([
                'searchAddress'
            ])
        },
        methods: {
            chooseSex(sex) {
                this.sex = sex;
            },
            confirm() {

            }
        }
    }
</script>

<style lang='scss' scoped>

</style>
