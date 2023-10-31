// pages/practice/uploadScore/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{title: '在天愿做比翼鸟, 在地愿为连理枝', score: 98},{title: '在天愿做比翼鸟, 在地愿为连理枝', score: 98},{title: '在天愿做比翼鸟, 在地愿为连理枝', score: 99},],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  upload(){
    console.log('上传成绩');
  }
})