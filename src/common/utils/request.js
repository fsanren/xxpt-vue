import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

import { getToken, removeToken } from '@/common/utils/auth'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_CODE,
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const redirect = response.headers.redirect
    var str = window.location.href
    if (redirect !== null && redirect !== undefined) {
      removeToken()
      window.location.replace(process.env.NODE_ENV === 'production' ? STATIC_CONFIG_PROD.VUE_APP_LOGIN_URL + '?toredirect=' + encodeURIComponent(encodeURIComponent(str.replace('localhost', '127.0.0.1'))) : STATIC_CONFIG_DEV.VUE_APP_LOGIN_URL + '?toredirect=' + encodeURIComponent(encodeURIComponent(str.replace('localhost', '127.0.0.1'))))
    } else {
      const res = response.data
      if (res.code !== 200) {
        if (res.code === 401) {
          removeToken()
          window.location.replace(process.env.NODE_ENV === 'production' ? STATIC_CONFIG_PROD.VUE_APP_LOGIN_URL + '?toredirect=' + encodeURIComponent(encodeURIComponent(str.replace('localhost', '127.0.0.1'))) : STATIC_CONFIG_DEV.VUE_APP_LOGIN_URL + '?toredirect=' + encodeURIComponent(encodeURIComponent(str.replace('localhost', '127.0.0.1'))))
        } else if (res.code === 500) {
          Message({
            message: '数据异常，请联系管理员',
            type: 'error',
            duration: 5 * 1000
          })
          console.log(res.code + ': ' + res.message)
          return Promise.reject('error')
        } else {
          Message({
            message: res.code + ': ' + res.message,
            type: 'error',
            duration: 5 * 1000
          })
          return Promise.reject('error')
        }
      } else {
        if (response.data.result != null && response.data.result.commonResultCode != null && response.data.result.commonResultCode !== 1) {
          Message({
            message: res.result.commonResultMsg,
            type: 'error',
            duration: 5 * 1000
          })
          return Promise.reject('error')
        } else {
          return response.data
        }
      }
    }
  },
  error => {

    var token = getToken()
    let res = error.response
    if (token !== undefined && undefined !== res) {
      if (res.status === 401) {
        MessageBox.confirm(
          '登录状态已过期，您可以继续留在该页面，或者重新登录',
          '系统提示',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          removeToken()
          var str = window.location.href
          window.location.replace(process.env.NODE_ENV === 'production' ? STATIC_CONFIG_PROD.VUE_APP_LOGIN_URL + '?toredirect=' + encodeURIComponent(encodeURIComponent(str.replace('localhost', '127.0.0.1'))) : STATIC_CONFIG_DEV.VUE_APP_LOGIN_URL + '?toredirect=' + encodeURIComponent(encodeURIComponent(str.replace('localhost', '127.0.0.1'))))
        })
      } else {
        Message({
          message: error.response.status + ': ' + error.response.data.message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(error)
      }
    } else {
      if (res.status === 302 || res.status === 401) {
        MessageBox.confirm(
          '登录状态已过期，您可以继续留在该页面，或者重新登录',
          '系统提示',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          removeToken()
          var str = window.location.href
          window.location.replace(process.env.NODE_ENV === 'production' ? STATIC_CONFIG_PROD.VUE_APP_LOGIN_URL + '?toredirect=' + encodeURIComponent(encodeURIComponent(str.replace('localhost', '127.0.0.1'))) : STATIC_CONFIG_DEV.VUE_APP_LOGIN_URL + '?toredirect=' + encodeURIComponent(encodeURIComponent(str.replace('localhost', '127.0.0.1'))))
        })
      } else {
        Message({
          message: error.response.status + ': ' + error.response.data.message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(error)
      }
    }
  }
)

export default service
