// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from 'base/common/store/vuex.js'
import App from './App'
import router from './router'
import 'base/style/border.css'
import 'base/style/reset.css'
import 'base/style/icon.css'
import vueResource from 'vue-resource'
import FastClick from 'fastclick'

Vue.config.productionTip = false
Vue.use(vueResource)
FastClick.attach(document.body)
Vue.prototype.bus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
