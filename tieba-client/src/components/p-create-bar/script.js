import BScroll from 'better-scroll'

/* vue 组件属性定义 */

const data = function () {
  return {
    description: '',
    bg: '',
    icon: ''
  }
}

const methods = {
  async editSubmit (e) {
    if (event._constructed) {
      return
    } else if (!this.$store.state.user.id) {
      alert ('您尚未登录 该功能需登录后才能使用')
    } else {
      let url = this.$api + 'bar/create'
      let res = await this.axios.post(url, {
        "name": this.$route.params.name,
        "description": this.description,
        "bg": this.bg,
        "icon": this.icon,
        "admin": [this.$store.state.user.id]
      }).catch(e => console.error(e))
      if (typeof res.data === 'object') {
        this.$store.dispatch('pushUserFollowBar', {
          bar: res.data.id,
          level: 0
        })
        this.$router.replace('/root/bar')
      }
    }
  }
}

/* vue 组件属性合成并导出 */

export default {
  data,
  methods
}
