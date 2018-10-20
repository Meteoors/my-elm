<template>
    <div id='address'>
        <head-top go-back='true' head-title='编辑地址'>
            <span slot='edit' class='edit' @click='edit'>{{editText}}</span>
        </head-top>

        <ul class='address_ul' v-if='addressList'>
            <li class='address_li' :class='{chosen: index == 0 }' v-for='(item, index) in addressList' :key='index'>
                <p class='text'>{{item.address}}</p>
                <p class='text'>{{item.phone}}</p>
                <div v-show='showDelete' class='delete' @click='deleteAddress(index, item)'>x</div>
            </li>
        </ul>

        <router-link to='/profile/info/address/add'>
            <div class='add_address'>
                <div class='text'>新增地址</div>
                <svg class='arrow_right'>
                    <use xlink:href='#arrow-right'></use>
                </svg>
            </div>
        </router-link>

        <transition name='slide'>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import headTop from '../../../../components/head/header';
    import { mapState, mapMutations } from 'vuex';
    import { getAddress, deleteAddress } from '../../../../service/getData';

    export default {
        data() {
            return {
                editText: '编辑',
                showDelete: false
            }
        },
        components: {
            headTop
        },
        created() {
            this.init();
        },
        computed: {
            ...mapState([
                'userInfo', 'addressList'
            ])
        },
        methods: {
            ...mapMutations([
                'SAVE_ADDRESS', 'DELETE_ADDRESS'
            ]),
            async init() {
                if(this.userInfo){
                    if (this.addressList.length > 0) return;
                    let res = await getAddress(this.userInfo.id);
                    this.SAVE_ADDRESS(res);
                }
            },
            edit() {
                if(!this.showDelete){
                    this.showDelete = true;
                    this.editText = '完成';
                }else{
                    this.showDelete = false;
                    this.editText = '编辑';
                }
            },
            async deleteAddress(index, item) {
                await deleteAddress(this.userInfo.user_id, item.id);
                this.DELETE_ADDRESS(index);
            }
        },
        watch: {
            userInfo() {
                this.init();
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../../style/mixin';

    #address{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: #f5f5f5;
        z-index: 50;
        padding-top: 2.3rem;

        .slide-enter, .slide-leave-to{
            transform: translateX(2rem);
            opacity: 0;
        }
        .slide-enter-active, .slide-leave-active{
            transform: translateX(0);
        }

        .edit{
            @include ct;
            right: .4rem;
            @include sc(.7rem, #fff);
        }

        .address_ul{
            background: #fff;
            border-top: 1px solid #d9d9d9;
            li{
                padding: .4rem;
                border-bottom: 1px solid #d9d9d9;
                position: relative;
                .text{
                    font-size: .6rem;
                    line-height: .9rem;
                    font-family: Arial, Helvetica, sans-serif;
                }
                .delete{
                    @include ct;
                    right: .4rem;
                    font-size: .8rem;
                    color: #999;
                    line-height: .8rem;
                }
            }
            .chosen{
                background: #fff8c3;
            }
        }

        .add_address{
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: .2rem .4rem;
            border: 1px solid #d9d9d9;
            margin-top: .4rem;
            .text{
                font-size: .7rem;
                line-height: 1.4rem;
            }
            svg{
                width: .66667rem;
                height: 1.4rem;
                fill: #d8d8d8;
            }
        }

    }
</style>
