<template>
    <div id='remark'>
        <head-top go-back='true' head-title='订单备注'></head-top>

        <section class='tag' v-if='tagList'>
            <header>快速备注</header>
            <ul class='type_ul'>
                <li class='type_li' v-for='(item, index) in tagList.remarks' :key='index'>
                    <span v-for="(tag, tagIndex) in item" :key='tagIndex' :class='{active: classObj[index] == tagIndex}' @click='chooseTag(index, tagIndex, tag)'>{{tag}}</span>
                </li>
            </ul>
        </section>

        <section class='others'>
            <header>其他备注</header>
            <textarea class='input' placeholder="请输入备注内容（可不填）" v-model="inputText"></textarea>
        </section>

        <div class='btn' @click='confirmRemark'>确定</div>        
    </div>
</template>

<script>
    import headTop from '../../../components/head/header';
    import { getRemark } from '../../../service/getData';
    import { mapMutations } from 'vuex';

    export default {
        data() {
            return {
                tagList: null,
                remarkText: {},
                inputText: null,
                classObj: {}
            }
        },
        created() {
            this.init();
        },
        components: {
            headTop
        },
        methods: {
            ...mapMutations([
                'SAVE_REMARK'
            ]),
            async init() {
                let cart_id = this.$route.query.cart_id;
                this.tagList = await getRemark(cart_id);
            },
            chooseTag(index, tagIndex, tag){
                this.remarkText[index] = {tagIndex: tag};
                this.$set(this.classObj, index, tagIndex);
            },
            confirmRemark() {
                this.SAVE_REMARK({
                    remarkText: this.remarkText,
                    inputText: this.inputText
                });
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang='scss' scoped>
    #remark{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: #f5f5f5;
        z-index: 45;
        padding-top: 2.3rem;

        .tag{
            background: #fff;
            padding: 0 .6rem .6rem;
            header{
                line-height: 2rem;
                font-size: .65rem;
            }
            .type_ul{
                display: flex;
                flex-wrap: wrap;
                li{
                    border: 1px solid #3190e8;
                    border-radius: .2rem;
                    margin: 0 .6rem .6rem 0;
                    display: flex;
                    span{
                        display: inline-block;
                        border-right: 1px solid #3190e8;
                        padding: 0 .6rem;
                        font-size: .6rem;
                        line-height: 1.2rem;
                        height: 1.2rem;
                    }
                    .active{
                        background: #3190e8;
                        color: #fff;
                    }
                    span:last-child{
                        border: none;
                    }
                }
            }
        }

        .others{
            margin-top: .4rem;
            background: #fff;
            padding: 0 .6rem .6rem;
            header{
                font-size: .65rem;
                line-height: 2rem;
            }
            .input{
                width: 100%;
                height: 4.5rem;
                border-radius: .2rem;
                border: 1px solid #eee;
                padding: .5rem;
                font-size: .6rem;
                color: #666;
                background: #f9f9f9;
            }
        }

        .btn{
            margin: .4rem .7rem;
            background: #4cd964;
            border-radius: .2rem;
            color: #fff;
            line-height: 1.8rem;
            text-align: center;
            font-size: .7rem;
        }
    }
</style>
