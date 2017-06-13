const koa = require('koa')
const convert = require('koa-convert')
const onerror = require('koa-onerror')
const serve = require('koa-static')
const mongoose = require('mongoose')

const url = require('url')
const path = require('path')
const fs = require('fs')
// const https = require('https')

const config = require('./configs')
const middleware = require('./middleware')
const api = require('./api')
const proxy = require('./proxy')
const cors = require('./middleware/cors')

const app = new koa()
const router = require('koa-router')()
const routerInfo = require('koa-router')()
const resolve = file => path.resolve(__dirname, file)

mongoose.Promise = Promise
mongoose.connect(config.mongodb.url, config.mongodbSecret)
mongoose.connection.on('error', console.error)

app.use(middleware())
app.use(serve(__dirname + '/public'))
app.use(cors)
onerror(app)
app.use(api())
app.use(proxy())

// const options = {
//   key: fs.readFileSync('./key.key'),
//   cert: fs.readFileSync('./pem.pem')
// }

app.listen(config.app.port)
// https.createServer(options, app.callback()).listen(443)

module.exports = app
