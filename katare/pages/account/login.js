// pages/account/login.js
var app = getApp();
var util = require('../../utils/util.js');
var inputContent = {};//输入内容
Page({
    data: {},
    onLoad: function (options) {

    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    
  loginSubmit: function (e) {
    console.log(e.detail.value)
    wx.request({
      url: 'http://39.107.68.116:80//karatePort/queryPlayer',
      data: e.detail.value,
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'json',
      responseType: 'text/html',
      success: (result) => {
        console.log(result.data)
        if (result.data.result == '成功') {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1000
          })
          app.globalData.playerWeChatId[1] = true  
          app.globalData.playerWeChatId[2] = result.data.response        
          setTimeout(function () {
            wx.reLaunch({
              url: 'account'
            })
          }, 1000)
          
        } else {
          wx.showToast({
            title: String(result.data.result),
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },


})