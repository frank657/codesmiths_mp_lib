import event from '../../../utils/event';

function range(from, to) {
  return [...Array(to + 1 - from).keys()].map(i => i + from)
  // For letters:
  // return [...Array(to.charCodeAt(0) - from.charCodeAt(0) + 1).keys()].map(i => String.fromCharCode(i + from.charCodeAt(0)))
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function setLanguage(app) {
  const l = wx.getSystemInfoSync().language
  app.globalData.lang = (l == "zh" || l == "zh_CN" || l == "zh_TW" || l == "zh_HK") ? 'cn' : "en"
  // app.globalData.lang = 'cn'
}

function setData(key, page) {
  const set = () => { 
    page.setData({[key]: getApp().globalData[key]})
  }
  event.on(`${key}Ready`, page, set.bind(page))
  const data = getApp().globalData[key]
  if (data) page.setData({[key]:data})
}

function mapState(keys, page, cb) {
  if (typeof(keys)=='string') {
    setData(keys, page)
    if (cb) cb.bind(page)()
  } else if (Array.isArray(keys)) {
    keys.forEach(key=>setData(key,page))
    if (cb) cb.bind(page)()
  }
} 

module.exports = { 
  range, 
  setLanguage, 
  mapState
}
