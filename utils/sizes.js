const getRpx = (px) => { 
  var winWidth = wx.getSystemInfoSync().windowWidth;
   return 750/winWidth*px;
}

const getPx = (rpx) => {
  var winWidth = wx.getSystemInfoSync().windowWidth;
  return winWidth/750*rpx;
}

const getSafeArea = (app) => {
  var [tabbar, navbar] = [getPx(140), getPx(140)]
  var { top, bottom, left, right, height, width } = wx.getSystemInfoSync().safeArea
  app.globalData['safeAreaPx'] = { top, bottom, left, right, height, width, tabbar, navbar }
  var [top, bottom, left, right, height, width, tabbar, navbar] = [
    getRpx(top), getRpx(bottom), getRpx(left), getRpx(right), 
    getRpx(height), getRpx(width), getRpx(tabbar), getRpx(navbar)]
  app.globalData['safeAreaRpx'] = { top, bottom, left, right, height, width, tabbar, navbar }
}

module.exports = {
  getRpx, 
  getPx, 
  getSafeArea, 
}