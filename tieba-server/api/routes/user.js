const $ = require('../controllers/user.js')

module.exports = async (router) => {
  router.post('/user/info', $.info) // 获取某用户信息
  .post('/user/verify', $.verify)   // 验证用户的账号和密码
  .post('/user/init', $.init)  // 创建账号
  .post('/user/exist', $.exist)  // 验证用户名是否已存在
  .post('/user/modify', $.modify)  //修改用户信息
  .post('/user/addFollowBar', $.addFollowBar)  // 添加FollowBar
  .post('/user/removeFollowBar', $.removeFollowBar)  // 移除FollowBar
}
