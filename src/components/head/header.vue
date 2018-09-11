<template>
    <header id='head'>
        <slot name='logo'></slot>

        <router-link :to="userInfo? '/profile':'/login'" v-if='login' class='login'>
            <svg v-if='userInfo' class='user_avator'>
                <use xlink:href='#user'></use>
            </svg>
            <span class='login_entry' v-else>登录/注册</span>
        </router-link>

        <div class='back' v-if='goBack' @click='$router.go(-1)'>
            <svg class='arrow_left' width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>
        </div>

        <div class='title_wrap ellipsis' v-if='headTitle'>
            <span class='title'>{{headTitle}}</span>
        </div>
        
        <slot name='changeCity'></slot>
    </header>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {

            }
        },
        props: ['login', 'goBack', 'headTitle'],
        created() {
            this.getUserInfo()
        },
        computed: {
            ...mapState([
                'userInfo'
            ])
        },
        methods: {
            ...mapActions([
                'getUserInfo'
            ])
        }

    }
</script>

<style lang='scss' scoped>
    @import '../../style/mixin.scss';

    #head{
        background-color: $blue;
        @include wh(100%, 1.9rem);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;

        .login{
            @include ct;
            right: 0.55rem;
            color: #fff;
            font-size: 0;

            .login_entry{
                color: #fff;
                font-size: 0.6rem;
            }
            .user_avator{
                fill: #fff;
                @include wh(0.7rem, 0.7rem)
            }
        }

        .back{
            @include ct;
            left: 0.4rem;
            .arrow_left{
                fill: #fff;
                @include wh(1.5rem, 1.5rem);
            }
        }

        .title_wrap{
            width:50%;
            @include center;
            text-align: center;
            .title{
                font-size: 0.8rem;
                color: #fff;
                font-weight: 800;
            }
        }
    }

    
</style>
