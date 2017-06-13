import * as types from './mutations_types'

export default {
  [types.SET_INPUT_SERVER] (state, value) {
    if (value.title) state.inputServer.title = value.title
    if (value.text) state.inputServer.text = value.text
    if (value.target) state.inputServer.target = value.target
  }
}
