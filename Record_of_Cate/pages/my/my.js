// pages/my/my.js
const app = getApp()
Page({
  login() {
    /**wx.login({
      success: function (r) {
        var code = r.code;//登录凭证
        if (code) {
          //2、调用获取用户信息接口
          wx.getUserInfo({
            success: function (res) {
              //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
              wx.request({
                url: app.globalData.loginWXUrl,//自己的服务接口地址
                method: 'post',
                header: {
                  'content-type': 'application/json'
                },
                data: { encryptedData: res.encryptedData, iv: res.iv, code: code },
                success: function (res) {
                  //4.解密成功后 获取自己服务器返回的结果
                  if (res.data.return_code == 0) {
                    console.log(res.data.data)
                  } else {
                    console.log('解密失败')
                  }
  
                },
                fail: function () {
                  console.log('系统错误')
                }
              })
            },
            fail: function () {
              console.log('获取用户信息失败')
            }
          })
  
        } else {
          console.log('获取用户登录态失败！' + r.errMsg)
        }
      },
      fail: function () {
        console.log('登陆失败')
      }
    }),*/
      wx.getUserProfile({
          desc: '必须授权才能继续使用', // 必填 声明获取用户个人信息后的用途，后续会展示在弹窗中
          success:(res)=> { 
              console.log('授权成功', res);
              this.setData({ 
                  userInfo:res.userInfo,
              })
          },
          fail:(err)=> {
              console.log('授权失败', err);
          }
      })
  },
  /**
   * 页面的初始数据
   */
  data: {
  },
  goto2:function(){
    wx.navigateTo({
      url: '/pages/publishnote/publishnote',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#FFC359',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

  }
})