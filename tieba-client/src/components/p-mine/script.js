import BScroll from 'better-scroll'
import dataJson from './data.json'

/* 组件中使用到的其他组件 */

const components = {}

/* vue 组件属性定义 */

const data = function () {
  return {
    functionLists: dataJson.fnLists,
    headerAbsScroll: 200,
    headerResScroll: 60,
    upLowColor: dataJson.upLowColor,
    defaultColor: dataJson.defaultColor,
    downLowColor: dataJson.downLowColor,
    scrollY: 0
  }
}

const computed = {
  // 实现头部背景更换效果
  header () {
    let per = 0
    let bgc = {}
    if (this.scrollY < 0) per = - this.scrollY / this.headerAbsScroll
    if (this.scrollY > 0) per = - this.scrollY / this.headerResScroll
    let perAbs = Math.abs(per)
    if (per <= -1) {
      bgc = this.upLowColor
    } else if (per > -1 && per < 0) {
        bgc.r = Math.abs(Math.round((this.upLowColor.r - this.defaultColor.r) * perAbs + this.defaultColor.r))
        bgc.g = Math.abs(Math.round((this.upLowColor.g - this.defaultColor.g) * perAbs + this.defaultColor.g))
        bgc.b = Math.abs(Math.round((this.upLowColor.b - this.defaultColor.b) * perAbs + this.defaultColor.b))
        bgc.a = Math.abs((this.upLowColor.a - this.defaultColor.a) * perAbs + this.defaultColor.a)
    } else if (per === 0) {
      bgc = this.defaultColor
    } else if (per > 0 && per < 1) {
      bgc.r = Math.abs(Math.round((this.downLowColor.r - this.defaultColor.r) * perAbs + this.defaultColor.r))
      bgc.g = Math.abs(Math.round((this.downLowColor.g - this.defaultColor.g) * perAbs + this.defaultColor.g))
      bgc.b = Math.abs(Math.round((this.downLowColor.b - this.defaultColor.b) * perAbs + this.defaultColor.b))
      bgc.a = Math.abs((this.downLowColor.a - this.defaultColor.a) * perAbs + this.defaultColor.a)
    } else {
      bgc = this.downLowColor
    }
    return {
      bgc: `rgba(${bgc.r},${bgc.g},${bgc.b},${bgc.a})`
    }
  },
  userinfo () { return this.$store.state.user.userServer },
  following () { return this.$store.state.user.following },
  followBar () { return this.$store.state.user.followBar },
  followers () { return this.$store.state.user.followers },
  userId () { return this.$store.state.user.id }
}

const methods = {
  _initScroll () {
    this.mineScroll = new BScroll(this.$refs.mineWrapper, {
      click: true,
      probeType: 3
    })
    this.mineScroll.on('scroll', (function (pos) {
      this.scrollY = Math.round(pos.y)
    }).bind(this))
  }
}

const mounted = function () {
  this.$nextTick(() => {
    this._initScroll()
  })
  let touchCells = []
  for (let i = 1; i <= 8; i++) {
    touchCells.push(this.$refs['touchCell'+i])
  }
  this.$utils.touchStyle(this.$refs.touchCell, 'touch-active',this.$store.dispatch, ['switchMessageBox',true])
  this.$utils.touchStyle(touchCells, 'touch-active',this.$store.dispatch, ['switchMessageBox',true])
  this.$utils.imageError(this.$refs.imgErr, 1)
}

/* vue 组件属性合成并导出 */

export default {
  data,
  methods,
  mounted,
  computed,
  components
}
