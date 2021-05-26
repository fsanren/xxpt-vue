import { } from '@/api/login'
import axios from 'axios'

import request from '@/common/utils/request'
import { changeToken, setToken, removeToken } from '@/common/utils/auth'
// import {MessageBox} from "element-ui/types/message"
// import { MessageBox } from 'element-ui'
import { MessageBox } from 'element-ui'

import defaultSettings from '@/settings'
import { Message } from 'element-ui'
const { sysCode } = defaultSettings

const user = {
  state: {
    token: '',
    name: '',
    roleNo: '',
    roleName: '',
    avatar: '',
    redirecturl: '',
    layouttype: '1',
    // themeColor: '#14889A',  // 主题颜色
    // oldThemeColor: '#14889A',   // 上一次主题颜色
    roles: [],
    app: {},
    permissionList: [],
    userInfo: null

  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_LAYOUTTYPE: (state, layouttype) => {
      state.layouttype = layouttype
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLENO: (state, roleNo) => {
      state.roleNo = roleNo
    },
    SET_ROLENAME: (state, roleName) => {
      state.roleName = roleName
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    // setThemeColor (state, themeColor) {  // 改变主题颜色
    //   state.oldThemeColor = state.themeColor
    //   state.themeColor = themeColor
    // },
    SET_REDIRECTURL: (state, redirecturl) => {
      state.redirecturl = redirecturl
    },
    SET_APP: (state, app) => {
      state.app = app
    },
    SET_PERMISSION: (state, permissionList) => {
      state.permissionList = permissionList
    },
    DEL_USER_ALL: (state) => {
      state.name = ''
      state.roleName = ''
      state.roleNo = ''
      state.roles = []
      state.permissionList = []
      state.userInfo = null
      state.avatar = ''
      state.redirecturl = ''
    }
  },

  actions: {
    // 登录
    Login ({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.VUE_APP_BASE_CODE + '/login/loginAccount',
          method: 'get'
        }).then((res) => {
          if (res.data.code === 200) {
            setToken(res.data.result.token)
            setInterval(() => {
              changeToken()
            }, 3000000)
            resolve()
          } else if (res.data.code === 500) {
            MessageBox.alert(
              res.data.message,
              '系统提示',
              {
                confirmButtonText: '确定',
                callback: () => {
                  reject()
                }
              }
            )
          } else {
            var str = window.location.href
            window.location.replace(process.env.NODE_ENV === 'production' ? STATIC_CONFIG_PROD.VUE_APP_LOGIN_URL + '?toredirect=' + encodeURIComponent(encodeURIComponent(str.replace('localhost', '127.0.0.1'))) : STATIC_CONFIG_DEV.VUE_APP_LOGIN_URL + '?toredirect=' + encodeURIComponent(encodeURIComponent(str.replace('localhost', '127.0.0.1'))))
          }
        }).catch(() => {
          Message({
            message: '登录出错，请联系管理员',
            type: 'error',
            duration: 5 * 1000
          })
        })
      })
    },
    ChangeLayout ({ commit }, layoutvalue) {
      commit('SET_LAYOUTTYPE', layoutvalue)
    },

    // 获取用户信息以及加载平台管理路由
    GetInfo ({ commit, state }) {
      commit('SET_LAYOUTTYPE', '1')
      return new Promise((resolve, reject) => {
        //
        request({
          url: '/glss-api/login/getPermission',
          method: 'post',
          data: {
            menuCode: sysCode
          }
        }).then((response) => {
          // let resData = response.data
          if (response.code && response.code === 200) {
            // commit('SET_ROLENO', resData.result.sysRole.roleNo)
            // commit('SET_NAME', resData.result.userName)
            // commit('SET_ROLENAME', resData.result.sysRole.roleName)
            commit('SET_USERINFO', response.result.userInfo)
            // commit('SET_ROLES', resData.result.sysRole.roleId)
            commit('SET_PERMISSION', response.result.menuTree.buttonDtoList)
            resolve(response)
          } else {
            reject()
          }
        }).catch(() => {
          reject()
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 登出
    LogOut ({ commit, state }) {
      removeToken()
      location.reload()
      window.location.replace(process.env.NODE_ENV === 'production' ? STATIC_CONFIG_PROD.VUE_APP_LOGOUT_URL : STATIC_CONFIG_DEV.VUE_APP_LOGOUT_URL)
    },
    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_REDIRECTURL', '')
        removeToken()
        resolve()
      })
    },
    delUserAll ({ commit, state }) {
      return new Promise(() => {
        commit('DEL_USER_ALL', state)
      })
    }
  }
}

export default user
