// pages/study/goTest/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{title: '在天愿做比翼鸟, 在地愿为连理枝', recorded: false}, {title: '在天愿做比翼鸟, 在地愿为连理枝', recorded: false}, {title: '在天愿做比翼鸟, 在地愿为连理枝', recorded: true}],
    selectedIndex: 0,
    isFinish: false,
    finishList: [{title: '在天愿做比翼鸟, 在地愿为连理枝', score: 98}, {title: '在天愿做比翼鸟, 在地愿为连理枝', score: 99}, {title: '在天愿做比翼鸟, 在地愿为连理枝', score: 98}],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  onShow(){
    // this.setData({
    //   isFinish: false
    // })
  },
  select(e){
    this.setData({
      selectedIndex: e.currentTarget.dataset.index
    })
  },
  playOrigin(e){
    console.log('播放原声', e.currentTarget.dataset.index);
  },
  playAudio(e){
    if(e.currentTarget.dataset.flag === false) return
    console.log('播放录音');
  },
  record(){
    console.log('开始录制');
  },
  finish() {
    this.setData({
      isFinish: true
    })
  },
  again(){
    console.log('再测一次');
    this.setData({
      isFinish: false
    })
  },
  upload(){
    console.log('上传成绩');
  }
})