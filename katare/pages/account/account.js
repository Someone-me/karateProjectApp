// pages/account/account.js
var app = getApp();
var util = require('../../utils/util.js');

Page({
    data: {
      isLogin: false,
      temp: {},
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数


    },
    onReady: function () {
        // 页面渲染完成

    },
    onShow: function () {
        // 页面显示

      this.setData({
        isLogin: app.globalData.playerWeChatId[1],
        //isLogin: true,
        temp: app.globalData.playerWeChatId[0],
      })        

    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    logout(){
      app.globalData.playerWeChatId[1]=false
    },
    
})