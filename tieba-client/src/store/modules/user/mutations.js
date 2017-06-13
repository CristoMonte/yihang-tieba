import * as types from './mutations_types'

export default {
  [types.SET_USER_SERVER] (state, value) {
    if (value.username) state.userServer.username = value.username
    if (value.nickname) state.userServer.nickname = value.nickname
    if (value.sex) state.userServer.sex = value.sex
    if (value.description) state.userServer.description = value.description
    if (value.avatar) state.userServer.avatar = value.avatar
    if (value.id) state.id = value.id
    if (value.barBirthday) state.barBirthday = value.barBirthday
    if (value.follower) state.follower = value.follower
    if (value.followBar) state.followBar = value.followBar
    if (value.following) state.following = value.following
  },
  [types.PUST_USER_FOLLOWBAR] (state, value) {
    state.followBar.push(value)
  },
  [types.REMOVE_USER_FOLLOWBAR] (state, value) {
    let index = -1
    for (var i = 0; i < state.followBar.length; i++) {
      if (state.followBar[i].bar === value) {
        index = i
        break
      }
    }
    if (index > -1) {
      state.followBar.splice(index, 1)
    }
  },
  [types.PUST_USER_BARSINFO] (state, value) {
    state.barsInfo.push(value)
  },
  [types.SET_USER_BARSINFO] (state, value) {
    if (!(value instanceof Array)) value = [value]
    state.barsInfo = value
  }
}
