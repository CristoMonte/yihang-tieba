const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema
moment.locale('zh-cn')

const userSchema = new Schema({

  // 昵称
  nickname: {
    type: String,
    trim: true,
    default: '哥哥，我还没有名字~'
  },

  // 用户名
  username: {
    type: String,
    trim: true, // 预定义修饰符 用于去掉前后的空字符串
    required: true,
    index: {unique: true} // 创建 唯一性索引
  },

  // 密码
  password: {
    type: String,
    required: true // 不为空
  },

  // 我的贴吧生日
  barBirthday: {
    type: Date,
    default: Date.now
  },

  // 头像
  avatar: String,

  // 性别
  sex: {
    type: String,
    default: '保密',
    enmu: ['男','女','保密']
  },

  // 简介 | 描述
  description: {
    type: String,
    default: '楼主大人太懒了，现在都还没有添加任何描述……'
  },

  // 当当 这是我心中的偶像们
  following: [{
    type: Schema.ObjectId,
    ref: 'user'
  }],

  // 啊哈 我的粉丝们
  followers: [{
    type: Schema.ObjectId,
    ref: 'user'
  }],

  // 我加入的贴吧列表
  followBar: [{
    bar: {
      type: Schema.ObjectId,
      ref: 'bar'
    },
    level: {  // 准确来讲 这儿应该是签到次数
      type: Number,
      default: 0
    }
  }]

},
{
  _id: true,  // 是否自动生成_id
  autoIndex: true,  // 是否自动创建索引
  versionKey: false  // 是否自动生成versionKey字段
})

userSchema.set('toJSON', { getters: true, virtuals: true })
userSchema.set('toObject', { getters: true, virtuals: true })
userSchema.path('barBirthday').get(function(v) {
  if(v) return moment(v).format('lll')
})
userSchema.path('password').get(function(v) {
  if(v) return '哈哈 还想套我密码 没门儿!'
})

module.exports = userSchema
