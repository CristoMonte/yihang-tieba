/**
 * 该文件充当webpack打包的总入口
 *
 * 2017.5 www.freeedit.cn
 * yang fan
 */

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './app/'

import router from './router/'
import store from './store/'
import db from './database/'
import comScript from 'common/script/'

import 'common/style/index.styl'
import 'common/library/animate.css'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

// 将公共脚本库中导出的对象混入到Vue实例的原型链上
// 以确保所有Vue实例都可以访问它
Object.assign(Vue.prototype, comScript)
Object.assign(Vue.prototype, db)
Object.assign(Vue.prototype, {
  // 便于用手机调试时使用的局域网地址
  // $api: 'http://192.168.56.1:8889/api/',
  // $proxy: 'http://192.168.56.1:8889/proxy/'
  // 真正打包的时候的地址
  $api: 'api/',
  $proxy: 'proxy/'
})

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
