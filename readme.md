# 易杭贴吧 -- 新鲜出炉的中文社区

![yihang-tieba](http://op7vi85xr.bkt.clouddn.com/freeedit_2017-5-20_22-6-6.jpg)

[源码地址 https://github.com/freeedit/yihang-tieba](https://github.com/freeedit/yihang-tieba)

[演示地址 http://tieba.freeedit.cn](http://tieba.freeedit.cn)

----

## 注意事项

node版本要求较高 需要使用新版本的node

升级node

```shell
## 安装node的一个版本管理器n
npm install n -g  

## 安装最新版本的node
n latest  

## 切换到某个固定的版本
n v8.1.0  
```

linux上面需要保证具有 npm 或者 yarn之类的包管理器

```
yum install npm
```

----

## 使用之前

在使用它们之前，需要安装mongodb

#### windows上面安装mongodb  

=> 下载所需的msi或者zip包  
=> 解压缩 或者 下一步/下一步/...  
=> 添加环境变量  

#### linux上安装mongodb

```shell
cd /usr/local/

## 不同版本的地址不一样 详见官网
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-xxx.tgz  

## 将下载后的文件解压缩
tar zxvf mongodb-linux-x86_64-xxx.tgz  

## 将解压后的文件夹重命名为 mongodb
mv mongodb-linux-x86_64-xxx mongodb  

## 删除下载后的文件
rm -rf mongodb-linux-x86_64-xxx.tgz  

## 添加 mongodb 路径
export PATH=$PATH:/usr/local/mongodb/bin
```

#### 启动mongodb

```shell
## /.../xxx 代表数据库的存放目录 初始状态下 它是空目录
mongod --dbpath /.../xxx  
```

----

## 开发阶段

安装客户端和服务器端所需的包

```shell
cd tieba-client && npm install
cd tieba-server && npm install
```

启动客户端和服务器端

```shell
npm run tieba-server
npm run tieba-client
```

打开浏览器访问如下地址, 查看效果

> localhost:8080

如需使用手机浏览 可能需要更改端口号  
查看 tieba-client/src/main.js

如需更改跨域设置  
查看 tiaba-server/middleware/cors.js

----

## 立即开始

#### 打包  

打包后的文件，直接生成在 tieba-server 目录的 public 文件夹下面  
可以供tieba-server直接调用

```shell
npm run build
```

使用pm2启动项目

```shell
npm run start
```

----

## 检查效果

打开浏览器访问如下地址, 查看效果

> localhost:8889

如需更改端口号，可查看 tieba-server/configs/index.js

----

## 演示现场

#### 初始化界面

![yihang-tieba](http://op7vi85xr.bkt.clouddn.com/tieba-start-01-%28iPhone%206%29.png)
![yihang-tieba](http://op7vi85xr.bkt.clouddn.com/tieba-start-02-%28iPhone%206%29.png)
![yihang-tieba](http://op7vi85xr.bkt.clouddn.com/tieba-start-03-%28iPhone%206%29.png)
![yihang-tieba](http://op7vi85xr.bkt.clouddn.com/tieba-start-04-%28iPhone%206%29.png)
![yihang-tieba](http://op7vi85xr.bkt.clouddn.com/tieba-start-05-%28iPhone%206%29.png)

#### 登录 注册 注销和修改用户信息

![yihang-tieba](http://op7vi85xr.bkt.clouddn.com/tieba-login-%28iPhone%206%29.png)
![yihang-tieba](http://op7vi85xr.bkt.clouddn.com/tieba-logup-%28iPhone%206%29.png)
![yihang-tieba](http://op7vi85xr.bkt.clouddn.com/tieba-edit-userinfo.png)

#### 五大主界面

![yihang-tieba](http://op7vi85xr.bkt.clouddn.com/tieba-home-%28iPhone%206%29.png)
![yihang-tieba](http://op7vi85xr.bkt.clouddn.com/tieba-know.png)
![yihang-tieba](http://op7vi85xr.bkt.clouddn.com/tieba-message-01-%28iPhone%206%29.png)
![yihang-tieba](http://op7vi85xr.bkt.clouddn.com/tieba-mine-%28iPhone%206%29.png)
![yihang-tieba](http://op7vi85xr.bkt.clouddn.com/tieba-bar-%28iPhone%206%29.png)

#### 小贴贴

![yihang-tieba](http://op7vi85xr.bkt.clouddn.com/tieba-msg-box-01-%28iPhone%206%29.png)
![yihang-tieba](http://op7vi85xr.bkt.clouddn.com/tieba-msg-box-02-%28iPhone%206%29.png)

#### 定时提示 + 搜索功能

![](http://op7vi85xr.bkt.clouddn.com/tieba-search-bar-%28iPhone%206%29.png)
![](http://op7vi85xr.bkt.clouddn.com/tieba-search-bar-no-%28iPhone%206%29.png)
![](http://op7vi85xr.bkt.clouddn.com/tieba-search-post-%28iPhone%206%29.png)
![](http://op7vi85xr.bkt.clouddn.com/tieba-search-post-result-%28iPhone%206%29.png)

#### 演示到此 其他界面请查看DEMO

[演示地址 http://tieba.freeedit.cn](http://tieba.freeedit.cn)

----

## 使用到的工具或技术

前端

template:  pug
style:     stylus  
script:    babel
database:  indexDB

pug stylus babel
vue2 vuex axios+vue-axios vue-router vue-loader
better-scroll webpack express
indexDB localStorage manifest

后端

server:    koa2
database:  mongodb

koa2 md5 cheerio nodemon PM2
mongodb mongoose moment

----

## 使用到的其他东西

`PWA` 的 `manifest.json` 用于缓存文件 使文件离线也能访问  

写了个代理，用于 `/root/know` 栏 的定时提示和搜索  
其中，定时 提示使用的是 从 `360问答` 返回的数据  
搜索 使用的是 从 `百度知道` 返回的数据  

> 注: 本项目只是用于 个人学习 和 经验总结  
> 若有侵犯他人权益的 请联系我删除相应代码  
> 联系方式见最下方  

写了个 `彩蛋`  -- `小贴贴`  
具体样子见上方截图  
唤出彩蛋的方式 上方截图中也已表明  

----

## 项目相关

该项目从五月二十几号开始，六月十一号晚上完成，一共用了近20天时间。  

#### 前端

前端项目中，一共有 `23` 个常规组件  
以 `p-` 开头的组件 代表页面级组件 page components  
以 `c-` 开头的组件 代表容器级组件 container components  
以 `a-` 开头的组件 代表原子级组件 atomic component  
以 `m-` 开头的组件 代表多页式组件 multipage components  

其中，以 `m-` 开头的组件只有一个，（m-root）  
它拥有着一个独立的路由路径，用于管理用户的大部分组件  

除了这些常规组件以外，还有一个app组件  
这个组件被抽成了一个独立的文件夹  
它用于管理app开启时，路由的跳转工作和初始资源的请求工作  
路由的总入口，也被配置在其中  

为了便于一些组件在全局范围内的调用，和数据传递  
某些组件被直接加在了app组件内容中的上层，如 `a-input-box` 组件  

#### 后端

后端是用mongoose和koa2搭建的  

主要有两个主要的文件夹
一是 tieba-server/proxy
二是 tieba-server/api

tieba-server/proxy 用于代理其他网站数据的接口封装地  
tieba-server/api 真正和数据库挂钩 给前台返回数据的接口封装地  

#### 抽取

在项目中，因为使用了indexDB，所以专门为indexDB写了个库(tieba-client/src/database/indexDB.js)。  
后来，为了搞定跨域问题，又抽了一个文件(tieba-server/middleware/cors.js)，专门对跨域问题进行限制。  
为了vue项目的组织方便，也为其写了一个工具库(tieba-client/src/common/script/utils.js)  
为了解决mongoose的异步调用问题，专门写了一个用于进行增删改查操作的文件夹(tieba-server/api/library)，其中有一个文件叫curd.js，它也可以被作为一个工具库进行调用。  

这些文件最终都被上传到了我的个人工具库中。 详见[freeedit/lib-mini-libs-collection](https://github.com/freeedit/lib-mini-libs-collection)  

#### 结语

项目的文件其实打包后也挺大的，比较消耗流量。  
为了让项目具有离线存储的能力，减少流量的消耗。  
所以我在项目中使用了manifest.js，这就要求需要使用Https。  
但不知是域名方面还是其他什么原因，即使是在我加了https证书之后，也无法访问https，所以最终就只能暂时用http先替着。  
如果您看见浏览器上面显示不安全字样，及浏览器中显示某某WARN信息，请放心。

----

求实习 2017年6月  
=> [应聘前端实习生_杨凡_15070836209.pdf](http://www.freeedit.cn/doc/%E5%BA%94%E8%81%98%E5%89%8D%E7%AB%AF%E5%AE%9E%E4%B9%A0%E7%94%9F_%E6%9D%A8%E5%87%A1_15070836209.pdf)  
=> [应聘前端实习生_杨凡_15070836209.json](http://www.freeedit.cn/doc/%E5%BA%94%E8%81%98%E5%89%8D%E7%AB%AF%E5%AE%9E%E4%B9%A0%E7%94%9F_%E6%9D%A8%E5%87%A1_15070836209.json)

> |  
> 联系方式   
> |  
> 电话 150-7083-6209  
> 邮箱 yihang@freeedit.cn  
> |  
> QQ 10258-10224  
> 微信 wx15070836209  
> |  
