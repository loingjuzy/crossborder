// pages/type/productdetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productInfo: '',
  },
  getProductInfo: function(productid) { //获取产品列表
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    wx.request({
      url: 'https://www.0752gh.com/getProductInfo',
      data: {
        productid: productid
      },
      header: { //请求头
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({
          productInfo: res.data[0]
        });
        console.log(res.data)
        wx.hideLoading()
      },
      fail: function(err) {
        // console.log("查询失败");
      }, //请求失败
      complete: function() {}, //请求完成后执行的函数
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.productid)
    this.getProductInfo(options.productid)
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