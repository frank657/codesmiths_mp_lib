module.exports = {
  showErrorModal(content) {
    wx.showModal({ 
      showCancel: false, 
      confirmText: 'Ok', 
      confirmColor: '#0b76ba',
      content: content || 'Oops something went wrong, please try again'
    });  
  }
}