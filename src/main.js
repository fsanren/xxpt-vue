import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import '@/common/styles/element-variables.scss'

import '@/common/styles/index.scss' // global css

import { hasPermiss } from '@/common/utils/hasPermission'

import request from '@/common/utils/request'
import * as filters from '@/common/filters' // global filters
import App from './App'
import store from './store'
import router from './router/routers'
import echarts from 'echarts'
import '@/icons' // icon
import './router/index' // permission control
import dict from './components/Dict' // 数据字典

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(dict)

Vue.prototype.hasPerm = hasPermiss
Vue.prototype.$axios = request
Vue.prototype.$echarts = echarts

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
