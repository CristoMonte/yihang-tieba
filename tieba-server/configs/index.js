const fs = require('fs')
let config = {
  app: {
    port: process.env.PORT || 8889,
    baseApi: '/api',
    baseProxy: '/proxy'
  },
  mongodb: {
    url: 'mongodb://localhost:27017/tieba'
  },
  jwt: {
    secret: 'me' //默认
  },
  mongodbSecret: { //mongodb用户和密码
    user: '',
    pass: ''
  },
  admin: {  //后台初始化的用户名密码
  	user: 'admin',
  	pwd: 'password'
  }
}
// ./private.js
// module.exports = {
//   mongodbSecret: {
//     user: '',
//     pass: ''
//   },
//   jwt: {
//     secret: 'xxx'
//   },
//   admin: {
//   	 user: '',
//   	 pwd: ''
//   }
// }
if (fs.existsSync(__dirname + '/private.js')) {
  config = Object.assign(config, require('./private.js'))
}

module.exports = config
