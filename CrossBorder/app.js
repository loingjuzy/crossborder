//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // console.log(res.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          });
        } else {
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }
      }
    })
  },
  grantUserInfo: function (event) {
    let that = this;
    wx.request({
      url: 'https://www.0752gh.com/getUserInfo',
      data: event,
      header: { //请求头
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        that.globalData.grantUserInfo = res.data[0];
        console.log(res.data[0]);
      },
      fail: function (err) {
        // console.log("查询失败");
      }, //请求失败
      complete: function () {
      }, //请求完成后执行的函数
    })
  },
  globalData: {
    userInfo: null,
    grantUserInfo: null
  }
})