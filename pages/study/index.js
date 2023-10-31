Page({
  data: {
    navbar: ['教学','故事'],
    currentTab: 0,
    videoList: ['视频1', '视频2', '视频3', '视频4', '视频5'],
  },
  navbarTap(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  openOneVideo(e){
    wx.navigateTo({
      url: './oneVideo/index',
    })
  }
})
