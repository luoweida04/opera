// pages/homework/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['未完成','已完成'],
    currentTab: 0,
    notComplete: [{title: "梁山伯与祝英台", time: "2023.10.10"},{title: "梁山伯与祝英台", time: "2023.10.10"}],
    complete: [{title: "梁山伯与祝英台", time: "2023.10.10", score: 98},{title: "梁山伯与祝英台", time: "2023.10.10", score: undefined}],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  navbarTap(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  toNotComplete(){
    wx.navigateTo({
      url: '/pages/homework/notComplete/index',
    })
  },
  toCompleted(e){
    wx.navigateTo({
      url: `/pages/homework/completed/index?score=${this.data.complete[e.currentTarget.dataset.i].score}`,
    })
  }
})