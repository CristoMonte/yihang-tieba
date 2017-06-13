
// 创建 --- Create
// 更新 --- Update
// 读取 --- Retrieve
// 删除 --- Delete

// --------------------------------------------------
// 读取 --- Retrieve
// --------------------------------------------------

// 返回匹配到的所有文档 找不到时返回空数组
// 模型 要匹配的规则 需过滤的字段 返回的数量
exports.retrieveDocs = (model, obj, field, num = 10) => {
  return new Promise((res, rej) => {
    model.find(obj)
    .select(field)
    .limit(num)
    .exec((err, doc) => {
      res(doc)
    })
    .catch(err => {
      rej(err)
    })
  })
}

// 随机匹配一些文章
// 模型 最后获取的文章数量
exports.retrieveRandomDocsFromPage = (model) => {
  return new Promise(async (res, rej) => {
    let total = await model.find().count()
    let promises = []
    let skip = 0
    let result = []
    for (var i = 0; i < 6; i++) {
    	skip = Math.round(Math.random() * total)
    	promises.push(
        model.find()
          .skip(skip)
          .limit(1)
          .exec((err, doc) => {
            if(doc[0]) doc = doc[0]
            result.push(doc)
          }).catch(e=>rej(e)
        )
      )
    }
    Promise.all(promises).then(() => {
    	res(result)
    })
  })
}

// 返回匹配到的一份文档 找不到时返回空数组
// 模型 要匹配的规则 需过滤的字段
exports.retrieveOneDoc = (model, obj, field) => {
  return new Promise((res, rej) => {
    model.findOne(obj)
    .select(field)
    .exec((err, doc) => {
      res(doc)
    })
    .catch(err => {
      rej(err)
    })
  })
}

// 查看一个文档是否存在
// 模型 要匹配的规则
// 存在一份 返回 1
// 存在多份 返回 2
// 不存在 返回0
exports.retrieveOneDocExist = (model, obj) => {
  return new Promise((res, rej) => {
    model.findOne(obj)
    .count()
    .exec((err, doc) => {
      if (doc === 1) res(doc)
      else if (doc > 1) res(2)
      else res(0)
    })
    .catch(err => {
      rej(err)
    })
  })
}

// 返回匹配到的数量 找不到时返回0
exports.retrieveNum = (model, obj) => {
  return new Promise((res, rej) => {
    model.find(obj)
    .count()
    .exec((err, doc) => {
      res(doc)
    })
    .catch(err => {
      rej(err)
    })
  })
}

// 找不到时 返回false
// 找到一条 返回该文档
// 找到多条 返回数量
exports.retrieveNumOrOneDoc = (model, obj, field) => {
  return new Promise((res, rej) => {
    model.find(obj)
    .select(field)
    .exec((err, doc) => {
      if (doc.length === 0) res(false)
      else if (doc.length === 1) res(doc)
      else res(doc.length)
    })
    .catch(err => {
      rej(err)
    })
  })
}

// --------------------------------------------------
// 创建 --- Create
// --------------------------------------------------

// 创建一个新的文档
// 该文档不可重复
// 文档已存在 则返回为false
// 模型 需保存的对象 用于查找文档的字段
exports.createOneDoc = (model, obj, reObj) => {
  return new Promise((res, rej) => {
    if (reObj) {
      exports.retrieveNumOrOneDoc(model, reObj)
      .then(data => {
        if (!data) {
          model(obj).save()
          .then((doc) => {
            res(doc)
          }).catch(err => {
            rej(err)
          })
        } else {
          res(false)
        }
      })
    } else {
      model(obj).save()
      .then((doc) => {
        res(doc)
      }).catch(err => {
        rej(err)
      })
    }
  })
}

// --------------------------------------------------
// 更新 --- Update
// --------------------------------------------------

// 更新一个文档中的数组项 （追加）
// 模型 要匹配的规则 需增加的数组及其项
exports.updateOneDocAttrItem = (model, obj, reObj) => {
  return new Promise((res, rej) => {
    model.findOne(obj)
    .update({
      $addToSet: reObj
    })
    .exec((err, doc) => {
      res(doc)
    })
    .catch(err => {
      rej(err)
    })
  })
}

// 更新一个文档中的数组项 （删除）
// 模型 要匹配的规则 需增加的数组及其项
exports.updateOneDocAttrItemRemove = (model, obj, reObj) => {
  return new Promise((res, rej) => {
    model.findOne(obj)
    .update({
      $pull: reObj
    })
    .exec((err, doc) => {
      res(doc)
    })
    .catch(err => {
      rej(err)
    })
  })
}

// 更新一个文档中的数组项
// 模型 要匹配的规则 需增加的数组及其项
exports.updateOneDocSomeItem = (model, obj, reObj) => {
  return new Promise((res, rej) => {
    model.findOne(obj)
    .update(reObj)
    .exec((err, doc) => {
      res(doc)
    })
    .catch(err => {
      rej(err)
    })
  })
}
