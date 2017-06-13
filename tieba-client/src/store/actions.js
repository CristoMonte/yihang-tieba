import * as types from './mutations_types'

export default {
  setActionBarIndex ({commit}, index) {
    commit(types.SET_ACTIVE_BAR_INDEX, index)
  },
  switchAuthorPage ({commit}, value) {
    commit(types.SWITCH_AUTHOR_PAGE, value)
  },
  switchStartPage ({commit}, value) {
    commit(types.SWITCH_START_PAGE, value)
  },
  switchMessageBox ({commit}, value) {
    commit(types.SWITCH_MESSAGE_BOX, value)
  },
  setPassword ({commit}, res) {
    commit(types.SET_PASSWORD, res)
  },
  setInputShow ({commit}, value) {
    commit(types.SET_INPUT_SHOW, value)
  }
}
