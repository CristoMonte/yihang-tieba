import BScroll from 'better-scroll'
import dataJson from './data.json'
import aHomePostCell from 'components/a-home-post-cell'

/* 组件中使用到的其他组件 */

const components = {
  aHomePostCell
}

/* vue 组件属性定义 */

const data = function () {
  return {
    headerAbsScroll: 100,
    headerResScroll: 60,
    upLowColor: dataJson.upLowColor,
    defaultColor: dataJson.defaultColor,
    downLowColor: dataJson.downLowColor,
    scrollY: 0,
    bar: {},
    posts: [],
    isFollowing: false,
    isShowCreatePost: false,
    level: 0,
    content: '',
    title: ''
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
  }
}

const methods = {
  _initScroll () {
    this.barScroll = new BScroll(this.$refs.barWrapper, {
      click: true,
      probeType: 3
    })
    this.barScroll.on('scroll', (function (pos) {
      this.scrollY = Math.round(pos.y)
    }).bind(this))
  },
  updateScroll () {
    if (this.barScroll) {
      this.barScroll.refresh()
    }
  },
  onCreatePost () {
    this.isShowCreatePost = true
  },
  offCreatePost () {
    this.isShowCreatePost = false
  },
  async editSubmit () {
    if (event._constructed) {
      return
    } else if (!this.$store.state.user.id) {
      alert('您尚未登录 该功能需登录后才能使用')
    } else if (!this.title || !this.content) {
      alert('发贴的内容或标题不能为空')
    } else{
      let url = this.$api + 'post/create'
      let res = await this.axios.post(url, {
        "bar": this.$route.params.id,
        "lz": this.$store.state.user.id,
        "title": this.title,
        "cont": this.content
      }).catch(e => console.error(e))
      if (res.data && res.data instanceof Object) {
        this.posts.push(res.data)
        this.$nextTick(() => {
          this.updateScroll()
        })
        this.offCreatePost()
        this.bar.postNum++
      }
    }
  },
  async toggleFollow () {
    if (event._constructed) {
      return
    } else if (!this.$store.state.user.id) {
      alert ('您尚未登录 该功能需登录后才能使用')
    } else {
      let url = ''
      if (this.isFollowing) {
        url = this.$api + 'user/removeFollowBar'
      } else {
        url = this.$api + 'user/addFollowBar'
      }
      let res = await this.axios.post(url, {
        "bar": this.$route.params.id,
        "id": this.$store.state.user.id
      }).catch(e => console.error(e))
      if (res.data && res.data instanceof Object) {
        if (this.isFollowing) {
          this.bar.focusNum--
          this.$store.dispatch('removeUserFollowBar', this.bar.id)
        } else {
          this.bar.focusNum++
          this.$store.dispatch('pushUserFollowBar', {
            bar: this.bar.id,
            level: 0
          })
        }
        this.isFollowing = !this.isFollowing
      }
    }
  }
}

const created = async function () {
  let id = this.$route.params.id
  let url = this.$api + 'bar/info/' + id
  let res = await this.axios.get(url).catch(e => console.error(e))
  if (res.data && res.data.bar) this.bar = res.data.bar
  if (res.data && res.data.posts) this.posts = res.data.posts
  let fb = this.$store.state.user.followBar
  fb.forEach(item => {
    if (item.bar === id) {
      this.isFollowing = true
      this.level = item.level
    }
  })
}

// ObjectId("593b6605a3a5511fdc95a013")
// 593b6605a3a5511fdc95a013

const mounted = function () {
  this.$nextTick(() => {
    this._initScroll()
    this.$utils.imageError(this.$refs.imgErr_1)
  })
}

/* vue 组件属性合成并导出 */

export default {
  data,
  methods,
  mounted,
  computed,
  created,
  components
}
