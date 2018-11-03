<template>
    <div id='add_address'>
        <head-top go-back='true' head-title='添加地址'></head-top>

        <section class='form'>
            <div class='item'>
                <div class='title'>联系人</div>
                <div class='detail'>
                    <input type="text" placeholder="你的名字" v-model="name" class='name'>
                    <div class='sex'>
                        <span class='option' :class='{active: sex == 1}' @click='chooseSex(1)'>
                            <svg>
                                <use xlink:href='#select'></use>
                            </svg>
                            <span>先生</span>
                        </span>
                        <span class='option' :class='{active: sex == 2}' @click='chooseSex(2)'>
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
                    <input type="text" placeholder="备选电话" v-if='showExPhone' v-model="exPhone" class='exPhone'> 
                </div>
            </div>

            <div class='item'>
                <div class='title'>送餐地址</div>
                <div class='detail'>
                    <router-link to='/confirmOrder/chooseAddress/addAddress/searchAddress' class='address' tag='div'>{{building ? building : '小区/写字楼/学校等'}}</router-link>
                    <input type="text" placeholder="详细地址（如门牌号等）" v-model="addressDetail"> 
                </div>
            </div>

            <div class='item'>
                <div class='title'>标签</div>
                <div class='detail'>
                    <input type="text" placeholder="无/家/学校/公司" v-model="tag">
                </div>
            </div>
        </section>

        <div class='btn' @click='confirm'>确定</div>

        <alert-tip v-show='showAlert' :alertText='alertText' @closeTip='showAlert = false'></alert-tip>

        <transition name='slide'>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import headTop from '../../../../components/head/header';
    import alertTip from '../../../../components/common/alert';
    import { mapState, mapMutations } from 'vuex';
    import { postAddress, getAddress } from '../../../../service/getData';

    export default {
        data() {
            return {
                name: null,
                sex: 1,
                phone: null,
                showExPhone: false,
                exPhone: null,
                addressDetail: null,
                tag: null,
                tag_type: 1,
                showAlert: false,
                alertText: ''
            }
        },
        components: {
            headTop, alertTip
        },
        computed: {
            ...mapState([
                'userInfo', 'building', 'geohash'
            ])
        },
        methods: {
            ...mapMutations([
                'SAVE_ADDRESS', 'CHOOSE_ADDRESS'
            ]),
            chooseSex(sex) {
                this.sex = sex;
            },
            async confirm() {
                if(!this.userInfo.user_id){
                    this.showAlert = true;
                    this.alertText = '请登录';
                    return
                }else if(!this.name){
                    this.showAlert = true;
                    this.alertText = '请输入姓名';
                    return
                }else if(!this.phone || !(/^[1][358][0-9]{9}$/).test(this.phone)){
                    this.showAlert = true;
                    this.alertText = '请输入正确的手机号';
                    return
                }else if(!this.building){
                    this.showAlert = true;
                    this.alertText = '请选择地址';
                    return
                }else if(!this.addressDetail){
                    this.showAlert = true;
                    this.alertText = '请输入详细地址';
                    return
                }else if(!this.tag){
                    this.showAlert = true;
                    this.alertText = '标签错误';
                    return
                }

                if(this.tag == '家'){
                    this.tag_type = 2;
                }else if(this.tag == '学校'){
                    this.tag_type = 3;
                }else if(this.tag == '公司'){
                    this.tag_type = 4;
                }

                let res = await postAddress(this.userInfo.user_id, this.addressDetail, this.building, this.geohash, this.name, this.phone, this.exPhone, this.tag, this.sex, this.tag_type);
                if(res.message){
                    this.showAlert = true;
                    this.alertText = this.message;
                }else{
                    let list = await getAddress(this.userInfo.user_id);
                    this.SAVE_ADDRESS(list);
                    this.CHOOSE_ADDRESS(list[0]);
                    this.$router.go(-2);
                }
            }
        }
    }
</script>

<style lang='scss' scoped>

    #add_address{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: #f5f5f5;
        padding-top: 1.9rem;
        z-index: 50;

        .slide-enter, .slide-leave-to{
            transform: translateX(2rem);
            opacity: 0;
        }
        .slide-enter-active, .slide-leave-active{
            transition: all .4s;
        }

        .form{
            background: #fff;
            padding: 0 .7rem;
            .item{
                display: flex;
                line-height: 2.5rem;
                border-bottom: 1px solid #f5f5f5;
                .title{
                    font-size: .7rem;
                    flex: 2;
                }
                .detail{
                    flex: 5;
                    display: flex;
                    flex-direction: column;
                    input{
                        width: 100%;
                        font-size: .7rem;
                        color: #999;
                        line-height: 2.5rem;
                    }

                    .sex{
                        display: flex;
                        border-top: 1px solid #f5f5f5;
                        .option{
                            display: flex;
                            align-items: center;
                            margin-right: .8rem;
                            font-size: .7rem;
                        }
                        svg{
                            width: .8rem;
                            height: .8rem;
                            fill: #ccc;
                            margin-right: .3rem;
                        }
                        .active svg{
                            fill: #4cd964;
                        }
                    }

                    .phone{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        img{
                            height: 20px;
                            width: 20px;
                        }
                    }
                    .exPhone{
                        border-top: 1px solid #f5f5f5;
                    }

                    .address{
                        font-size: .7rem;
                        color: #999;
                        border-bottom: 1px solid #f5f5f5;
                    }
                }
            }
        }

        .btn{
            margin: .6rem .7rem;
            line-height: 1.8rem;
            font-size: .7rem;
            color: #fff;
            background: #4cd964;
            text-align: center;
            border-radius: .2rem;
        }
    }
</style>
