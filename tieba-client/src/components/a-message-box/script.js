import dataJson from './data.json'

const {threeClick, threeClickNext} = dataJson

/* vue 组件属性定义 */

const data = function () {
  return {
    tc: threeClick,
    tcn: threeClickNext,
    index: 0
  }
}

const methods = {
  closeShowMessage (e) {
    this.$store.dispatch('switchMessageBox', false)
  }
}

const computed = {
  message () {
    // 用于吐信息的 ---- -V-
    let msg = this.$store.state.messageBox
    if (msg === true) {
      if (this.index > 0) {
        if (this.index < this.tc.length) {
          return this.tc[this.index++]
        } else {
          let index = Math.floor((Math.random() * this.tcn.length))
          return this.tcn[index++]
        }
      } else {
        this.index = 1
        return this.tc[0]
      }
    }
  }
}

/* vue 组件属性合成并导出 */

export default {
  data,
  methods,
  computed
}
