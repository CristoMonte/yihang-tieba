const mongoose = require('mongoose')

const barSchema = require('../schemas/bar.js')
module.exports.bar = mongoose.model('bar', barSchema)

const userSchema = require('../schemas/user.js')
module.exports.user = mongoose.model('user', userSchema)

const floorSchema = require('../schemas/floor.js')
module.exports.floor = mongoose.model('floor', floorSchema)

const postSchema = require('../schemas/post.js')
module.exports.post = mongoose.model('post', postSchema)
