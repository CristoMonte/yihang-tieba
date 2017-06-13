import BScroll from 'better-scroll'

/* 组件中使用到的其他组件 */

const components = {}

/* vue 组件属性定义 */

const data = function () {
  return {
    post: {},
    floors: [],
    floorSu: ''
  }
}

const methods = {
  _initScroll () {
    this.postScroll = new BScroll(this.$refs.postDetailWrapper, {
      click: true
    })
  },
  async floorSubmit () {
    if (!this.floorSu) return false
    if (!this.$store.state.user.id) {
      alert('您尚未登录 该功能需登录后才能使用')
    } else {
      let id = this.post.id
      let floor = {
        ff: this.$store.state.user.id,
        cont: this.floorSu
      }
      let url = this.$api + 'post/addFloor'
      let res = await this.axios.post(url, {
        id,
        floor
      }).catch(e => console.error(e))
      if(res.data && res.data[0]) {
        this.floorSu = ''
        this.floors.push(res.data[0])
      }
    }
  },
  commitSubmit (index) {
    if (!this.$store.state.user.id) {
      alert('您尚未登录 回复功能需登录后才能使用')
    } else {
      this.clickIndex = index
      let title = '回复' + this.floors[index].ff.nickname
      let text = ''
      let target = this
      this.$store.dispatch('setInputServer', {title, text, target})
      this.$store.dispatch('setInputShow', true)
    }
  },
  async _input () {
    if (!this.$store.state.user.id) {
      alert('您尚未登录 回复功能需登录后才能使用')
    } else {
      let id = this.floors[this.clickIndex].id
      let uid = this.$store.state.user.id
      let to = this.floors[this.clickIndex].ff.nickname
      let cont = this.$store.state.input.inputServer.text
      if (!id || !uid || !cont) {
        alert('内容为空 或 不满足回复的条件')
      } else {
        let url = this.$api + 'post/addCommit'
        let res = await this.axios.post(url, {
          id,
          commit: {
            uid,
            to,
            cont
          }
        }).catch(e => console.error(e))
        if(res.data && !res.data.nModified) {
          await this.floors[this.clickIndex].commit.push(res.data)
          this.$store.state.input.inputServer.text = ''
        }
      }
    }
  }
}

const created = async function () {
  let id = this.$route.params.id
  if (id) {
    let url = this.$api + 'post/detail/' + id
    let res = await this.axios.get(url).catch(e => console.error(e))
    if(res.data) this.post = res.data
    if(res.data && res.data.floor) this.floors = res.data.floor
  }
}

const updated = function () {
  if (this.scrollTimer) clearTimeout(this.scrollTimer)
  this.scrollTimer = setTimeout(() => {
    if (this.postScroll) this.postScroll.refresh()
    this.$utils.touchStyle(this.$refs.touchCell)
  }, 300)
  if (this.$refs.imgErr_2) this.$utils.imageError(this.$refs.imgErr_2, 1)
}

const mounted = function () {
  this.$nextTick(() => {
    this._initScroll()
  })
  if (this.$refs.imgErr_1) this.$utils.imageError(this.$refs.imgErr_1, 1)
}

/* vue 组件属性合成并导出 */

export default {
  data,
  methods,
  mounted,
  created,
  updated,
  components
}
