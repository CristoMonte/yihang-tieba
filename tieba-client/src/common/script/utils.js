/**
 * 整个应用中，可能需要用到的全局方法
 *
 * 2017.5 www.freeedit.cn
 * yang fan
 */

import imgErrImg from 'common/images/image-onerror.js'
import userDefImg from 'common/images/user-default.js'

const base64Err = [imgErrImg, userDefImg]  // 图片未加载时出来

export default {
  // 启用全屏 接受一个元素作为全屏的对象
  // 主要用来针对 video 元素
  launchFullscreen (element = document.documentElement) {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    }
  },
  // 退出全屏
  exitFullscreen () {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  },
  touchstart (event) {
    event.target.classList.add('touch-active')
  },
  touchend (event) {
    event.target.classList.remove('touch-active')
  },
  click (event) {
    this.touchstart()
    setTimeout(this.touchend, 300)
  },
  // 用户触摸时添加样式 松开时改变样式
  // 绑定的DOM元素 点击时添加的类名 连续点击三次以上触发的处理函数 处理函数接受的参数
  touchStyle (dom, className = 'touch-active', fn, fnArgs) {
    if (!(dom instanceof Array)) {
      dom = [dom]
    }
    dom.forEach(item => {
      if (!(item instanceof Object)) return false
      if (!item.$touchStyle) {
        item.addEventListener('touchstart', function (e) {
          // 当用户连续点击同一个按钮超过三次时， 触发事件
          item.classList.add(className)
          if (!item.touch) item.touch = 1
          else item.touch++
          if (item.touch === 3) {
            if (fn) {
              if (fnArgs) fn(...fnArgs)
              else fn()
            }
          }
          if (item._timer) clearTimeout(item._timer)
          item._timer = setTimeout(() => {
            item.touch = null
          }, 600)
        }, false)
        item.addEventListener('touchmove', function (e) {
          item.classList.remove(className)
        }, false)
        item.addEventListener('touchend', function (e) {
          item.classList.remove(className)
        }, false)
        item.$touchStyle = true
      }
    })
  },
  imageError (dom, type = 0) {
    if (!(dom instanceof Array)) {
      dom = [dom]
    }
    dom.forEach(item => {
      if (!item.$imgErr) {
        item.addEventListener('error', function () {
          item.src = base64Err[type]
        })
        item.$imgErr = true
      }
    })
  },
  checkUsername (username) {
    username = username.trim()
    if (username === '') return '用户名不能为空'
    if (username.length < 7) return '用户名少于7位'
    let tou = username.at ? username.at(0) : username.charAt(0)
    if (tou === '0') return '用户名不能以0开头'
    let reg = /^[1-9a-zA-Z]{1}[0-9a-zA-Z]{6,}$/.test(username)
    if (!reg) return '用户名可用字符为 0-9a-zA-Z'
    return true
  },
  checkPassword (password) {
    password = password.trim()
    if (password === '') return '密码不能为空'
    if (password.length < 7) return '密码少于7位'
    let reg = /^[0-9a-zA-Z_\\-\\*\\#\\$]{7,}$/.test(password)
    if (!reg) return '密码可用字符为 0-9a-zA-Z_-*#$'
    return true
  },
  checkSex (sex) {
    let reg = /^[男|女|保密]$/.test(sex)
    if (!reg) return '性别书写有误'
    return true
  },
  checkAvatar (avatar) {
    let reg = /[\\.jpg|\\.png|\\.gif|\\.svg]$/.test(avatar)
    if (!reg) return 'http://op7vi85xr.bkt.clouddn.com/user-default-avatar.png'
    return true
  }
}
