const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema
moment.locale('zh-cn')

const barSchema = new Schema({

  // 吧的背景色 或背景图
  bg: {
    type: String,
    trim: true,
    default: '#3388ff'
  },

  // 吧的标志图片
  icon: {
    type: String,
    trim: true,
    default: '-'
  },

  // 吧名 --不能重复
  name: {
    type: String,
    trim: true,
    required: true
  },

  // 吧的描述
  description: {
    type: String,
    trim: true,
    default: '现在还没有描述...'
  },

  admin: [{
    type: Schema.ObjectId,
    ref: 'user'
  }],

  // 关注的人数
  focusNum: {
    type: Number,
    default: 1
  },

  // 文章数量
  postNum: {
    type: Number,
    default: 0
  },

  // bar创建时间
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

barSchema.set('toJSON', { getters: true, virtuals: true })
barSchema.set('toObject', { getters: true, virtuals: true })
barSchema.path('createDate').get(function(v) {
  if(v) return moment(v).format('lll')
})

module.exports = barSchema
