/* 组件中使用到的其他组件 */

const components = {}

/* 数据 */

const hello = 'hello world'

/* vue 组件属性定义 */

const data = function () {
  return {
    hello
  }
}

/* vue 组件属性合成并导出 */

export default {
  data,
  components
}
