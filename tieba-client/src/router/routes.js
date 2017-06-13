/**
 * 具体的路由信息
 *
 * 2017.5 www.freeedit.cn
 * yang fan
 */

import comp from 'components'

export default [
  {
    path: '/root',
    name: 'root',
    component: comp.mRoot,
    children: [
      {
        path: '/root/home',
        name: 'home',
        component: comp.pHome
      },
      {
        path: '/root/bar',
        name: 'bar',
        component: comp.pBar
      },
      {
        path: '/root/know',
        name: 'know',
        component: comp.pKnow
      },
      {
        path: '/root/message',
        name: 'message',
        component: comp.pMessage
      },
      {
        path: '/root/mine',
        name: 'mine',
        component: comp.pMine
      },
      {
        path: '/root/*',
        redirect: '/root/bar'
      },
      {
        path: '/root',
        redirect: '/root/bar'
      }
    ]
  },
  {
    path: '/search-post',
    name: 'searchPost',
    component: comp.pSearchPost
  },
  {
    path: '/search-bar',
    name: 'searchBar',
    component: comp.pSearchBar
  },
  {
    path: '/create-bar/:name',
    name: 'createBar',
    component: comp.pCreateBar
  },
  {
    path: '/bar-detail/:id',
    name: 'barDetail',
    component: comp.pBarDetail
  },
  {
    path: '/post-detail/:id',
    name: 'postDetail',
    component: comp.pPostDetail
  },
  {
    path: '/author',
    name: 'author',
    component: comp.pAuthor
  },
  {
    path: '/editUserinfo',
    name: 'editUserinfo',
    component: comp.pEditUserinfo
  },
  {
    path: '/login',
    name: 'login',
    component: comp.pLogin
  },
  {
    path: '/logup',
    name: 'logup',
    component: comp.pLogup
  },
  {
    path: '/start',
    name: 'start',
    component: comp.pStart
  },
  {
    path: '/*',
    redirect: '/root'
  }
]
