import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './config/rem'


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
