//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {
        hiddenLoading: false,
        news: [],
      image: ['http://sports.cnr.cn/titanzhuanti/12yunhui/zjxc/201309/W020130903489842795280.jpg', 'http://yweb2.china.cnlive.com/cnlive/public/160310165212662_183.jpg'],
        imageWidth: '',
        imageHeight: '',
        temp:'',
    },

    onLoad: function () {
      wx.setEnableDebug({
        enableDebug: true
      })
      wx.getUserInfo({
        success: (res) => {
          app.globalData.playerWeChatId[0] = res
          wx.request({
            url: 'http://39.107.68.116:80//karatePort/queryPlayer',
            data: { 'playerWeChatId': app.globalData.playerWeChatId[0].signature },
            header: { 'content-type': 'application/json' },
            method: 'POST',
            dataType: 'json',
            responseType: 'text/html',
            success: (result) => {
              if (result.data.result == '成功') {
                app.globalData.playerWeChatId[1] = true
                app.globalData.playerWeChatId[2] = result.data.response
              }
            },
          })
        },
        fail: (res) => {
          wx.navigateTo({
            url: '../auth/auth'
          })
        }
      })

      wx.request({
        url: 'http://www.chncka.org/chnckaweb/VideoController/videoList.do?site=37&channel=4&column=10&limit=0',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        dataType: 'json',
        responseType: 'text/html',
        success: (result) => {
          for (var i = 0; i < result.data.list.length; i++) {
            result.data.list[i].url = '../news/news?url=http://www.chncka.org/'+ result.data.list[i].url + '&title=' + result.data.list[i].title
          }
            this.setData({
            news: result.data.list,
            imageWidth: wx.getSystemInfoSync().windowWidth,
            imageHeight: wx.getSystemInfoSync().windowHeight/3,
          })
        },
      })




    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },

})
