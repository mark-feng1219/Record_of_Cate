Page({

  data: {
      userInfo: '', //用于存放获取的用户信息
  },
  login() {
      wx.getUserProfile({
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
      })
  }

})
