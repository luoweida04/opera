// pages/my/info/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  confirm(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})