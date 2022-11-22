// pages/my/my.js
const app = getApp()
Page({
  login() {
      wx.getUserProfile({
        desc: '必须授权才能继续使用',
        //成功后会返回
        success:(res)=>{
          console.log('授权成功',res);
          //修改全局变量
          app.globalData.user_name=res.userInfo.nickName
          app.globalData.user_image_path=res.userInfo.avatarUrl
          // 把你的用户信息存到一个变量中方便下面使用
          app.globalData.user_Info= res.userInfo
          //获取openId（需要code来换取）这是用户的唯一标识符
          // 获取code值
          wx.login({
            //成功放回
            success:(res)=>{
              console.log(res);
              let code=res.code
              var appid = "wx9acd048867e8aee8"
              var secret = "1e74f746f419d6233288968cb00b0783"
              // 通过code换取openId
              wx.request({
                url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
                success:(res)=>{
                  console.log(res);
                  app.globalData.user_openid=res.data.openid
                  console.log(app.globalData.user_openid)
                  this.setData({         
                    openid:app.globalData.user_openid,
                    userInfo:app.globalData.user_Info,
                    nickName:app.globalData.user_name,avatarUrl:app.globalData.user_image_path,
                    motto:app.globalData.user_motto
                  })
                }
              })
            },
            fail:(err)=> {
              console.log('授权失败', err);
          }
          })
        }
      })
  },
  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    userInfo:"",
    nickName:"",
    avatarUrl:"",
    motto:""
  },
  onLoad(options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#FFC359',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

  },
  onShow: function () {
    this.setData({
      nickName:app.globalData.user_name,
      avatarUrl:app.globalData.user_image_path,
      motto:app.globalData.user_motto
    })
  },
})