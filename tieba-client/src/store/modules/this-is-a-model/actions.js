import * as types from './mutations_types'

export default {
  someAction ({dispatch, commit, getters, rootGetters}) {
    commit(types.SOME_ATTR)
  }
}
