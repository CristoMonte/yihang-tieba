const $ = require('../controllers/bar.js')

module.exports = async (router) => {
  router.post('/bar/create', $.create)  // 建吧
  .get('/bar/info/:id', $.info)  // 获取某吧信息
  .get('/bar/upInfo/:id', $.upInfo) // 获取某吧的帖子 （下拉刷新的那种）
  .get('/bar/su', $.su)  // 实时获取吧名和描述信息
  .get('/bar/so', $.so)  // 得到对吧模糊查询的结果
}
