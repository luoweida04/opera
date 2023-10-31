// pages/practice/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // index: true,
    index: false,
    isRecording: false,
    complete: false,
    score: 98,
    comment: '天籁之音 !'
  },
  beginPratice(){
    this.setData({
      index: false
    })
  },
  recordOrStop(){
    if(this.data.isRecording) {
      this.setData({
        complete: true,
        isRecording: false
      })
    }
    else {
      this.setData({
        isRecording: true
      })
    }
  },
  again(){
    this.setData({
      complete: false
    })
  },
  nextGrade(){
    this.setData({
      // complete: false, 这个也要的,分情况
      allComplete: true
    })
    wx.navigateTo({
      url: '/pages/practice/uploadScore/index',
    })
  }
})