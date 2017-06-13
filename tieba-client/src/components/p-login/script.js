
/* vue 组件属性定义 */

const data = () => {
  return {
    unp: '请输入用户名',
    pwp: '请输入密码',
    username: '',
    password: '',
    userAccess: false
  }
}

const mounted = function () {
  this.$utils.touchStyle(this.$refs.loginSubmit, 'login-submit--touch')
}

const methods = {
  async submit () {
    // 检测用户名是否符合规范
    let res1 = this.$utils.checkUsername(this.username)
    if (res1 !== true) {
      this.unp = res1
      this.username = ''
    }
    // 再检测密码是否符合规范
    let res2 = this.$utils.checkPassword(this.password)
    if (res2 !== true) {
      this.pwp = res2
      this.password = ''
    }
    if (this.username && this.password) {
      let url = this.$api + 'user/verify'
      let res = await this.axios.post(url, {
        "username": this.username,
        "password": this.password
      }).catch(e => alert('总是没有网络 为什么会这样！'))
      if (res) this.next(res.data)
      // console.log(res.data)
    }
  },
  async checkUser () {
    // 实时检测用户名是否符合规范
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(async () => {
      let res = this.$utils.checkUsername(this.username)
      if (res !== true) {
        if (this.userAccess) this.userAccess = false
        return false
      }
      let url = this.$api + 'user/exist'
      res = await this.axios.post(url, {
        "username": this.username
      }).catch(e => alert('网络粗问题啦！'))
      if (res && res.data === 1) this.userAccess = true
      else this.userAccess = false
    }, 500)
  },
  async next (res) {
    if (typeof res !== 'object') {
      this.username = ''
      this.password = ''
      this.unp = '登录失败 请重新注册'
    } else {
      await this.$indexDB.set(res, 'userServer')
      await this.$store.dispatch('setUserServer', res)
      this.$router.replace('/root/home')
    }
  }
}

/* vue 组件属性合成并导出 */

export default {
  data,
  methods,
  mounted
}
