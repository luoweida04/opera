// pages/homework/completed/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navIndex: 0,
    scoreList: [],
    haveScore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    if(options.score === "undefined") return
    this.setData({
      scoreList: [{teacher: "红老师", comment: "你这个这个那个好少年回到是否哈迪斯科技示范户卡号发会计职能和出口降幅，回家大。", score: 88},{teacher: "邓老师", comment: "你这个这个那个好少年回到是否哈迪斯科技示范户卡号发会计职能和出口降幅，回家大。", score: 98},{teacher: "李老师", comment: "你这个这个那个好少年回到是否哈迪斯科技示范户卡号发会计职能和出口降幅，回家大。", score: 88},{teacher: "李老师", comment: "你这个这个那个好少年回到是否哈迪斯科技示范户卡号发会计职能和出口降幅，回家大。", score: 88},{teacher: "李老师", comment: "你这个这个那个好少年回到是否哈迪斯科技示范户卡号发会计职能和出口降幅，回家大。", score: 88}],
      haveScore: true
    })
    console.log(this.data.haveScore);
  },
  changeNav(e){
    this.setData({
      navIndex: e.currentTarget.dataset.i
    })
  },
  look(){
    console.log('查看提交');
  },
  sing(){
    wx.navigateTo({
      url: '/pages/homework/sing/index',
    })
  },
  resubmit(){
    console.log('重新提交');
  }
})