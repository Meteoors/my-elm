<template>
    <div id='add'>
        <head-top go-back='true' head-title='新增地址'></head-top>

        <section class='form'>
            <input type="text" v-model='name' placeholder="请填写你的姓名">
            <input type="text" v-model='name' placeholder="小区/写字楼/学校等">
            <input type="text" v-model='name' placeholder="请填写详细送餐地址">
            <input type="text" v-model='name' placeholder="请填写能够联系到您的手机号">
            <input type="text" v-model='name' placeholder="备用联系电话（选填）">            
        </section>
    </div>
</template>

<script>
    export default {}
</script>

<style lang='scss'>

</style>
