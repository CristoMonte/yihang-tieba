
// 返回匹配到的一份文档 找不到时返回空数组
// 模型 要匹配的规则 需过滤的字段
exports.retrieveOneDoc = (mainModel, otherModel, anotherModel, obj, page = 1, reAll, field) => {
  return new Promise((res, rej) => {

    mainModel.findOne(obj)
    .select(field)
    .populate([{
      path: 'floor',
      model: otherModel,
      populate: {
        path: 'ff',
        select: ['nickname', 'avatar'],
        model: anotherModel
      }
    }])
    .populate('bar', 'name')
    .populate('lz', 'nickname avatar')
    .exec()
    .then((doc) => {
      res(doc)
    })
    .catch(err => {
      rej(err)
    })

  })
}
