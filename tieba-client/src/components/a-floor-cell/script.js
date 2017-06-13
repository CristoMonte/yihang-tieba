
/* vue 组件属性定义 */

const props = {
  posts: {
    type: Array,
    default: []
  }
}

const mounted = function () {
  this.$utils.touchStyle(this.$refs.touchCell)
  this.$emit('update')
  this.$utils.imageError(this.$refs.imgErr, 1)
}

/* vue 组件属性合成并导出 */

export default {
  props,
  mounted
}
