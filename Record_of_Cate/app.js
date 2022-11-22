// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


  },
  globalData: {
    userInfo: null,
    user_image_path:"/images/member.png",
    user_name:"请登录",
    user_motto:"登陆后解锁功能",
  }
})
