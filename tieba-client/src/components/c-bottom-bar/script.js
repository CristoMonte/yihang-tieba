import aBottomBarCell from '@/components/a-bottom-bar-cell'
import dataJson from './data.json'
import {mapActions} from 'vuex'

/* 组件中使用到的其他组件 */

const components = {
  aBottomBarCell
}

/* vue 组件属性定义 */

const data = function () {
  return {
    barCellList: dataJson
  }
}

const methods = {
  setActionBarIndex (index) {
    this.$store.dispatch('setActionBarIndex', index)
  }
}

/* vue 组件属性合成并导出 */

export default {
  data,
  methods,
  components
}
