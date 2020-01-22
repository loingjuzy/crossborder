// pages/type/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typelist: ['热门', '美妆', '母婴', '数码', '食品', '超市', '其他'],
    showitem: '热门',
    height: '',
    width: '',
    brandlist: [],
  },
  changeItem: function(event) {
    // console.log(event)
    let value = event.currentTarget.dataset.navigation;
    this.setData({
      showitem: value
    });
    this.getBrandTypeInfo(value);
  },
  getBrandTypeInfo: function(type) { //获取品牌类型信息
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    wx.request({
      url: 'https://www.0752gh.com/getBrandTypeInfo',
      data: {
        type: type
      },
      header: { //请求头
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({
          brandlist: res.data
        })
        wx.hideLoading()
      },
      fail: function(err) {
        // console.log("查询失败");
      }, //请求失败
      complete: function() {}, //请求完成后执行的函数
    })
  },
  getProductList: function(event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/type/productlist/index?id=' + id,
    })
  },
  getDisplaySize:function(){
    let systemInfo = wx.getSystemInfoSync();
    // px转换到rpx的比例
    let pxToRpxScale = 750 / systemInfo.windowWidth;
    this.setData({
      height: systemInfo.windowHeight * pxToRpxScale,
      width: systemInfo.windowWidth * pxToRpxScale
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getDisplaySize()
    this.getBrandTypeInfo(this.data.showitem);
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