<template>
    <div id='set_name'>
        <head-top go-back='true' head-title='修改用户名'></head-top>

        <input class='name' :class='{border_color: borderColor}' type="text" placeholder="输入用户名" @input="validate" v-model="username">

        <p class='tip' :class='{font_color: borderColor}'>{{tip}}</p>

        <div class='btn' :class='{active: isValidate}' @click='changeUsername'>确认修改</div>
    </div>
</template>

<script>
    import headTop from '../../../../components/head/header';
    import { mapMutations } from 'vuex';

    export default {
        data() {
            return {
                tip: '用户名只能修改一次（5-24字符之间）',
                username: '',
                isValidate: false,
                borderColor: false
            }
        },
        components: {
            headTop
        },
        methods: {
            ...mapMutations([
                'SET_USERNAME'
            ]),
            validate() {
                if(this.username.length > 24 ||this.username.length <5){
                    this.isValidate = false;
                    this.borderColor = true;
                    this.tip = '用户名长度在5-24位之间';
                }else{
                    this.isValidate = true;
                    this.borderColor = false;
                    this.tip = '用户名只能修改一次（5-24字符之间）';
                }
            },
            changeUsername() {
                this.validate();

                if(!this.isValidate) return;
                this.SET_USERNAME(this.username);
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang='scss' scoped>
    #set_name{
        background: #f5f5f5;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        padding: 2.3rem .4rem 0;
        z-index: 50;
        .name{
            height: 1.7rem;
            line-height: 1.6rem;
            border: 1px solid #ddd;
            padding: 0 .2rem;
            font-size: .7rem;
            width: 100%;
            background: #fff;
            margin-bottom: .4rem;
            border-radius: 2px;
        }
        .border_color{
            border-color: #ea3106;
        }
        .tip{
            padding-left: .1rem;
            color: #666;
            font-size: .6rem;
        }
        .font_color{
            color: #ea3106;
        }
        .btn{
            background: #3199e8;
            color: #fff;
            height: 2rem;
            line-height: 2rem;
            font-size: .7rem;
            text-align: center;
            border-radius: 2px;
            margin-top: 1rem;
            opacity: .6;
        }
        .active{
            opacity: 1;
        }
    }
</style>
