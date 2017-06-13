import * as types from './mutations_types'

export default {
  [types.SET_ACTIVE_BAR_INDEX] (state, index) {
    state.activeBarIndex = index
  },
  [types.SWITCH_AUTHOR_PAGE] (state, value = false) {
    state.authorShow = value
  },
  [types.SWITCH_START_PAGE] (state, value = false) {
    state.startShow = value
  },
  [types.SWITCH_MESSAGE_BOX] (state, value = false) {
    state.messageBox = value
  },
  [types.SET_PASSWORD] (state, value = false) {
    state.password = value
  },
  [types.SET_INPUT_SHOW] (state, value = false) {
    state.inputShow = value
  }
}
