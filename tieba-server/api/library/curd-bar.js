
// 返回匹配到的一份文档 找不到时返回空数组
// 模型 要匹配的规则 需过滤的字段
exports.retrieveOneDoc = (mainModel, otherModel, obj, page = 1, num = 8, reAll, field) => {
  return new Promise((res, rej) => {
    mainModel.findOne(obj)
    .select(field)
    .exec((err, doc1) => {
      if (doc1) {
        let _id = doc1.id
        // let skipNum = page * num
        // let limitNum = num
        otherModel.find({bar:_id})
        .populate('lz',['nickname', 'avatar'])
        // .skip(0)
        // .limit(limitNum)
        .sort({createTime: 1})
        .exec((err, doc2) => {
          if (reAll) {
            res({
              bar: doc1,
              posts: doc2
            })
          } else {
            res(doc2)
          }
        }).catch(err => {
          rej(err)
        })
      }
    })
    .catch(err => {
      rej(err)
    })
  })
}

// 返回匹配到的所有文档 找不到时返回空数组
// 模型 要匹配的规则 需过滤的字段 返回的数量
exports.retrieveDocs = (model, obj, field, num = 10) => {
  return new Promise((res, rej) => {
    model.find(obj)
    .select(field)
    .populate('admin', ['nickname', 'avatar'])
    .limit(num)
    .exec((err, doc) => {
      res(doc)
    })
    .catch(err => {
      rej(err)
    })
  })
}
