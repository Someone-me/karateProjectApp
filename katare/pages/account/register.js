// pages/account/register.js
var app = getApp();
var util = require('../../utils/util.js');
var lo = require('../../app.js');
import WxValidate from '../../utils/validate';
var inputContent = {};//输入内容
Page({
  data: {
    playerTeam: {'playerTeam': '点击选择组织'} ,
    userId: '0',
    ind: [3, 2, 1,],
    itemss: ['aaa','bbb','ccc'],

    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
      wx.request({
        url: 'http://39.107.68.116:80/karatePort/getOrganization',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        dataType: 'json',
        responseType: 'text/html',
        success: (result) => {
          this.setData({
            userOrganizationName: result.data.response,
          })
        },
      })
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
    //获取用户输入


  formSubmit: function (e) {
      console.log('form发生了submit事件，携带数据为：', Object.assign(e.detail.value, { 'userId': this.data.userId, 'playerLevel': '0',}, app.globalData.playerWeChatId) )
      wx.request({
        url: 'http://39.107.68.116:80//karatePort/addPlayer',
        data: Object.assign(e.detail.value, { 'userId': this.data.userId, 'playerLevel': '0', }, {'playerWeChatId': app.globalData.playerWeChatId[0].signature}, this.data.playerTeam),
        header: { 'content-type': 'application/json' },
        method: 'POST',
        dataType: 'json',
        responseType: 'text/html',
        success: (result) => {
          console.log(result)
          if (result.data.result=='成功') {
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 1000
            })
            app.globalData.playerWeChatId[1] = true
            setTimeout(function () {
              wx.reLaunch({
                url: 'account'
              })
            }, 1000)
          }else{
            wx.showToast({
              title: String(result.data.result),
              icon: 'none',
              duration: 2000
            })
          }
        },
      });



  },
  
  pickerChange: function (e) {
    console.log('picker发生change事件，携带value值为：', 7- e.detail.value)
    this.setData({
      playerTeam: {'playerTeam': this.data.userOrganizationName[e.detail.value].userOrganizationName},
      userId: 7-e.detail.value,
    })
  },



})