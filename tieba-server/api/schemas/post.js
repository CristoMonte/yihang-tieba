const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema
moment.locale('zh-cn')

const postSchema = new Schema({

  // 来自哪个吧
  bar: {
    type: Schema.ObjectId,
    ref: 'bar',
    index: true // 创建 辅助性索引
  },

  // lz 就是楼主啦
  lz: {
    type: Schema.ObjectId,
    required: true,
    ref: 'user',
    index: true
  },

  // 下面是各楼的表演时间 （这是个数组）
  floor: [{
    type: Schema.ObjectId,
    ref: 'floor',
    index: true
  }],

  // 标题党请上台表演
  title: {
    type: String,
    trim: true,
    required: true
  },

  // 信息
  cont: {
    type: String,
    trim: true,
    required: true
  },

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

postSchema.set('toJSON', { getters: true, virtuals: true })
postSchema.set('toObject', { getters: true, virtuals: true })
postSchema.path('createDate').get(function(v) {
  if(v) return moment(v).format('lll')
})

module.exports = postSchema
