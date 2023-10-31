// pages/homework/sing/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ['在天愿做比翼鸟', '在地愿为连理枝',  '在地愿为连理枝', '在地愿为连理枝'],
    playingIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  playAudio(e){
    console.log(e);
    this.setData({
      playingIndex: e.currentTarget.dataset.index
    })
  },
  submit(){
    console.log('submit');
  }
})