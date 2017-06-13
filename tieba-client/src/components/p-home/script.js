import cHomePost from 'components/c-home-post/'

/* 组件中使用到的其他组件 */

const components = {
  cHomePost
}

/* vue 组件属性定义 */

const data = function () {
  return {}
}

const methods = {
  openShowAuthor () {
    this.$store.dispatch('switchAuthorPage', true)
  }
}

/* vue 组件属性合成并导出 */

export default {
  data,
  methods,
  components
}
