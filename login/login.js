import regeneratorRuntime from 'regenerator-runtime';
import event from '../../../utils/event';

function login() {
  return new Promise((resolve, reject) => {
    const hasHeader = wx.getStorageInfoSync().keys.includes('header')
    if (hasHeader) {
      this.post('login').then(res=>{
        if (res.statusCode==200) {
          console.log('header correct', res)
          saveLogin(res.data)
          resolve(res)
        } else {
          console.log('header wrong', res)
          loginWithCode.bind(this)().then(resolve)
        }
      })
    } else {
      loginWithCode.bind(this)().then(resolve)
    }
  })
}

async function loginWithCode() {
  console.log('login with code')
  const codeRes = await wx.login()

  return new Promise((resolve, reject) => {
    if (codeRes.errMsg=='login:ok') {
      const params = { url: this.getHost()+'login', data: { code: codeRes.code }, method: 'POST' }
      wx.request({...params,
        success(res) {
          if (res.statusCode=200) {
            saveLogin(res.data)
            resolve(res)
          }
        },
        fail: reject
      })
    }
  })
}

function saveLogin(data) {
  setHeader(data.header)
  setUser(data.user)
}

function setHeader(header) {
  wx.setStorage({ key: 'header', data: header });
}

function setUser(user) {
  Object.assign(getApp().globalData, {user})
  event.emit('userReady')
}

function launchApp() {
  login.bind(this)().then(res=>{
    getApp().globalData.appReady = true
    console.log('appReady')
    event.emit('appReady')
  })
}

module.exports = {
  launchApp, setUser, setHeader
}