import aInputBox from 'components/a-input-box/'
import aMessageBox from 'components/a-message-box/'

export default {
  name: 'app',
  components: {
    aInputBox,
    aMessageBox
  },
  async created () {

    await this.$indexDB.openSync({
      dbName: 'tieba',
      dbStoreName: 'global'
    })
    let start = null
    try {
      start = await this.$indexDB.get('start')
    } catch (e) {
      console.log('indexDB 需要初始化， 故重新渲染一次')
      await location.reload()
    }
    // 查看一下是否是第一次进入本贴吧
    if (!start) {
      this.$router.replace('/start')
    } else {
      // 时间过得太久了 也会重新刷一次 跳到 login 页中
      // 这儿约定的是 30天过期
      let now = Date.now()
      start = (now - start > 3600*1000*24*30) ? true : false
      await this.$indexDB.set(now, 'start')
      if (start) {
        this.$router.replace('/login')
      } else {
        // 没有过期的话 就看一下是否存在用户的本地信息
        let res = await this.$indexDB.get('userServer')
        if (!res) {
          // 不存在用户的本地信息 就让他登录一下
          this.$router.replace('/login')
        } else {
          // 否则的话，就获取用户的本地信息至axios
          if (res.username) {
            let url = this.$api + 'user/info'
            let res1 = await this.axios.post(url, {'username': res.username})
            if (res1.data) {
              res = res1.data
            }
          }
          await this.$store.dispatch('setUserServer', res)
          let router = this.$router.cache[this.$router.cache.length-1]
          if (!router) router = '/root/home'
          this.$router.replace(router)
        }
      }
    }
  }
}
