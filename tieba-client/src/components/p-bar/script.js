import BScroll from 'better-scroll'

/* vue 组件属性定义 */

const data = function () {
  return {
    followBar: ''
  }
}

const methods = {
  _initScroll () {
    this.menuScroll = new BScroll(this.$refs.barWrapper, {
      click:"true"
    })
  },
  openShowAuthor () {
    this.$store.dispatch('switchAuthorPage', true)
  },
  followBarAssist () {
    let _this = this
    let fbTimer = setInterval(async function () {
      let followBar = _this.$store.getters.getFollowBar
      if (!followBar[0]) return false
      else {
        let arr_1 = []
        let arr_2 = []
        for (let i = 0; i < followBar.length; i++) {
          let url = _this.$api + 'bar/info/' + followBar[i].bar
          let res = await _this.axios.get(url).catch(e => {
            clearInterval(fbTimer)
          })
          if (res.data) {
            arr_1.push(res.data)
            arr_2.push(res.data.bar)
          }
        }
        if (arr_1.length) {
          await _this.$store.dispatch('setUserBarsInfo', arr_1)
        }
        _this.followBar = arr_2
        clearInterval(fbTimer)
        _this.menuScroll.refresh()
      }
    }, 100)
  }
}

const updated = function () {
  this.$nextTick(() => {
    if (this.$refs.touchCell) this.$utils.touchStyle(this.$refs.touchCell, 'bar-item--touch')
  })
}

const mounted = function () {
  this.$nextTick(() => {
    this._initScroll()
    this.followBarAssist()
  })
  if (this.$refs.touchCell) this.$utils.touchStyle(this.$refs.touchCell, 'bar-item--touch')
  this.$utils.touchStyle(this.$refs.touchCell_1, 'bar-add--touch')
}

/* vue 组件属性合成并导出 */

export default {
  data,
  methods,
  updated,
  mounted
}
