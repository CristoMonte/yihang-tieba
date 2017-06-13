import * as types from './mutations_types'

export default {
  [types.SOME_ATTR] (state, otherValue) {
    state.someKey = otherValue
  }
}
