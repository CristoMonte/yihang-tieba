import BScroll from 'better-scroll'

/* vue 组件属性定义 */

const data = function () {
  return {
    searchMsg: '',
    focus: false,
    result: [
      ' T: o-o  这个功能还没做好呢 后台还在吐血中',
      ' C: 哈哈 没关系 我照样可以搜索',
      ' T: 怕个什么~~  赶紧来试试吧',
      ' C: 哼 老夫拿起键盘就是干 ',
      ' C: JQery Bootstrap PS PDD 55K 皮皮虾 凤姐姐 侯亮平 ...',
      ' C: 该搜的东西都搜一波',
      ' C: 天呐 贴贴 这到底是个森麽？',
      ' T: 贴贴想告诉你 搜索有瑕疵 毕竟不是真的搜索引擎',
      ' C: 哼 数据都是乱的 你就转个码不好么',
      ' T: 不会诶 iconv-lite 都用了 就是不行',
      ' T: 啊 啊 啊 拯救我吧。。。 晕死 吐血中...'
    ],
    history: [],  // 历史记录 关联在 localstorage
    prompt: []  // 提示
  }
}

const methods = {
  clearSearchMsg () {
    this.searchMsg = ''
  },
  _initScroll () {
    this.resultScroll = new BScroll(this.$refs.resultWrapper)
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
    localStorage.setItem('know-history', this.history.join('^-^'))
    let url = this.$proxy + 'zd?wd=' + this.searchMsg
    let res = await this.axios.get(url).catch(e => alert('网络粗问题啦！'))
    this.result = []
    res.data.forEach(item => {
      this.result.push(item)
    })
    // if (res.data) this.next(res.data)
  },
  searchPrompt () {
    // 实时检测搜索情况
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(async () => {
      let url = this.$proxy + 'su?wd=' + this.searchMsg
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
    this.history = []
    localStorage.removeItem('know-history')
  },
  addText (index) {
    this.searchMsg = this.history[index]
  },
  addTextPrompt (index) {
    this.searchMsg = this.prompt[index]
  },
  remove (index) {
    this.history.splice(index, 1)
    localStorage.setItem('know-history', this.history.join('^-^'))
  }
}

const created = function () {
  let history = localStorage.getItem('know-history')
  if (history) this.history = history.split('^-^')
}

const mounted = function () {
  this.$nextTick(() => {
    this._initScroll()
    if (this.$refs.touchCell_2) this.$utils.touchStyle(this.$refs.touchCell_2)
    if (this.history.length) this.$utils.touchStyle(this.$refs.touchCell)
    if (this.result.length) this.$utils.touchStyle(this.$refs.touchCell_1, 'touch-active', this.$store.dispatch, ['switchMessageBox',true])
    if (!this.searchPromptScroll) this.searchPromptScroll = new BScroll(this.$refs.searchPrompt,{ click: true })
  })
}

const updated = function () {
  if (this.prompt.length) this.$utils.touchStyle(this.$refs.touchCell_3)
  if (this.searchHistoryScroll) this.searchHistoryScroll.refresh()
  if (this.resultScroll) this.resultScroll.refresh()
  if (this.searchPromptScroll) this.searchPromptScroll.refresh()
}

/* vue 组件属性合成并导出 */

export default {
  data,
  methods,
  mounted,
  created,
  updated
}
