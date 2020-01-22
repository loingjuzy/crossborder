// pages/type/productlist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    start: 0,
    limit: 10,
    productlist: [],
    height: '',
    width: ''
  },
  getProductList: function(id, start, limit) { //获取产品列表
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    wx.request({
      url: 'https://www.0752gh.com/getProductList',
      data: {
        id: id,
        start: start,
        limit: limit
      },
      header: { //请求头
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({
          productlist: that.data.productlist.concat(res.data)
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
  getDisplaySize: function() {
    let systemInfo = wx.getSystemInfoSync();
    // px转换到rpx的比例
    let pxToRpxScale = 750 / systemInfo.windowWidth;
    this.setData({
      height: systemInfo.windowHeight * pxToRpxScale,
      width: systemInfo.windowWidth * pxToRpxScale
    });

  },
  loadProduct: function() {
    console.log(this.data.id, this.data.start, this.data.limit);
    this.setData({
      start: this.data.start + this.data.limit
    });
    this.getProductList(this.data.id, this.data.start, this.data.limit);
  },
  getProductInfo: function(event) {
    let productid = event.currentTarget.dataset.productid;
    wx.navigateTo({
      url: '/pages/type/productdetail/index?productid=' + productid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    });
    this.getDisplaySize();
    this.getProductList(options.id, this.data.start, this.data.limit);
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