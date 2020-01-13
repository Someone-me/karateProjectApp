// pages/query/query.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: '',
    t:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.query()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },



  query: function(e) {
    if (e && e.detail.value.playerIdCrad.length!=0){
      this.setData({
        t: e.detail.value,
      })
    }else{
      if (app.globalData.playerWeChatId[2].length!=0){
        this.setData({
          t: { 'playerIdCrad': app.globalData.playerWeChatId[2].playerIdCrad },
        })
      }else{
        this.setData({
          t: { 'playerWeChatId': app.globalData.playerWeChatId[0].signature },
        })
      }
    }

      wx.request({
        url: 'http://39.107.68.116:80//karatePort/queryPlayer',
        data: this.data.t,
        header: { 'content-type': 'application/json' },
        method: 'POST',
        dataType: 'json',
        responseType: 'text/html',
        success: (result) => {
          if (result.data.result=="成功"){
              console.log(result)
              wx.request({
                url: 'http://39.107.68.116:80//karatePort/queryEntry',
                data: { 'userId': result.data.response.userId },
                header: { 'content-type': 'application/json' },
                method: 'POST',
                dataType: 'json',
                responseType: 'text/html',
                success: (res) => {
                  console.log(res)
                  console.log(res.data.response[1].player[0].playerName == result.data.response.playerName)
                  console.log(res.data.response[0].player.length)
                  var k = 0
                  for (var i = 0; i < res.data.response.length; i++) {
                    for (var j = 0; j < res.data.response[i].player.length; j++) {
                      if (res.data.response[i].player[j].playerName == result.data.response.playerName) {
                        this.setData({
                          ["result[" + k + "]"]: [res.data.response[i].chooseGame.teamName, res.data.response[i].palyerCompetition[j], res.data.response[i].time],
                        })
                        k = k + 1
                        console.log(this.data.result)
                      }
                    }
                  }
                },
              })
          }else{
            this.setData({
              ["result[0]"]: ['', '查询失败', ''],
            })  
          }
        },
        fail: (res)=>{
          this.setData({
            ["result[0]"]: ['', '查询失败', ''],
          })
        }
      })
    },





})