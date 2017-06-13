/**
 * 该文件用于说明各个组件的作用和类型
 *
 * 2017.5 www.freeedit.cn
 * yang fan
 */

/*************************************************************/

/**
 * 原子级组件 atomic component
 * -- 用于构成最基本的 html 标签
 * -- 组件名以 'a' 开头
 */
import aBottomBarCell from './a-bottom-bar-cell/'
import aHomePostCell from './a-home-post-cell/'
import aInputBox from './a-input-box/'
import aMessageBox from './a-message-box/'

/*************************************************************/

/**
 * 容器级组件 container components
 * -- 用于包裹原子级组件
 * -- 组件名以 'c' 开头
 */
import cBottomBar from './c-bottom-bar/'
import cHomePost from './c-home-post/'

/*************************************************************/

/**
 * 页面级组件 page components
 * -- 用于构成一个独立的页面
 * -- 组件名以 'p' 开头
 */
import pHome from './p-home/'
import pBar from './p-bar/'
import pKnow from './p-know/'
import pMessage from './p-message/'
import pMine from './p-mine/'
import pAuthor from './p-author/'
import pSearchPost from './p-search-post/'
import pSearchBar from './p-search-bar/'
import pStart from './p-start/'
import pLogin from './p-login/'
import pLogup from './p-logup/'
import pEditUserinfo from './p-edit-userinfo'
import pCreateBar from './p-create-bar'
import pBarDetail from './p-bar-detail'
import pPostDetail from './p-post-detail'

/*************************************************************/

/**
 * 多页式组件 multipage components
 * -- 用于包装多个页面级组件
 * -- 组件名以 'm' 开头
 */
import mRoot from './m-root/'

/*************************************************************/

export default {
  // 原子级组件导出声明 ------------------
  aBottomBarCell,   // 底栏单元
  aHomePostCell,    // 首页的帖子信息单元
  aInputBox,        // 各个帖子都可用的输入框
  aMessageBox,      // 消息盒子
  // 容器级组件导出声明 ------------------
  cBottomBar,       // 底栏
  cHomePost,        // 首页的帖子信息容器
  // 页面级组件导出声明 ------------------
  pHome,            // 首页
  pBar,             // 进吧
  pKnow,            // 知道
  pMessage,         // 消息
  pMine,            // 我的
  pAuthor,          // 作者信息
  pSearchPost,      // 搜索帖子
  pSearchBar,       // 搜索吧
  pStart,           // 第一次打开应用
  pLogin,           // 登录
  pLogup,           // 注册
  pEditUserinfo,    // 修改用户信息
  pCreateBar,       // 创建贴吧
  pBarDetail,       // 贴吧详情页
  pPostDetail,      // 文章详情页
  // 多页式组件导出声明 ------------------
  mRoot             // 所有主页面的集合
}
