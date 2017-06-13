
// 是否允许所有IP都可以访问此API进行跨域
// 在开发阶段可以打开它进行访问
const allowOriginAll = false

// 指定部分IP可以访问此API进行跨域
// 用来当作一个小窗口 提供给外界访问
const allowOrigin = [
  'http://192.168.56.1:8080',
  'http://localhost:8080',
  'http://localhost:3000',
  'http://192.168.56.1:3000'
]

module.exports = async (ctx, next) => {
  let origin = ctx.request.header.origin
  if (
    allowOriginAll ||
    (
      allowOrigin &&
      allowOrigin.indexOf(origin) > -1
    )
  ) {
    // Access-Control-Allow-Origin 允许的域
    ctx.set('Access-Control-Allow-Origin', origin)
    // Access-Control-Allow-Headers 允许的header类型
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    ctx.set("Content-Type", "application/json;charset=utf-8")
  }
  await next()
}
