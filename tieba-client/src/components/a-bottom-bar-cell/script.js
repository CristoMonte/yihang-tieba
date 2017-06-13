/* vue 组件属性定义 */

const props = {
  barCell: {
    type: Object,
    default: {
      icon: ['', ''],
      title: '',
      path: '/'
    }
  },
  barIndex: {
    type: Number,
    default: 0
  }
}

const computed = {
  barIcon () {
    let index = this.$store.state.activeBarIndex
    index = index === this.barIndex ? 1 : 0
    return this.barCell.icon[index]
  }
}

/* vue 组件属性合成并导出 */

export default {
  props,
  computed
}
