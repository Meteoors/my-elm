<template>
    <div id='profile'>
        <head-top go-back='true' head-title='我的'></head-top>

        <div class='login'>
            <router-link class='login_link' to='/login'>
                <div class='avatar'>
                    <svg class='profile_photo'>
                        <use xlink:href='#avator-dafault'></use>
                    </svg>
                </div>
                <div class='userinfo'>
                    <p class='title'>登录/注册</p>
                    <p class='phone'>
                        <svg class='mobile'>
                            <use xlink:href='#mobile'></use>
                        </svg>
                        <span class='num'>暂无绑定手机号</span>
                    </p>
                </div>
                <div class='icon'>
                    <svg class='arrow_right'>
                        <use xlink:href='#arrow-right'></use>
                    </svg>
                </div>
            </router-link>
        </div>

        <ul class='info'>
            <router-link to='/balance' tag='li' class='info_li'>
                <p class='top'><span>0.00</span>元</p>
                <p class='bottom'>我的余额</p>
            </router-link>
            <router-link to='/benefit' tag='li' class='info_li'>
                <p class='top'><span>0</span>个</p>
                <p class='bottom'>我的优惠</p>
            </router-link>
            <router-link to='/points' tag='li' class='info_li'>
                <p class='top'><span>0</span>分</p>
                <p class='bottom'>我的积分</p>
            </router-link>
        </ul>

        <section class='service'>
            <!-- 我的订单 -->
            <router-link to='/order' class='detail'>
                <svg fill="#4aa5f0">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
                </svg> 
                <span>我的订单</span>
                <div class='icon'>
                    <svg fill="#bbb">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </div>
            </router-link>

            <!-- 积分商城 -->
            <a href='https://home.m.duiba.com.cn/#/chome/index' class='detail'>
                <svg fill="#4aa5f0">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
                </svg> 
                <span>积分商城</span>
                <div class='icon'>
                    <svg fill="#bbb">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </div>
            </a>

            <!-- 饿了么会员卡 -->
            <router-link to='/vipcard' class='detail'>
                <svg fill="#4aa5f0">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#vip"></use>
                </svg> 
                <span>饿了么会员卡</span>
                <div class='icon'>
                    <svg fill="#bbb">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </div>
            </router-link>
        </section>

        <section class='service'>
            <!-- 服务中心 -->
            <router-link to='/service' class='detail'>
                <svg fill="#4aa5f0">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
                </svg> 
                <span>服务中心</span>
                <div class='icon'>
                    <svg fill="#bbb">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </div>
            </router-link>

            <!-- 下载饿了么APP -->
            <router-link to='/download' class='detail'>
                <svg fill="#4aa5f0">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
                </svg> 
                <span>下载饿了么APP</span>
                <div class='icon'>
                    <svg fill="#bbb">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </div>
            </router-link>
        </section>        

        <foot-guide parent='profile'></foot-guide>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang='scss'>

</style>
