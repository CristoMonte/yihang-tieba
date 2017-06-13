import BScroll from 'better-scroll'
import dataJson from './data.json'

/* 组件中使用到的其他组件 */

const components = {}

/* vue 组件属性定义 */

const data = function () {
  return {
    msgList: dataJson
  }
}

const methods = {
  _initScroll () {
    this.menuScroll = new BScroll(this.$refs.msgWrapper, {
      click: true
    })
  },
  openShowAuthor () {
    this.$store.dispatch('switchAuthorPage', true)
  }
}

const mounted = function () {
  this.$nextTick(() => {
    this._initScroll()
  })
  this.$utils.touchStyle(this.$refs.touchCell,'touch-active',this.$store.dispatch, ['switchMessageBox',true])
}

/* vue 组件属性合成并导出 */

export default {
  data,
  methods,
  mounted,
  components
}
