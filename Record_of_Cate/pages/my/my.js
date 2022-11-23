// pages/my/my.js
const app = getApp()
Page({
  login() {
    var that = this
    wx.login({
      success:function(res){
        console.log(res.code)
        that.setData({
          code:res.code
        })
      }
    })
    wx.getUserProfile({
        desc: '必须授权才能继续使用', // 必填 声明获取用户个人信息后的用途，后续会展示在弹窗中
        success:(res)=> { 
            console.log('授权成功', res);
            this.setData({ 
                userInfo:res.userInfo,
                iv:res.iv,
                encryptedData:res.encryptedData
            })
            wx.cloud.init()
            const r = wx.cloud.callContainer({
              "config": {
                "env": "prod-1gzin06weddc0c77"
              },
              "path": "/user/code",
              "header": {
                "X-WX-SERVICE": "flask-ddml",
                "content-type": "application/json"
              },
              "method": "POST",
              "data": ""
            })
            console.log(r)
            // wx.request({
            //   url:'http://192.168.70.36:5000/user/code',
            //   // url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/user/code',
            //   data: {
            //     iv:that.data.iv,
            //     // code:that.data.code,
            //     // encrypteddata:that.data.encryptedData
            //   },
            //   method:"POST",               //后续再改成POST
            //   header: { 'content-type': 'application/json' },
            //   success: function(res) {  //接口调用成功的回调函数
            //   console.log(res)          // 收到https服务成功后返回
            //   },
            //   fail: function() {  //接口调用失败的回调函数
            //   console.log('failure')  // 发生网络错误等情况触发
            //   }
            // })
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