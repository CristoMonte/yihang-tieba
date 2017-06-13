const md5 = require("md5")
const models = require('../models')

const Floor = models.floor
const Post = models.post
const Bar = models.bar
const User = models.user

const curd = require('../library/curd')


// http://localhost:8889/api/user/verify post
// {
// 	"password": "t45t879e",
// 	"username": "wwwwdfsww"
// }
// 验证用户名 和 密码
// 验证成功 返回用户信息
// 验证失败 返回 false
exports.verify = async function (ctx) {
  let {username, password} = ctx.request.body
  password = md5(password)
  let result = await curd.retrieveNumOrOneDoc(User, {username,password}, {password: 0})
  if (typeof result === 'object') {
    if (result instanceof Array) result = result[0]
    ctx.body = result
  }
  else ctx.body = false
  // if (typeof result === 'object') {
  //   const token = jwt.sign(
  //   {
  //     uid: result._id,
  //     name: result.name,
  //     exp: Math.floor(Date.now()/1000) + 24 * 60 * 60 //1 hours
  //   },
  //   config.jwt.secret);
  //   ctx.body = result
  // } else {
  //   ctx.body = false
  // }
}

// http://localhost:8889/api/user/info POST
// {
// 	"username": "t45t879e"
// }
exports.info = async function (ctx) {
  let {username} = ctx.request.body
  let result = await curd.retrieveOneDoc(User, {username}, {password: 0})
  if (result instanceof Array) result = result[0]
  ctx.body = result
}

// http://localhost:8889/api/user/exist POST
// {
// 	"username": "t45t879e"
// }
exports.exist = async function (ctx) {
  let {username} = ctx.request.body
  let result = await curd.retrieveOneDocExist(User, {username})
  ctx.body = result
}

// http://localhost:8889/api/user/init POST
// {
// 	"password": "t45t879e",
// 	"username": "wwwwdfsww"
// }
// 初始化用户信息
// username重复 或参数不全 均返回false
exports.init = async function (ctx) {
  let {username} = ctx.request.body
  ctx.request.body.password = md5(ctx.request.body.password)
  let result = await curd.createOneDoc(User, ctx.request.body, {username})
  if (typeof result === 'object') {
    if (result instanceof Array) result = result[0]
    result.password = ''
  }
  ctx.body = result
}

// http://localhost:8889/api/user/modify POST
// {
// 	"username": "11111111",
// 	"password": "22222222",
// 	"ctx": {
// 		"description": "wo",
// 		"nickname": "haha"
// 	}
// }
// 更改一条用户信息
// username或密码不存在 或参数不全 均返回false
exports.modify = async function (ctx) {
  if (! (ctx.request.body.password && ctx.request.body.ctx) ) {
    ctx.body = '没有密码 或 没有内容, 无法完成修改操作'
    return ctx.body
  }
  let {username, password} = ctx.request.body
  password = md5(password)
  if (ctx.request.body.password) {
    ctx.request.body.password = md5(ctx.request.body.password)
  }
  let result = await curd.updateOneDocSomeItem(User, {username, password}, ctx.request.body.ctx)
  ctx.body = result
}

exports.addFollowBar = async function (ctx) {
  if (! (ctx.request.body.id && ctx.request.body.bar) ) {
    ctx.body = '没有指定用户ID和吧ID, 无法完成修改操作'
    return ctx.body
  }
  let {id, bar} = ctx.request.body
  await curd.updateOneDocSomeItem(Bar, {_id: bar}, {$inc: {focusNum: 1}})
  let result = await curd.updateOneDocAttrItem(User, {_id: id}, {followBar:{bar, level: 0}})
  ctx.body = result
}

exports.removeFollowBar = async function (ctx) {
  if (! (ctx.request.body.id && ctx.request.body.bar) ) {
    ctx.body = '没有指定用户ID和吧ID, 无法完成修改操作'
    return ctx.body
  }
  let {id, bar} = ctx.request.body
  await curd.updateOneDocSomeItem(Bar, {_id: bar}, {$inc: {focusNum: -1}})
  let result = await curd.updateOneDocAttrItemRemove(User, {_id: id}, {followBar:{bar}})
  ctx.body = result
}
