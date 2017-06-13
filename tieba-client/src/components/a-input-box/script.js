
/* vue 组件属性定义 */

const data = function () {
  return {
    input: ''
  }
}

const created = function () {
  this.input = this.$store.state.input.inputServer
}

const mounted = function () {
  this.$utils.touchStyle(this.$refs.editSubmit, 'edit-btn--touch')
  this.$utils.touchStyle(this.$refs.editClear, 'edit-btn--touch')
}

const updated = function () {
  this.$refs.editText.focus()
}

const methods = {
  submit () {
    let target = this.$store.state.input.inputServer.target
    if (typeof target === 'object') {
      if (target._input instanceof Function) {
        target._input()
      }
    }
    this.$store.dispatch('setInputShow')
  },
  clear () {
    this.input.text = ''
    this.$refs.editText.focus()
  }
}

/* vue 组件属性合成并导出 */

export default {
  data,
  created,
  methods,
  mounted,
  updated
}
