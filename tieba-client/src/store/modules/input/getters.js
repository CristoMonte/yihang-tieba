export default {
  title (state) {
    return state.inputServer.title ? state.inputServer.title : ''
  },
  text (state) {
    return state.inputServer.text ? state.inputServer.text : ''
  },
  target (state) {
    return state.inputServer.target ? state.inputServer.target : ''
  }
}
