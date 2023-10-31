// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: ['测试', '练声', '学习'],
    tabIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  clickTab(e){
    this.setData({
      tabIndex: e.currentTarget.dataset.i
    })
  },
  revise(){
    wx.navigateTo({
      url: '/pages/my/info/index',
    })
  }
})