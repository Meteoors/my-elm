<template>
    <header id='head'>
        <slot name='logo'></slot>
        <router-link :to="userInfo? '/profile':'/login'" v-if='login' class='login'>
            <svg v-if='userInfo' class='user_avator'>
                <use xlink:href='#user'></use>
            </svg>
            <span class='login_entry' v-else>登录/注册</span>
        </router-link>
    </header>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {

            }
        },
        props: ['login'],
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
    @import '../style/mixin.scss';

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
    }

    
</style>
