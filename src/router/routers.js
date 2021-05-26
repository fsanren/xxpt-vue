import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/common/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: 'jcxxgl/route',
    hidden: true,
    meta: {
      requireAuth: false
    },
    children: [{
      path: '/jcxxgl/route',
      name: 'route',
      component: (resolve) => require(['@/views/login/index.vue'], resolve),
      meta: { title: '路网信息', icon: 'calendar-cplx', affix: true }
    }]
  },
  { path: '/404', name: '404', component: (resolve) => require(['@/views/404'], resolve), hidden: true }
]

export default new Router({
  mode: 'hash',
  base: process.env.NODE_ENV === 'production' ? '/jcss-web' : '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
