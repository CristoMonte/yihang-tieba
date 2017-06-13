const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema
moment.locale('zh-cn')

const floorSchema = new Schema({

  // 实在是不知道取什么名字好
  // 就叫楼友吧，挺贴切的
  // floor friend
  ff: {
    type: Schema.ObjectId,
    required: true,
    ref: 'user'
  },

  // 信息
  cont: {
    type: String,
    required: true
  },

  // 下面是各楼的表演时间 （这是个数组）
  commit: [{
    uid: {
      type: Schema.ObjectId,
      ref: 'user',
    },
    to: String,
    cont: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],

  // 帖子创建时间
  createDate: {
    type: Date,
    default: Date.now
  }

},
{
  _id: true,  // 是否自动生成_id
  autoIndex: true,  // 是否自动创建索引
  versionKey: false  // 是否自动生成versionKey字段
})

floorSchema.set('toJSON', { getters: true, virtuals: true })
floorSchema.set('toObject', { getters: true, virtuals: true })
floorSchema.path('createDate').get(function(v) {
  if(v) return moment(v).format('lll')
})
// floorSchema.path('commit.date').get(function(v) {
//   return moment(v).format('lll')
// })

module.exports = floorSchema
