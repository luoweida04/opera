// pages/study/oneVideo/index.js
Page({
  data: {
    contentDetailFlag: false
  },

  onShow(options) {
    
  },
  contentDetail(){
    this.setData({
      contentDetailFlag: !this.data.contentDetailFlag
    })
  },
  sing(){
    wx.navigateTo({
      url: '/pages/study/sing/index',
    })
  },
  test(){
    wx.navigateTo({
      url: '/pages/study/goTest/index',
    })
  }
})