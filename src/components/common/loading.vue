<template>
    <div class='loading'>
        <div class='load_img' :style='{backgroundPositionY: -(positionY%7)*2.5 + "rem"}'></div>

        <svg class="load_ellipse" xmlns="http://www.w3.org/2000/svg" version="1.1">
			<ellipse cx="26" cy="10" rx="26" ry="10" style="fill:#ddd;stroke:none;"></ellipse>
		</svg>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                positionY:0
            }
        },
        created() {
            this.timer = setInterval(() => {
                this.positionY ++;
            }, 600)
        },
        beforeDestroy() {
            clearInterval(this.timer);
        }
    }
</script>

<style lang='scss' scoped>

    @keyframes load{
        0%    {transform: translateY(0px);}
        50%   {transform: translateY(-50px);}
        100%  {transform: translateY(0px);}
    }
    @keyframes ellipse {
        0%    {transform: scale(1);}
        50%   {transform: scale(.3);}
        100%  {transform: scale(1);}
    }

    .loading{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 2.5rem;
        height: 2.5rem;

        .load_img{
            position: relative;
            width: 100%;
            height: 100%;
            background: url(../../images/icon_loading.png) no-repeat 0 0;
            background-size: 2.5rem auto;
            transform: translateY(0px);
            z-index: 11;
            animation: load .6s infinite ease-in-out;
        }

        .load_ellipse{
            position: absolute;
            top: 2.2rem;
            left: 0;
            z-index: 10;
            width: 2.6rem;
            height: 2rem;
            animation: ellipse .6s infinite ease-in-out;
        }
    }
</style>
