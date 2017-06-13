import aHomePostCell from 'components/a-home-post-cell'
import BScroll from 'better-scroll'

/* 组件中使用到的其他组件 */

const components = {
  aHomePostCell
}

/* vue 组件属性定义 */

const data = function () {
  return {
    posts: []
  }
}

const mounted = function () {
  this.$nextTick(() => {
    this._initScroll()
  })
}

const created = async function () {
  let url = this.$api + 'post/random'
  let res = await this.axios.get(url).catch(e => console.error(e))
  if (res.data[0] && res.data[0].title) this.posts = res.data
}

const methods = {
  _initScroll () {
    this.postScroll = new BScroll(this.$refs.homePostsWrapper,{
      scrollY: true,
      click: true,
    })
  },
  updateScroll () {
    if (this.postScroll) {
      this.postScroll.refresh()
    }
  }
}

/* vue 组件属性合成并导出 */

export default {
  data,
  mounted,
  methods,
  created,
  components
}
