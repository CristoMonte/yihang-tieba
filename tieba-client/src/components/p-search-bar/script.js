import BScroll from 'better-scroll'

/* vue 组件属性定义 */

const data = function () {
  return {
    searchMsg: '',
    focus: false,
    createShow: false,
    result: [],
    history: [],  // 历史记录 关联在 localstorage
    prompt: []  // 提示
  }
}

const methods = {
  clearSearchMsg () {
    this.searchMsg = ''
  },
  focusOn () {
    if (!this.history.length && !this.prompt.length) return false
    this.focus = true
    this.$refs.searchText.focus()
    if (!this.searchHistoryScroll) {
      this.$nextTick(() => {
        this.searchHistoryScroll = new BScroll(this.$refs.searchHistoryWrapper,{
          click: true
        })
      })
    }
  },
  focusOff () {
    this.focus = false
    this.$refs.searchText.blur()
  },
  // 提交后 去获取数据
  async submit () {
    this.focus = false
    if (this.timer) clearTimeout(this.timer)
    this.history.push(this.searchMsg)
    localStorage.setItem('bar-history', this.history.join('^-^'))
    let url = this.$api + 'bar/so?wd=' + this.searchMsg
    let res = await this.axios.get(url).catch(e => alert('网络粗问题啦！'))
    if (res.data.length) {
      this.result = []
      res.data.forEach(item => {
        this.result.push(item)
      })
      this.createShow = false
    } else {
      this.result = []
      this.createShow = true
    }
  },
  searchPrompt () {
    // 实时检测搜索情况
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(async () => {
      let url = this.$api + 'bar/su?wd=' + this.searchMsg
      let res = await this.axios.get(url).catch(e => alert('网络粗问题啦！'))
      this.prompt = res.data
      if (this.prompt.length) {
        this.focus = true
        if (this.searchPromptScroll) this.searchPromptScroll.refresh()
      }
    }, 500)
  },
  clear () {
    this.focus = false
    if (this.timer) clearTimeout(this.timer)
    this.history = []
    localStorage.removeItem('bar-history')
  },
  addText (index) {
    this.searchMsg = this.history[index]
  },
  addTextPrompt (index) {
    this.searchMsg = this.prompt[index].name
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
    if (this.$refs.touchCell_2) this.$utils.touchStyle(this.$refs.touchCell_2)
    if (this.$refs.resultWrapper) this.resultScroll = new BScroll(this.$refs.resultWrapper,{
      click: true
    })
    if (this.history.length) this.$utils.touchStyle(this.$refs.touchCell)
  })
  if (!this.searchPromptScroll) {
    this.$nextTick(() => {
      this.searchPromptScroll = new BScroll(this.$refs.searchPrompt,{
        click: true
      })
    })
  }
}

const updated = function () {
  if (!this.resultScroll && this.$refs.resultWrapper) {
    this.resultScroll = new BScroll(this.$refs.resultWrapper, {click: true})
  }
  this.$nextTick(() => {
    if (this.searchHistoryScroll) this.searchHistoryScroll.refresh()
    if (this.result.length && this.resultScroll) this.resultScroll.refresh()
    if (this.searchPromptScroll) this.searchPromptScroll.refresh()
  })
  if (this.result.length) this.$utils.touchStyle(this.$refs.touchCell_1)
  if (this.prompt.length) this.$utils.touchStyle(this.$refs.touchCell_3)
  if (this.result.length && this.$refs.imgErr_1) this.$utils.imageError(this.$refs.imgErr_1)
  if (this.result.length && this.$refs.imgErr_2) this.$utils.imageError(this.$refs.imgErr_2, 1)
}

/* vue 组件属性合成并导出 */

export default {
  data,
  methods,
  mounted,
  created,
  updated
}
