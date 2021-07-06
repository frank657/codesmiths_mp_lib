function getHost() {
  const d = this.app.globalData
  return [d.root[d.env], d.api, d.lang].join('/')+'/'
}

function getHeader() {
  return wx.getStorageSync('header') || {}
}

function request ({path, method="GET", data={}}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url:this.getHost()+path, method, data,
      header: getHeader(),
      success: resolve,
      fail: reject
    })
  })
}

function post(path, data = {}) {
  return request.bind(this)({path, data, method:'POST'})
}

function put(path, data = {}) {
  return request.bind(this)({path, data, method:'PUT'})
}

function del (path, data = {}) {
  return request.bind(this)({path, data, method:'DELETE'})
}

function setGetParams(data) {
  let params = [], path = ''
  Object.keys(data).forEach(k => params.push(`${k}=${data[k]}`))
  if (params.length) path += "?"
  path += params.join("&")
  return path
}

function get(path, data = {}) {
  if (Object.keys(data).length) path += setGetParams(data)
  return request.bind(this)({path})
}

module.exports = {
  getHost, request, post, del, get, put
}