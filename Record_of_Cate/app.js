// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    login_state:0,
    user_Info:"",
    user_sex:"男",
    user_image_path:"/images/member.png",
    user_name:"请登录",
    user_motto:"登陆后解锁功能",
    user_openid:"",
  }
})
