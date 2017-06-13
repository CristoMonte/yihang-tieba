
/* vue 组件属性定义 */

const props = {
  posts: {
    type: Array,
    default: []
  }
}

const mounted = function () {
  if (this.$refs.touchCell) this.$utils.touchStyle(this.$refs.touchCell)
  this.$emit('update')
  if (this.$refs.imgErr) this.$utils.imageError(this.$refs.imgErr, 1)
}

/* vue 组件属性合成并导出 */

export default {
  props,
  mounted
}
