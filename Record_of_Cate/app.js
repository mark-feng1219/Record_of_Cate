// app.js
App({
globalData: {
  name:'',
  head:''
},
  onLaunch() {
    /**wx.getUserProfile({
      desc: '必须授权才能继续使用', // 必填 声明获取用户个人信息后的用途，后续会展示在弹窗中
      success:(res)=> { 
          console.log('授权成功', res);
          this.setData({ 
              userInfo:res.userInfo
          })
      },
      fail:(err)=> {
          console.log('授权失败', err);
      }
  })*/
    //登录获取code
  
    /**wx.login({
      success: res => {
        console.log(res.code)
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      if(res.code){
        let appid = "wx9acd048867e8aee8"
        let secret = "1e74f746f419d6233288968cb00b0783"
        wx.request({
        url: 'https://api.weixin.qq.com/sns/jscode2sess?appid='+appid+"&secret="+secret+"&js_code="+res.code+"&grant_type=authorization_cc",
        success: 
          function (res2) {
            console.log(res2.data)
            if (res.data.openid){
              wx.setStorage({
                key:"openid",
              data:res2.data.openid,
              })
            }
          } 
        })
      }else{
        console.log('登陆失败！'+res.errMsg);
      }
    }
  })**/
  }
})
