import dataJson from './data.json'

const baseinfo = dataJson['基本信息']
const education = dataJson['教育背景']
const link = dataJson['联系方式']

/* vue 组件属性定义 */

const data = function () {
  return {
    author: {
      '基本信息': baseinfo,
      '教育背景': education,
      '联系方式': link
    }
  }
}

const methods = {
  closeShowAuthor (e) {
    this.$store.dispatch('switchAuthorPage', false)
  },
  resume () {
    let url = 'http://www.freeedit.cn/doc/%E5%BA%94%E8%81%98%E5%89%8D%E7%AB%AF%E5%AE%9E%E4%B9%A0%E7%94%9F_%E6%9D%A8%E5%87%A1_15070836209.pdf'
    window.open(url)
    // window.location.href = 'http://www.freeedit.cn/doc/%E5%BA%94%E8%81%98%E5%89%8D%E7%AB%AF%E5%AE%9E%E4%B9%A0%E7%94%9F_%E6%9D%A8%E5%87%A1_15070836209.pdf'
  }
}

const mounted = function () {
  this.$utils.touchStyle(this.$refs.touchCell)
}

/* vue 组件属性合成并导出 */

export default {
  data,
  methods,
  mounted
}
