
/* vue 组件属性定义 */

const data = () => {
  return {
    unp: '请输入用户名',
    pwp: '请输入密码',
    rpwp: '请再次输入密码',
    username: '',
    password: '',
    repassword: '',
    userAccess: false
  }
}

const mounted = function () {
  this.$utils.touchStyle(this.$refs.logupSubmit, 'logup-submit--touch')
}

const methods = {
  async submit () {
    // 首先检查两次密码是否一致
    if (this.password !== this.repassword) {
      this.rpwp = '两次输入的密码不相等'
      this.repassword = ''
    }
    // 接着检测用户名是否符合规范
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
    if (this.username && this.password && this.repassword) {
      let url = this.$api + 'user/init'
      let res = await this.axios.post(url, {
        "username": this.username,
        "password": this.password
      }).catch(e => alert(e))
      if (res) this.next(res.data)
    }
  },
  async checkUser () {
    // 接着检测用户名是否符合规范
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
      }).catch(e => alert(e))
      if (res && res.data === 0) this.userAccess = true
      else this.userAccess = false
    }, 500)
  },
  async next (res) {
    if (typeof res !== 'object') {
      this.username = ''
      this.password = ''
      this.repassword = ''
      this.unp = '注册失败 请重新注册'
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
