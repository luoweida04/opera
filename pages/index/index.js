// index.js
import CryptoJS from 'crypto-js'
import {
  weBtoa
} from '../../utils/weapp-jwt'
const app = getApp()
const recorderManager = wx.getRecorderManager();
const options = {
  duration: 60000, // 指定录音的时常，单位ms
  sampleRate: 16000, // 采样率
  numberOfChannels: 1, // 录音通道数
  encodeBitRate: 96000, // 编码码率
  format: 'PCM', // 音频格式
  frameSize: 1, // 指定帧大小，单位KB
}
var wxst
var iatResult = [] // 识别结果

Page({
  data: {
    navbar: ['音准', '音域', '节奏', '粤语'],
    currentTab: 0,
    isRecording: false,
    complete: false,
    // complete: true,
    score: 98,
    comment: "天籁之音 !",
    searchKey: ""
  },
  onLoad() {
    recorderManager.onStart(() => { // 开始录音的监听事件
      console.log('开始录音onstart');
    });
    recorderManager.onStop((result) => {
      console.log('录音结束' + result.tempFilePath); // tempFilePath是录音的文件暂时的存放路径

    });
    recorderManager.onFrameRecorded((res) => { //每帧触发
      // console.log('onFrameRecorded', res);
      let binary = '';
      let bytes = new Uint8Array(res.frameBuffer);
      for (var len = bytes.byteLength, i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const base64 = weBtoa(binary)

      if (wxst.readyState === wxst.OPEN) {
        wxst.send({
          data: JSON.stringify({
            data: {
              status: res.isLastFrame ? 2 : 1,
              format: "audio/L16;rate=16000",
              encoding: "raw",
              audio: base64,
            },
          })
        });
      }
    })
    var that = this;
    wx.onSocketOpen((res) => { // websocket打开
      console.log('监听到 WebSocket 连接已打开' + res);
      recorderManager.start(options); // 开始录音
      let params = {
        common: {
          app_id: "7a22300d",
        },
        business: {
          language: "zh_cn",
          domain: "iat",
          // accent: "mandarin", // 普通话
          accent: "cantonese", // 广东话
          vad_eos: 5000,
          dwa: "wpgs",
        },
        data: {
          status: 0,
          format: "audio/L16;rate=16000",
          encoding: "raw",
        },
      };
      wxst.send({data: JSON.stringify(params)});
    })
    wx.onSocketError((err) => { //连接失败
      console.log('websocket连接失败', err);
      recorderManager.stop()
    })
    wx.onSocketMessage((res) => { //接收返回值
      var data = JSON.parse(res.data)
      console.log('返回值', data);
      let str = ""
      if (data.data.status === 2 && data.code === 0) { //最终识别结果
        // data.data.status ==2 说明数据全部返回完毕，可以关闭连接，释放资源
        wxst.close();
      } 
      if (data.code !== 0) { // 返回结果出错
        wxst.close()
        console.log('返回结果错误', res);
      }
      iatResult[data.data.result.sn] = data.data.result
      if (data.data.result.pgs == 'rpl') {
        data.data.result.rg.forEach(i => {
          iatResult[i] = null
        })
      }
      iatResult.forEach(i => {
        if (i != null) {
          i.ws.forEach(j => {
            j.cw.forEach(k => {
              str += k.w
            })
          })
        }
      })
      that.setData({
        searchKey: str //这个是中间的语音识别结果
      })
    })
    wx.onSocketClose((res) => { //WebSocket连接已关闭！
      recorderManager.stop();
      var that = this;
      var str = that.data.searchKey;
      console.log(str);
      str = str.replace(/\s*/g, ""); //去除空格
      if (str.substr(str.length - 1, 1) == "。") { //去除句号
        str = str.substr(0, str.length - 1);
      }
      that.setData({
        searchKey: str //这个是最后确定的语音识别结果
      })
      console.log('WebSocket连接已关闭！', str)
    })
  },
  navbarTap(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  recordOrStop() {
    if (this.data.isRecording) {
      this.setData({
        complete: true,
        isRecording: false
      })
      this.stop()
    } else {
      iatResult = [] // 识别结果
      this.setData({
        isRecording: true,
        searchKey: ""
      })
      this.start()
    }
  },
  again() {
    this.setData({
      complete: false
    })
  },
  replace() {
    this.setData({
      complete: false
    })
  },
  getWebSocketUrl() {
    // 请求地址根据语种不同变化
    var url = "wss://iat-api.xfyun.cn/v2/iat";
    var host = "iat-api.xfyun.cn";
    var apiKey = "87310c9897eb7d45b7f9915e625217ad";
    var apiSecret = "Yzk5MGY0NGZlYWY0ZTY1ODc2OTViOWJl";
    var date = new Date().toGMTString();
    var algorithm = "hmac-sha256";
    var headers = "host date request-line";
    var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/iat HTTP/1.1`;
    var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
    var signature = CryptoJS.enc.Base64.stringify(signatureSha);
    var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    var authorization = weBtoa(authorizationOrigin);
    date = date.replace(/ /g, '%20')
    date = date.replace(/,/g, '%2C')
    date = date.replace(/:/g, '%3A')
    date = date.replace(/&/g, '%26')
    date = date.replace(/=/g, '%3D')
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
    return url;
  },
  start() {
    let url = this.getWebSocketUrl()
    console.log('url', url);
    wxst = wx.connectSocket({
      url: url,
      method: 'GET',
      success: (res) => {
        console.log('ws连接成功');
      },
      fail: (res) => {
        console.log('ws连接失败',res);
      }
    });
  },
  stop() {
    recorderManager.stop(); // 停止录音
  },
})