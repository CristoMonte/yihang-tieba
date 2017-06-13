
let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB

if ('webkitIndexedDB' in window) {
  window.IDBTransaction = window.webkitIDBTransaction
  window.IDBKeyRange = window.webkitIDBKeyRange
}

const dbObject = {}

if (!window.indexedDB) {
  window.alert('Your browser does not support a stable version of IndexedDB.')
} else {
  // ---------------------------------------------------------
  // 数据库对象方法 定义的开始
  // ---------------------------------------------------------

  // ---------------------------------------------------------
  // 对数据库的操作
  // ---------------------------------------------------------

  // 打开数据库
  // params = {
  //   dbName = "tieba"
  //   dbVersion = "2"
  //   dbStoreName = "value"
  // }
  dbObject.open = function (params) {
    this.dbName = params.dbName
    this.dbStoreName = params.dbStoreName
    let request = null
    if (params.dbVersion) {
      this.dbVersion = params.dbVersion
      request = indexedDB.open(this.dbName, this.dbVersion)
    } else {
      request = indexedDB.open(this.dbName)
    }
    let _this = this
    request.onsuccess = function (e) {
      _this.db = e.target.result
    }
    request.onerror = function (e) {
      console.log('Database error: ' + e.target.errorCode)
    }
    request.onclose = function (e) {
      console.log('Database closed: ' + _this.dbName)
    }
    request.onupgradeneeded = function (e) {
      _this.db = e.target.result
      _this.db.createObjectStore(_this.dbStoreName)
    }
  }

  // 同步打开数据库
  dbObject.openSync = function (params) {
    let _this = this
    return new Promise(async (resolve, reject) => {
      _this.dbName = params.dbName
      _this.dbStoreName = params.dbStoreName
      let request = null
      if (params.dbVersion) {
        _this.dbVersion = params.dbVersion
        request = await indexedDB.open(_this.dbName, _this.dbVersion)
      } else {
        request = await indexedDB.open(_this.dbName)
      }
      if (request) {
        request.onsuccess = function (e) {
          _this.db = e.target.result
          resolve(_this)
        }
        request.onerror = function (e) {
          reject('Database error: ' + e.target.errorCode)
        }
        request.onclose = function (e) {
          resolve('Database closed: ' + _this.dbName)
        }
        request.onupgradeneeded = async function (e) {
          _this.db = e.target.result
          await _this.db.createObjectStore(_this.dbStoreName)
          resolve(_this)
        }
      }
    })
  }

  // 关闭数据库
  dbObject.close = function () {
    if (this.db) {
      this.db.close()
    }
  }

  // 删除数据库
  dbObject.delete = function () {
    if (this.db) {
      let deleteDbRequest = indexedDB.deleteDatabase(this.db)
      let _this = this
      deleteDbRequest.onsuccess = function (e) {
        console.log('Database delete: ' + _this.db)
      }
      deleteDbRequest.onerror = function (e) {
        console.log('Database error: ' + e.target.errorCode)
      }
    }
  }

  // ---------------------------------------------------------
  // 对数据表的操作
  // ---------------------------------------------------------

  // 为store的返回量 添加错误处理
  dbObject.addDBEvent = function (request, fn, fnArgs) {
    return new Promise((resolve, reject) => {
      if (fn) {
        let _this = this
        request.onsuccess = function () {
          let res = request.result
          if (fnArgs) fn.call(_this, res, ...fnArgs)
          else fn.call(_this, res)
          resolve(request.result)
        }
      } else {
        request.onsuccess = function () {
          resolve(request.result)
        }
      }
      request.onerror = function (e) {
        reject('Database error: ' + e.target.errorCode)
      }
    })
  }

  // 获取store
  dbObject.getStore = async function () {
    if (this.db) {
      if (this.dbStoreName) {
        let transaction = await this.db.transaction(this.dbStoreName, 'readwrite')
        return await transaction.objectStore(this.dbStoreName)
      }
    }
  }

  // 更改当前store --- 尚未测试
  dbObject.changeStore = async function (storeName) {
    this.dbStoreName = storeName
    if (!this.getStore()) {
      await this.close()
      let dbStoreName = this.dbStoreName
      let dbName = this.dbName
      let dbVersion = this.dbVersion + 1
      await this.open({
        dbStoreName,
        dbVersion,
        dbName
      })
    }
  }

  // ---------------------------------------------------------
  // 对数据的操作 CRUD
  // ---------------------------------------------------------

  // 填入新的值 或 更新数据
  // dbObject.set({ 'username': 'yihang - yangfan', 'password': 123456 }, 'user')
  dbObject.set = async function (params, key, fn, fnArgs) {
    let store = await this.getStore()
    if (store) {
      let request = store.put(params, key)
      return dbObject.addDBEvent(request, fn, fnArgs)
    }
  }

  // 删除数据
  // dbObject.delete('user')
  dbObject.delete = async function (id, fn, fnArgs) {
    let store = await this.getStore()
    if (store) {
      let request = store.delete(id)
      return dbObject.addDBEvent(request, fn, fnArgs)
    }
  }

  // 查询操作
  // dbObject.get('user')
  dbObject.get = async function (key, fn, fnArgs) {
    let store = await this.getStore()
    let request = null
    if (store) {
      if (key) {
        request = store.get(key)
      } else {
        request = store.getAll()
      }
      return dbObject.addDBEvent(request, fn, fnArgs)
    }
  }

  // 清除整张表 （对象存储）
  // dbObject.clear()
  dbObject.clear = async function (fn, fnArgs) {
    let store = await this.getStore()
    if (store) {
      let request = store.clear()
      return dbObject.addDBEvent(request, fn, fnArgs)
    }
  }

  // ---------------------------------------------------------
  // 数据库对象方法 定义的结束
  // ---------------------------------------------------------

  // 让其可以被嵌入到vue中去 --- 好像不能用 ~~
  dbObject.install = function (vue, options) {
    Object.keys(dbObject).forEach(key => {
      vue.$indexDB[key] = dbObject[key]
    })
  }
}

// ---------------------------------------------------------
// 导出 dbObject
// ---------------------------------------------------------

export default dbObject
