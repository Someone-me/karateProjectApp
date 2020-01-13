// pages/info/info.js
var app = getApp();
var util = require('../../utils/util.js');
var lo = require('../../app.js');
import WxValidate from '../../utils/validate';
var inputContent = {};//输入内容
Page({
  data: {
    userOrganizationName: [],
    sex: ['', ''],
    t: '',
    p: '',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (app.globalData.playerWeChatId[1] == true) {
      this.setData({
        t: app.globalData.playerWeChatId[2],
        p: app.globalData.playerWeChatId[1]
      })
      if (this.data.t.playerSex == "男") {
        this.setData({
          ["sex[0]"]: true,
        })
      } else {
        this.setData({
          ["sex[1]"]: true,
        })
      }
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../account/login',
        })
      }, 1000)

    }

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
    //341221199510063769
    for (var i in e.detail.value) {
      if (e.detail.value[i].length != 0) {
        app.globalData.playerWeChatId[2][i] = e.detail.value[i]
      }
    }
    wx.request({
      url: 'http://39.107.68.116/karatePort/changePlayer',
      data: app.globalData.playerWeChatId[2],
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'json',
      responseType: 'text/html',
      success: (result) => {
        if (result.data.result != '成功') {
          wx.showToast({
            title: '修改失败',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../account/account',
            })
          }, 2000)
        }
      },
    });

  },
  pickerChange: function (e) {
    this.setData({
      ['t.playerTeam']: this.data.userOrganizationName[e.detail.value].userOrganizationName,
    })
    app.globalData.playerWeChatId[2].playerTeam = this.data.userOrganizationName[e.detail.value].userOrganizationName
    app.globalData.playerWeChatId[2].userId = 7 - e.detail.value
  },

})