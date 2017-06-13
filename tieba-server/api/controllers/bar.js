const md5 = require("md5")
const jwt = require('jsonwebtoken')
const config = require('../../configs/')

const models = require('../models')

const Floor = models.floor
const Post = models.post
const Bar = models.bar
const User = models.user

const curd = require('../library/curd')
const curdBar = require('../library/curd-bar')

// http://localhost:8889/api/bar/info/59338ca643e7030c349851d4?page=1 GET
// 获取吧的信息
// 返回的信息大概是这样的。。。
// {
//   "bar": {
//     "_id": "59338ca643e7030c349851d4",
//     "name": "杨凡",
//     "createDate": "2017年6月4日 12:29",
//     "postNum": 0,
//     "focusNum": 0,
//     "bg": "#3388ff",
//     "id": "59338ca643e7030c349851d4"
//   },
//   "posts": [
//     {
//       "_id": "59338e5b0645d30928997b78",
//       "bar": "5",
//       ...
//     },
//     ...
//   ]
// }
exports.info = async function (ctx) {
  let _id = ctx.params.id
  let page = ctx.query.page > 0 ? ctx.query.page : 1
  let result = await curdBar.retrieveOneDoc(Bar, Post, {_id}, page, 8, true, '-admin')
  ctx.body = result
}

// http://localhost:8889/api/bar/su?wd=xxxx GET
// 对吧的信息进行模糊查询
// 返回的信息大概是这样的。。。
exports.su = async function (ctx) {
  if (ctx.query.wd) {
    let reg = new RegExp(ctx.query.wd, 'i')
    let obj = {
      //多条件，数组
      $or : [
        { name: { $regex : reg}},
        { description: { $regex : reg}}
      ]
    }
    let result = await curd.retrieveDocs(Bar, obj, 'name description')
    ctx.body = result
  } else {
    ctx.body = false
  }
}

// http://localhost:8889/api/bar/so?wd=xxxx GET
// 对吧的信息进行模糊查询
// 返回的信息大概是这样的。。。
exports.so = async function (ctx) {
  if (ctx.query.wd) {
    let reg = new RegExp(ctx.query.wd, 'i')
    let obj = {
      //多条件，数组
      $or : [
        { name: { $regex : reg}},
        { description: { $regex : reg}}
      ]
    }
    let result = await curdBar.retrieveDocs(Bar, obj)
    ctx.body = result
  } else {
    ctx.body = false
  }
}

// http://localhost:8889/api/bar/upinfo/59338ca643e7030c349851d4?page=1 GET
// 获取吧的信息
// 返回的信息大概是这样的。。。
// {
// "posts": [
//   {
//     "_id": "59338e5b0645d30928997b78",
//     "bar": "59338ca643e7030c349851d4",
//     "lz": {
//       "_id": "5932df727a19590ad8c727af",
//       "username": "yangfan",
//       "avatar": "/static/img/app-default-normal.png",
//       "barBirthday": "2017年6月4日 00:10",
//       "password": "哈哈 还想套我密码 没门儿!",
//       "id": "5932df727a19590ad8c727af"
//     },
//     "title": "hahahaha",
//     "cont": "nimenhao",
//     "createDate": "2017年6月4日 12:36",
//     "floor": [],
//     "id": "59338e5b0645d30928997b78"
//   },
//   {
//     ...
//   }
// ]
// }
exports.upInfo = async function (ctx) {
  let _id = ctx.params.id
  let page = ctx.query.page > 0 ? ctx.query.page : 1
  let result = await curdBar.retrieveOneDoc(Bar, Post, {_id}, page, 8, false, '-admin')
  ctx.body = result
}

// http://localhost:8889/api/bar/create POST
// {
// 	"name": "杨凡",
//  "userID": ""
// }
// 建吧
exports.create = async function (ctx) {
  if (ctx.request.body.admin && ctx.request.body.admin[0]) {
    let _id = ctx.request.body.admin[0]
    let isUserExist = await curd.retrieveOneDocExist(User, {_id})
    if (isUserExist) {
      let {name} = ctx.request.body
      let result = await curd.createOneDoc(Bar, ctx.request.body, {name})
      if (result) {
        let barId = result.id
        await curd.updateOneDocAttrItem(User, {_id}, {followBar: {bar:barId}})
      }
      ctx.body = result
    } else {
      ctx.body = false
    }
  }
}
