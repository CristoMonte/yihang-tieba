import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
  state,        // 状态数据
  getters,      // 状态数据的计算器
  mutations,    // 状态数据的更改器 （只能同步）
  actions       // 状态数据的更改器的封装体 （可以异步）
}
