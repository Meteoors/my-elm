<template>
    <div id='add_detail'>
        <head-top go-back='true' head-title='搜索地址'></head-top>

        <section class='building'>
            <input class='name' type="text" placeholder="请输入小区/写字楼/学校等" v-model="address">
            <input class='btn' @click='search' type="button" value='确认'>
        </section>

        <section class='tip'>为了满足商家的送餐要求，建议您从列表中选择地址</section>

        <ul v-if='buildingList.length' class='build_ul'>
            <li v-for='(item, index) in buildingList' :key='index' class='build_li' @click='choose(item)'>
                <p>{{item.name}}</p>
                <p>{{item.address}}</p>
            </li>
        </ul>
        <section v-else class='nothing'>
            <p>找不到地址？</p>
            <p>请尝试输入小区、写字楼或学校名</p>
            <p>详细地址（如门牌号）可稍后输入哦。</p>
        </section>
    </div>
</template>

<script>
    import headTop from '../../../../../../components/head/header';
    import { mapState, mapMutations } from 'vuex';
    import { searchAddress } from '../../../../../../service/getData';

    export default {
        data() {
            return {
                address: '',
                buildingList: []
            }
        },
        components: {
            headTop
        },
        created() {
            this.address = this.building;
        },
        computed: {
            ...mapState([
                'building'
            ])
        },
        methods: {
            ...mapMutations([
                'RECORD_BUILDING'
            ]),
            async search() {
                let res = await searchAddress(this.address);
                if(res.message) return;
                this.buildingList = res;
            },
            choose(item) {
                this.RECORD_BUILDING(item.name);
                this.$router.go(-1);
            }
        },
        watch: {
            building(val) {
                this.address = val;
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../../../../../style/mixin';

    #add_detail{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 60;
        background: #f5f5f5;
        padding-top: 1.9rem;

        .building{
            background: #fff;
            padding: .5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .name{
                background: #f5f5f5;
                display: block;
                width: 11.8rem;
                padding: .4rem;
                font-size: .6rem;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            .btn{
                background: $blue;
                font-size: .7rem;
                color: #fff;
                width: 3rem;
                display: block;
                border-radius: 5px;
                line-height: 1.7rem;
            }
        }

        .tip{
            text-align: center;
            color: #ff883f;
            background: #fff6e4;
            font-size: .62rem;
            line-height: 1.2rem;
        }

        .nothing{
            @include center;
            width: 100%;
            p{
                text-align: center;
                font-size: .7rem;
                color: #969696;
                margin-bottom: .4rem;
            }
        }

        .build_ul{
            li{
                padding: .4rem;
                border-bottom: 1px solid #ccc;
                p{
                    font-size: .65rem;
                    color: #969696;
                }
                p:first-child{
                    margin-bottom: .2rem;
                }
            }
            li:last-child{
                border: 0;
            }
        }
    }
</style>
