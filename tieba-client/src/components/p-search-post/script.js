import aHomePostCell from 'components/a-home-post-cell'
import BScroll from 'better-scroll'

/* 组件中使用到的其他组件 */

const components = {
  aHomePostCell
}

/* vue 组件属性定义 */

const data = function () {
  return {
    searchMsg: '',
    history: [],
    posts: [],
    hotPost: [
      '某河南女子殉情未死，家人痛哭流涕',
      '震惊，你不知道的十大酷刑',
      '期待 vue2.4 拥抱 TS',
      '老公不在家？',
      '都说这是福气，元芳，你怎么看？',
      '浴室少女是个什么梗？'
    ]
  }
}

const methods = {
  backToLastRoute () {
    this.$router.go(-1)
  },
  _initScroll () {
    this.searchScroll = new BScroll(this.$refs.searchWrapper, {
      click: true
    })
  },
  updateScroll () {
    if (this.searchScroll) {
      this.searchScroll.refresh()
    }
  },
  async submit () {
    if (this.searchMsg) {
      this.history.push(this.searchMsg)
      localStorage.setItem('bar-history', this.history.join('^-^'))
      let url = this.$api + 'post/so?wd=' + this.searchMsg
      let res = await this.axios.get(url).catch(e => console.error(e))
      if (res.data) this.posts = res.data
      this.$refs.searchText.blur()
      this.searchMsg = ''
    }
  },
  clear () {
    this.history = []
    localStorage.removeItem('bar-history')
  },
  addText (index) {
    this.searchMsg = this.history[index]
  },
  remove (index) {
    this.history.splice(index, 1)
    localStorage.setItem('bar-history', this.history.join('^-^'))
  }
}

const created = function () {
  let history = localStorage.getItem('bar-history')
  if (history) this.history = history.split('^-^')
}

const mounted = function () {
  this.$nextTick(() => {
    this._initScroll()
  })
  if (this.$refs.touchCell) this.$utils.touchStyle(this.$refs.touchCell)
  if (this.$refs.touchCell_1) this.$utils.touchStyle(this.$refs.touchCell_1)
  if (this.$refs.touchCell_2) this.$utils.touchStyle(this.$refs.touchCell_2)
}

/* vue 组件属性合成并导出 */

export default {
  data,
  methods,
  created,
  components,
  mounted
}
