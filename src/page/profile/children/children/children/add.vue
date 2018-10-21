<template>
    <div id='add'>
        <head-top go-back='true' head-title='新增地址'></head-top>

        <section class='form'>
            <div class='input_wrapper'>
                <input type="text" :class='{borderColor: nameTip}' v-model='name' placeholder="请填写你的姓名" @input='checkName'>
                <p v-show='nameTip'>{{nameTip}}</p>                
            </div>
            <router-link to='/profile/info/address/add/addDetail'>
                <div class='input_wrapper'>
                    <input type="text" v-model='building' placeholder="小区/写字楼/学校等">
                </div>
            </router-link>
            <div class='input_wrapper'>
                <input type="text" :class='{borderColor: addressTip}' v-model='address' placeholder="请填写详细送餐地址" @input='checkAddress'>
                <p v-show='addressTip'>{{addressTip}}</p>
            </div>
            <div class='input_wrapper'>
                <input type="text" :class='{borderColor: phoneTip}' v-model='phone' placeholder="请填写能够联系到您的手机号" @input='checkPhone'>
                <p v-show='phoneTip'>{{phoneTip}}</p>
            </div>
            <div class='input_wrapper'>
                <input type="text" :class='{borderColor: exPhoneTip}' v-model='exPhone' placeholder="备用联系电话（选填）" @input='checkExPhone'>  
                <p v-show='exPhoneTip'>{{exPhoneTip}}</p>          
            </div>
        </section>

        <div class='btn' @click='verify'>
            <span :class='{active: name && address && phone && !phoneTip}'>新增地址</span>
        </div>

        <alert-tip :alertText='alertText' v-show='showAlert' @closeTip='closeTip'></alert-tip>

        <transition name='slide'>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import headTop from '../../../../../components/head/header';
    import alertTip from '../../../../../components/common/alert';
    import {mapState, mapMutations} from 'vuex';
    import {postAddress, getAddress} from '../../../../../service/getData';

    export default {
        data() {
            return {
                name: '',
                nameTip: '',
                address: '',
                addressTip: '',
                phone: '',
                phoneTip: '',
                exPhone: '',
                exPhoneTip: '',
                alertText: '',
                showAlert: false
            }
        },
        components: {
            headTop, alertTip
        },
        computed: {
            ...mapState([
                'building', 'userInfo', 'geohash'
            ])
        },
        methods: {
            ...mapMutations([
                'SAVE_ADDRESS'
            ]),
            checkName() {
                if(this.name == ''){
                    this.nameTip = '请填写您的姓名';
                }else{
                    this.nameTip = '';
                }
            },
            checkAddress() {
                if(this.address == ''){
                    this.addressTip = '请填写详细送餐地址';
                }else if(this.address.length < 3){
                    this.addressTip = '送餐地址太短了，不能辨识';
                }else{
                    this.addressTip = '';
                }
            },
            checkPhone() {
                if(this.phone == ''){
                    this.phoneTip = '手机号不能为空';
                }else if((/^[1][358][0-9]{9}$/).test(this.phone)){
                    this.phoneTip = '';
                }else{
                    this.phoneTip = '请输入正确的手机号';
                }
            },
            checkExPhone() {
                if((/^[1][358][0-9]{9}$/).test(this.exPhone) || this.exPhone == ''){
                    this.exPhoneTip = '';
                }else{
                    this.exPhoneTip = '请输入正确的手机号';
                }
            },
            checkBuilding() {
                if(this.building == ''){
                    this.alertText = '请填写收货地址！';
                    this.showAlert = true;
                }
            },
            closeTip() {
                this.showAlert = false;
            },
            async verify() {
                this.checkName();
                this.checkBuilding();
                this.checkAddress();
                this.checkPhone();
                if(this.building && !this.nameTip && !this.addressTip && !this.phoneTip && !this.exPhoneTip){
                    let res = await postAddress(this.userInfo.id, this.address, this.building, this.geohash, this.name, this.phone, this.exPhone);
                    if(res.message){
                        this.showAlert = true;
                        this.alertText = res.message;
                    }else if(res.status == 1){
                        //成功新增地址后重新获取地址列表并更新vuex状态，再返回上一页
                        let list = await getAddress(this.userInfo.id);
                        this.SAVE_ADDRESS(list);
                        this.$router.go(-1);
                    }
                } 
            }
        }

    }
</script>

<style lang='scss' scoped>
    @import '../../../../../style/mixin';

    #add{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 55;
        background: #f5f5f5;
        padding-top: 2.3rem;

        .slide-enter, .slide-leave-to{
            transform: translateX(2rem);
            opacity: 0;
        }
        .slide-enter-active, .slide-leave-active{
            transition: all .4s
        }

        .form{
            background: #fff;
            padding-top: .4rem;
            .input_wrapper{
                padding-bottom: .4rem;
                input{
                    display: block;
                    margin: 0 auto;
                    width: 15rem;
                    background: #f5f5f5;
                    border: 1px solid #ddd;
                    border-radius: 3px;
                    font-size: .6rem;
                    padding: .3rem;
                }
                .borderColor{
                    border-color: #ea3106;
                }
                p{
                    font-size: .6rem;
                    padding-left: .5rem;
                    margin-top: .2rem;
                    color: #ea3106;
                }
            }
        }

        .btn{
            margin: .6rem auto;
            width: 15rem;
            background: #4cd964;
            border-radius: 3px;
            text-align: center;
            span{
                color: #fff;
                font-size: .6rem;
                line-height: 1.6rem;
                font-weight: 700;
                opacity: .6;
            }
            .active{
                opacity: 1;
            }
        }
    }

</style>
