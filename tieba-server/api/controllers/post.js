const md5 = require("md5")
const models = require('../models')

const Floor = models.floor
const Post = models.post
const Bar = models.bar
const User = models.user

const curd = require('../library/curd')
const curdPost = require('../library/curd-post')

// http://localhost:8889/api/post/59337bdadc3b1502a4e90eae GET
exports.info = async function (ctx) {
  let _id = ctx.params.id
  let result = await curd.retrieveDocs(Post, {_id})
  if (typeof result === 'object') {
    ctx.body = result
  }
  else ctx.body = false
}

// http://localhost:8889/api/post/detail/59337bdadc3b1502a4e90eae GET
exports.detail = async function (ctx) {
  let _id = ctx.params.id
  let page = ctx.query.page > 0 ? ctx.query.page : 1
  let result = await curdPost.retrieveOneDoc(Post, Floor, User, {_id}, page)
  ctx.body = result
}

// http://localhost:8889/api/post/random?num=1 GET
exports.random = async function (ctx) {
  let num = ctx.query.num || 1
  let result = await curd.retrieveRandomDocsFromPage(Post, num)
  if (typeof result === 'object') {
    ctx.body = result
  }
  else ctx.body = false
}

// http://localhost:8889/api/post/so?wd=xxxx GET
// 对文章的信息进行模糊查询
// [
//   {
//     "_id": "59338e060645d30928997b70",
//     "bar": "59338ca643e7030c349851d4",
//     "lz": "5932df727a19590ad8c727af",
//     "title": "hahahaha",
//     "cont": "nimenhao",
//     "createDate": "2017年6月4日 12:35",
//     "id": "59338e060645d30928997b70"
//   },
//   ...
//   {
//     "_id": "59338e5b0645d30928997b79",
//     "bar": "59338ca643e7030c349851d4",
//     "lz": "5932df727a19590ad8c727af",
//     "title": "hahahaha",
//     "cont": "nimenhao",
//     "createDate": "2017年6月4日 12:36",
//     "id": "59338e5b0645d30928997b79"
//   }
// ]
exports.so = async function (ctx) {
  if (ctx.query.wd) {
    let reg = new RegExp(ctx.query.wd, 'i')
    let obj = {
      //多条件，数组
      $or : [
        { title: { $regex : reg}},
        { cont: { $regex : reg}}
      ]
    }
    let result = await curd.retrieveDocs(Post, obj, '-floor')
    ctx.body = result
  } else {
    ctx.body = false
  }
}

// http://localhost:8889/api/post/create POST
// {
// 	"bar": "59338ca643e7030c349851d4",
// 	"lz": "5932df727a19590ad8c727af",
// 	"title": "=========================",
// 	"cont": "   nimenhao"
// }
exports.create = async function (ctx) {
  if (ctx.request.body.bar && ctx.request.body.lz && ctx.request.body.title && ctx.request.body.cont) {
    let result = await curd.createOneDoc(Post, ctx.request.body)
    if (typeof result === 'object') {
      ctx.body = result
      let _id = ctx.request.body.bar
      await curd.updateOneDocSomeItem(Bar, {_id}, {$inc: {postNum: 1}})
    }
    else ctx.body = false
  } else {
    ctx.body = '缺乏创建贴子必需的项'
    return false
  }
}

// http://localhost:8889/api/post/addFloor // POST
// {
// 	"id": "59338e5b0645d30928997b75", // POST ID
// 	"floor": {
// 		"ff": "5932dfbf182ef21c84900d1a",  // USER ID
// 		"cont": "xxxxx",
// 		"commit": [{
// 			"uid": "5932dfbf182ef21c84900d1a",
// 			"to": "hhhhhh",
// 			"cont": "xxxxxxxxxxxxxxxxxxxxxxx"
// 		}]
// 	}
// }
exports.addFloor = async function (ctx) {
  let _id = ctx.request.body.id
  // 创建一个楼层文档
  let result = await curd.createOneDoc(Floor, ctx.request.body.floor)
  let newId = await result._id
  if (typeof result === 'object') {
    // 将楼层文档添加到相应的文章中
    let updateResult = await curd.updateOneDocAttrItem(Post, {_id}, {floor: newId})
    if (updateResult.ok === 1) {
      ctx.body = [
        result,
        updateResult
      ]
    }
  }
  else ctx.body = false
}

// http://localhost:8889/api/post/addCommit // POST
// {
// 	"id": "59338e5b0645d30928997b75", // FLOOR ID
//  "commit": {
// 	  "uid": "5932dfbf182ef21c84900d1a",  // USER ID
// 	  "to": "hhhhhh",
// 	  "cont": "xxxxxxxxxxxxxxxxxxxxxxx"
//  }
// }
exports.addCommit = async function (ctx) {
  let _id = ctx.request.body.id
  let commit = ctx.request.body.commit
  let result = await curd.updateOneDocAttrItem(Floor, {_id}, {commit})
  if (typeof result === 'object') {
    if (result.nModified) {
      result = await curd.retrieveOneDoc(Floor, {_id})
      ctx.body = result.commit[result.commit.length-1]
    } else {
      ctx.body = result
    }
  }
  else ctx.body = false
}
