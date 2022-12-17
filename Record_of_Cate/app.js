// app.js
App({
  onLaunch() {
    wx.request({
      url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/user/secret',
      success:(res)=>{
        this.globalData.appid = res.data['appid'],
        this.globalData.secret = res.data['secret']
      }
    })
  },
  globalData: {
    login_state:0,
    user_Info:"",
    user_sex:"男",
    user_image_path:"/images/member.png",
    user_name:"请登录",
    user_motto:"登陆后解锁功能",
    user_openid:"××××××××××××××××××××××",
  }
})
