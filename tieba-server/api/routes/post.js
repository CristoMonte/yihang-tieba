const $ = require('../controllers/post.js')

module.exports = async (router) => {
  router.get('/post/random', $.random)  // 获取随机的几个文章
  .get('/post/so', $.so)  // 对文章的信息进行模糊查询
  .get('/post/detail/:id', $.detail)  // 对文章的信息进行详细查询
  .get('/post/:id', $.info)  // 获取帖子的简单信息
  .post('/post/create', $.create)  // 新建一个帖子
  .post('/post/addFloor', $.addFloor)  // 给这个帖子新建一个楼层 （就是回帖嘛）
  .post('/post/addCommit', $.addCommit)  // 给这个楼层新建一个回复
}
