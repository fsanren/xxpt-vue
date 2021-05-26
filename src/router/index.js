import router from './routers'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/common/utils/auth'
import { filterAsyncRouter } from '@/store/modules/permission'
import request from '@/common/utils/request'
import defaultSettings from '@/settings'
const { parentSysCode } = defaultSettings
import stores from '../store'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    if (getToken()) {
      if (store.getters.userInfo === null) {
        store.dispatch('GetInfo').then(res => { // 拉取user_info
          // 动态路由，拉取菜单
          loadMenus(next, to)
        }).catch(() => {
          store.dispatch('LogOut').then(() => {
            // location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        if (to.path === '/onePicture/onePicture') {
          let rotuetURl = window.location.host
          window.open(rotuetURl + '/onePicture/show', '_blank')
        } else {
          next()
        }
      }
    } else {
      store.dispatch('Login').then(res => {
        loadMenus(next, to)
      }).catch(() => {
        store.dispatch('LogOut').then(() => {
          // location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }
  }
})

export const loadMenus = (next, to) => {
  request({
    url: '/glss-api/login/getRouteMenu',
    method: 'post',
    data: {
      menuCode: parentSysCode
    }
  }).then(res => {
    // console.log(res)
    var menu = res.result.routeMenuList
    var url = (window.location.hash).substr(2)
    if (url === '') {
      url = 'faultOrder'
    }
    for (var i = 0; i < menu.length; i++) {
      for (var j = 0; j < menu[i].children.length; j++) {
        var url2 = menu[i].children[j].path
        if (url.includes(url2)) {

          stores.commit('SET_ROUTER', menu[i].name)
          request({
            url: '/glss-api/login/getRouteMenu',
            method: 'post',
            data: {
              menuCode: menu[i].name
            }
          }).then(respone => {
            const asyncRouter = filterAsyncRouter(respone.result.routeMenuList)
            asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
            store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
              router.addRoutes(asyncRouter) // 动态添加可访问路由表
            })
          })
          break
        }
      }
    }
    next({ ...to, replace: true })
  })
}

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
