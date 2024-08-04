// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import * as echarts from 'echarts'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;

Vue.use(ElementUi)

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})

