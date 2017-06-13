import BScroll from 'better-scroll'

/* vue 组件属性定义 */

const mounted = function () {
  this.$nextTick(() => {
    this._initScroll()
  })
}

const methods = {
  async closeShowStart () {
    await this.$store.dispatch('switchStartPage', false)
    await this.$indexDB.set(Date.now(),'start')
    this.$router.replace('/logup')
  },
  _initScroll () {
    let scroll = new BScroll(this.$refs.startWrapper, {
      click: true,
      scrollY: false,
      scrollX: true,
      probeType: 1
    })
    // let startWrapper = this.$refs.startWrapper
    // let wid = startWrapper.offsetWidth
    //
    // scroll.on('touchend', function (position) {
    //   let el = startWrapper.childNodes[0].childNodes
    //   let index = Math.round(- position.x / wid)
    //   scroll.scrollToElement(el[index], 1000, 0, 0, 'ease')
    // })
    // return false
  }
}

/* vue 组件属性合成并导出 */

export default {
  methods,
  mounted
}
