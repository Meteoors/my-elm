<template>
  <div id="app">
    <keep-alive>
      <router-view v-if='$route.meta.keepAlive'></router-view>
    </keep-alive>

    <router-view v-if='!$route.meta.keepAlive'></router-view>
    
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import svgIcon from './components/common/svg'

export default {
  name: 'App',
  components: {
    svgIcon
  }
}
</script>

<style lang='scss'>
  @import './style/common';

</style>
