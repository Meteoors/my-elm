<template>
    <div class='star'>
        <div class='star_container'>
            <svg class='grey_fill' v-for='num in 5' :key='num'>
                <use xlink:href='#star'></use>
            </svg>
        </div>
        <div class='score_wrapper' :style="'width:' + score*2/5 + 'rem'">
            <div class='star_container'>
                <svg class='orange_fill' v-for='num in 5' :key='num'>
                    <use xlink:href='#star'></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['score']
    }
</script>

<style lang='scss' scoped>
    .star{
        display: inline-block;
        position: relative;
        width: 2rem;
        height: 0.4rem;
        .score_wrapper{
            position: relative;
            overflow: hidden;
            z-index: 20;
            height: 100%;
        }
        .star_container{
            width: 2rem;
            height: 0.4rem;
            position: absolute;
            display: flex;
            .grey_fill{
                fill: #d1d1d1;
            }
            .orange_fill{
                fill: #ff9a0d;
            }
        }
    }
</style>
