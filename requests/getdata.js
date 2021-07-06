import event from '../../../utils/event';

function getData({path, data={}, page}) {
  return new Promise((resolve, reject) => {
    const get = () => {
      this.get(path,data).then(res => {
        if (page) page.setData(res.data)
        resolve(res)
      })
    }

    if (getApp().globalData.appReady) {
      get()
    } else {
      event.on('appReady', page, get)
    }
  })
}

module.exports = {
  getData
}
