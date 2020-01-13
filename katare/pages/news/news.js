// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageWidth: '',
    imageHeight: '',
    url: '',
    title: '',
    s: '',
    t: '',
    news: '',
    image: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url: options.url,
      title: options.title,
      imageWidth: wx.getSystemInfoSync().windowWidth,
      imageHeight: wx.getSystemInfoSync().windowHeight /3,
    })
    console.log(this.data.title)

    wx.request({
      url: this.data.url,
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text/html',
      success: (result) => {
        
      this.setData({
          s: /[\u4e00-\u9fa5]+/.exec(result.data.match(/"news_label".{3,30}<\//)),
          t: result.data.match(/更新时间：[0-9]+-[0-9]+-[0-9]+/),
          image: result.data.match(/http:\/\/cms.chncka.org\/chnckamgr\/img\/attached\/image\/[\w./]+/g),   
          news: result.data.slice(result.data.indexOf('<div id="content">'), result.data.indexOf('foot start')).match(/>[\u4e00-\u9fa5\d&]([^]+?)(?=<)/g),
        })
            
      },
    })
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

  }
})