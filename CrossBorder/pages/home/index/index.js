// pages/home/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    brandList: [{
      id: 0,
      brand: '万宁',
      hot: 1,
      url: '/pages/images/logo/mannings.png'
    }, {
      id: 1,
      brand: '屈臣氏',
      hot: 1,
      url: '/pages/images/logo/wastons.png',
    }, {
      id: 2,
      brand: '楼上',
      hot: 1,
      url: '/pages/images/logo/loushang.png'
    }, {
      id: 3,
      brand: 'SaSa',
      hot: 0,
      url: '/pages/images/logo/sasa.png'
    }, {
      id: 4,
      brand: '卓悦',
      hot: 0,
      url: '/pages/images/logo/bonjour.png'
    }, {
      id: 5,
      brand: 'Apple',
      hot: 1,
      url: '/pages/images/logo/apple.png'
    }, {
      id: 6,
      brand: 'DFS',
      hot: 0,
      url: '/pages/images/logo/DFS.png'
    }, {
      id: 7,
      brand: '奶粉',
      hot: 1,
      url: '/pages/images/logo/cowsgate.png'
    }, {
      id: 8,
      brand: '卡莱美',
      hot: 0,
      url: '/pages/images/logo/colourmix.png'
    }, {
      id: 9,
      brand: '更多',
      hot: 0,
      url: '/pages/images/logo/more.png'
    }],
  },
  getSysytemInfo: function() {
    let that = this;
    return new Promise(function(resolve, reject) {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo
          })
          resolve(res.userInfo);
        }
      })

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    });
    this.getSysytemInfo().then(res => {
      // this.getUserStudy(res);
      app.grantUserInfo(res);
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})