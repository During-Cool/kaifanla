const xiaojueding = require("./utils/xiaojueding");

//app.js
App({
   onLaunch: function (ops) {
      //判断是否是从二维码进来
      this.globalData.scene = ops.scene;
      if (ops.scene == 1011 || ops.scene == 1012 || ops.scene == 1013) {
         this.globalData.fromCodeFlag = true;
      }
      console.log("=============app.onlaunch===============");
      //调用API从本地缓存中获取数据
      var logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)

      wx.setStorageSync('myJuedin', xiaojueding);

      //云开发初始化
      wx.cloud.init({
        //把env替换成你自己的云开发环境id
        env: 'ds-dev-4g2d78j5300d714b',
      })
   },

   onHide: function () {
      wx.getBackgroundAudioManager().pause();
   },
   onShow: function (ops) {
      //调用API从本地缓存中获取数据
      console.log("=============app.onShow===============");
      if (ops.shareTicket != null && ops.shareTicket != '' && ops.shareTicket != undefined) {
         this.globalData.shareTicket = ops.shareTicket;
      }
      console.log("-=====app.globalData.shareTicket:" + this.globalData.shareTicket + "|ops.shareTickets:" + ops.shareTicket);
      //判断是否截过频
      var ban = wx.getStorageSync("ban");
      if (ban == "true") {
         wx.reLaunch({
            url: '/pages/index/index?closeFlag=1',
         })
      }

   },
   getUserInfo: function (cb) {
      var that = this
   },
   getHeighestScore: function (cb) {
      this.globalData.heighestScore = wx.getStorageSync("heighestScore");
      typeof cb == "function" && cb(this.globalData.heighestScore)
   },
   globalData: {
      userInfo: null,
      heighestScore: 0,
      systemInfo: null,
      zhuan: 0,
   }
})