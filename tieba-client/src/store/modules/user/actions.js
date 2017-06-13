import * as types from './mutations_types'

export default {
  setUserServer ({commit}, value) {
    commit(types.SET_USER_SERVER, value)
  },
  pushUserFollowBar ({commit}, value) {
    commit(types.PUST_USER_FOLLOWBAR, value)
  },
  removeUserFollowBar ({commit}, value) {
    commit(types.REMOVE_USER_FOLLOWBAR, value)
  },
  pushUserBarsInfo ({commit}, value) {
    commit(types.PUST_USER_BARSINFO, value)
  },
  setUserBarsInfo ({commit}, value) {
    commit(types.SET_USER_BARSINFO, value)
  }
}
