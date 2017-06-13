var path = require('path')
var WebpackPwaManifest = require('webpack-pwa-manifest')
var utils = require('./utils')

var imagesPath = 'src/common/images'  // 原始图片存放点

function resolve (dir) {
  return path.join(__dirname, '..', imagesPath, dir)
}

module.exports = new WebpackPwaManifest({
  lang: 'zh',
  dir: 'ltr',
  name: '易杭贴吧——新鲜出炉的中文社区',
  short_name: '易杭贴吧',  // 在没有足够的空间显示Web应用程序的全名的情况下使用
  filename: "manifest.json",
  description: '一个以百度贴吧为原型制作的VUE PWA应用',
  background_color: '#f4f4f4',
  theme_color: "#3388ff",  // 影响应用程序由操作系统显示的主题颜色
  icons: [
    {
      src: resolve('app-icon-normal.png'),
      sizes: [36, 48, 72, 96, 144, 192, 512],
      destination: utils.assetsPath('icons')
    },
    {
      src: resolve('app-icon-large.png'),
      sizes: [120, 152, 167, 180, 1024],
      destination: utils.assetsPath('icons')
    }
  ],
  scope: "/",  // 定义此Web应用程序上下文的导航范围, 如果用户在范围外导航应用程序，则返回到正常的网页
  start_url: "/",  // 指定用户从设备启动应用程序时加载的URL
  display: "fullscreen",
  orientation: "portrait-primary",  // 竖屏
  prefer_related_applications: false,  // 当用户无法使用该应用时，是否启用推荐相关应用
  related_applications: [  // 当用户无法使用该应用时，推荐的相关应用列表
    // {
    //   platform: "play",
    //   url: "https://play.google.com/store/apps/details?id=com.example.app1",
    //   id: "com.example.app1"
    // },
    // {
    //   platform: "itunes",
    //   url: "https://itunes.apple.com/app/example-app1/id123456789"
    // }
  ],
  serviceworker: {
    src: "sw.js",
    scope: "/",
    use_cache: false
  },
})
