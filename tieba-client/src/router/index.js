/**
 * 路由的入口
 *
 * 2017.5 www.freeedit.cn
 * yang fan
 */

import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  routes
})

router.cache = []
router.cacheMaxNum = 10  // 指定最大跳转信息条数
router.cacheRetainNum = 5  // 指定需保留的跳转信息条数

router.beforeEach((to, from, next) => {
  // 如果缓存的路由跳转信息数量超过router.cacheNum条
  // 就只保留最后的router.cacheNum条信息
  if (router.cache.length >= router.cacheMaxNum) {
    router.cache = router.cache.slice(router.cache.length - router.cacheRetainNum + 1)
  }
  // 设计此函数 用以同步当前需要跳转的路径信息
  function cacheSync () {
    if (router.cache[router.cache.length - 1] !== to.fullPath) {
      if (router.cache[router.cache.length - 2] !== to.fullPath) {
        router.cache.push(to.fullPath)
      } else {
        router.cache.pop()
      }
      localStorage.setItem('routerCache', router.cache.join('^-^'))
    }
  }
  // 如果应用程序已经打开很久了，就直接同步
  if (router.cache.length > 0) {
    cacheSync()
  // 如果应用程序才刚打开，则先从localStorage中取数据，再同步
  } else {
    let str = localStorage.getItem('routerCache')
    if (str) {
      router.cache = str.split('^-^')
      cacheSync()
    } else {
      router.cache.push(to.fullPath)
      localStorage.setItem('routerCache', to.fullPath)
    }
  }
  // console.log(router.cache)
  next()
})

export default router
