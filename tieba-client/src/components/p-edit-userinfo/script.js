import BScroll from 'better-scroll'
import dataJson from './data.json'

/* 组件中使用到的其他组件 */

const components = {}

/* vue 组件属性定义 */

const data = function () {
  return {
    functionLists: dataJson.fnLists,
    headerAbsScroll: 80,
    headerResScroll: 60,
    upLowColor: dataJson.upLowColor,
    defaultColor: dataJson.defaultColor,
    downLowColor: dataJson.downLowColor,
    scrollY: 0,
    clickIndex: null,
    username: '',
    password: '',
    pwp: '请输入密码'
  }
}

const computed = {
  // 实现头部背景更换效果
  header () {
    let per = 0
    let bgc = {}
    if (this.scrollY < 0) per = - this.scrollY / this.headerAbsScroll
    if (this.scrollY > 0) per = - this.scrollY / this.headerResScroll
    let perAbs = Math.abs(per)
    if (per <= -1) {
      bgc = this.upLowColor
    } else if (per > -1 && per < 0) {
        bgc.r = Math.abs(Math.round((this.upLowColor.r - this.defaultColor.r) * perAbs + this.defaultColor.r))
        bgc.g = Math.abs(Math.round((this.upLowColor.g - this.defaultColor.g) * perAbs + this.defaultColor.g))
        bgc.b = Math.abs(Math.round((this.upLowColor.b - this.defaultColor.b) * perAbs + this.defaultColor.b))
        bgc.a = Math.abs((this.upLowColor.a - this.defaultColor.a) * perAbs + this.defaultColor.a)
    } else if (per === 0) {
      bgc = this.defaultColor
    } else if (per > 0 && per < 1) {
      bgc.r = Math.abs(Math.round((this.downLowColor.r - this.defaultColor.r) * perAbs + this.defaultColor.r))
      bgc.g = Math.abs(Math.round((this.downLowColor.g - this.defaultColor.g) * perAbs + this.defaultColor.g))
      bgc.b = Math.abs(Math.round((this.downLowColor.b - this.defaultColor.b) * perAbs + this.defaultColor.b))
      bgc.a = Math.abs((this.downLowColor.a - this.defaultColor.a) * perAbs + this.defaultColor.a)
    } else {
      bgc = this.downLowColor
    }
    return {
      bgc: `rgba(${bgc.r},${bgc.g},${bgc.b},${bgc.a})`
    }
  },
  userinfo () {
    let lists = dataJson.fnLists
    let userServer = this.$store.state.user.userServer
    lists[0].msg = userServer.username
    lists[1].msg = userServer.nickname
    lists[2].msg = userServer.sex
    lists[3].msg = userServer.description
    lists[4].msg = userServer.avatar
    return lists
  }
}

const methods = {
  _input () {
    let arr = ['username', 'nickname', 'sex', 'description', 'avatar']
    let index = arr[this.clickIndex]
    this.$store.state.user.userServer[index] = this.$store.state.input.inputServer.text
  },
  _initScroll () {
    this.mineScroll = new BScroll(this.$refs.editUserinfoWrapper, {
      click: true,
      probeType: 3
    })
    this.mineScroll.on('scroll', (function (pos) {
      this.scrollY = Math.round(pos.y)
    }).bind(this))
  },
  editUserinfoCell (index) {
    this.clickIndex = index
    let title = this.userinfo[index].text
    let text = this.userinfo[index].msg
    let target = this
    this.$store.dispatch('setInputServer', {title, text, target})
    this.$store.dispatch('setInputShow', true)
  },
  // 点击提交的事件处理函数
  async editSubmit (e) {
    // 对 better-scroll 事件进行过滤
    if (event._constructed) {
      return
    }
    // 检测用户名是否符合规范
    let user = this.$store.state.user.userServer
    let res1 = this.$utils.checkUsername(user.username)
    if (res1 !== true) {
      user.username = res1
    }
    // 检测性别是否符合规范
    let res2 = this.$utils.checkSex(user.sex)
    if (res2 !== true) {
      user.sex = res2
    }
    // 检测用户密码
    let res3 = this.$utils.checkPassword(this.password)
    if (res3 !== true) {
      this.password = ''
      this.pwp = res3
    }
    // 检测头像地址是否符合规范
    let res4 = this.$utils.checkAvatar(user.avatar)
    if (res4 !== true) {
      user.avatar = res4
    }
    // 如果都通过验证 就可以发送数据了 （头像地址不强制要求通过验证）
    if (res1===true && res2===true && res3===true) {
      let url = this.$api + 'user/modify'
      let res = await this.axios.post(url, {
        "username": this.username,
        "password": this.password,
        "ctx": user
      }).catch(e => console.error(e))
      this.next(res.data)
    }
  },
  // 当用户信息被提交至服务器后，根据返回的信息 给用户进行提示
  async next (res) {
    if (typeof res !== 'object' || res.ok !== 1) {
      alert('o=o 服务器端出现了未知错误 请稍后再试')
      this.pwp = '更新失败'
    } else if (res.nModified === 0) {
      alert('用户信息未能通过验证 请检查密码')
      this.password = ''
      this.pwp = '请重新输入密码'
    } else {
      let url = this.$api + 'user/info'
      let res = await this.axios.post(url, {'username': this.username})
      if (res) {
        await this.$store.dispatch('setUserServer', res)
      }
      this.$router.go(-1)
    }
  },
  async distoryUser () {
    await this.$indexDB.openSync({
      dbName: 'tieba',
      dbStoreName: 'global'
    })
    let res = await this.$indexDB.delete('userServer')
    await this.$store.dispatch('setUserServer', {})
    this.$router.replace('/login')
    window.location.reload()
  }
}

const mounted = async function () {
  this.$nextTick(() => {
    this._initScroll()
    this.$utils.imageError(this.$refs.imgErr, 1)
    this.$utils.touchStyle(this.$refs.touchCell)
    this.$utils.touchStyle(this.$refs.editSubmit)
  })
  await this.$indexDB.openSync({
    dbName: 'tieba',
    dbStoreName: 'global'
  })
  let res = await this.$indexDB.get('userServer')
  if (res) {
    this.username = res.username
  }
}

/* vue 组件属性合成并导出 */

export default {
  data,
  methods,
  mounted,
  computed,
  components
}
