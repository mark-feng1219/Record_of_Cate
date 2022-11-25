// pages/my/my.js
const app = getApp()
Page({
  login() {
      wx.getUserProfile({
        desc: '必须授权才能继续使用',
        success:(res)=>{
          this.setData({
            name_tmp : res.userInfo.nickName,
            gender_tmp : res.userInfo.gender,
            head_tmp : res.userInfo.avatarUrl
          })
          //获取openId（需要code来换取）这是用户的唯一标识符
          // 获取code值
          wx.login({
            success:(res)=>{
              this.setData({
                code: res.code,
                appid:"wx9acd048867e8aee8",
                secret : "1e74f746f419d6233288968cb00b0783"
              })
              this.request_openid().then(async(res)=>{
                console.log('获取openid:',res)
                wx.request({
                  url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/user/login',
                  data: {
                    openid:this.data.openid,
                    Nickname:this.data.name_tmp,
                    gender:this.data.gender_tmp,
                    head_image:this.data.head_tmp
                  },
                  method:"POST",
                  header: { 'content-type': 'application/json' },
                  success: (r) => {       // 接口调用成功的回调函数
                  console.log('返回用户信息:',r)
                  if(r!="login success"){
                    app.globalData.user_sex = r.data['user_sex']
                    app.globalData.user_name=r.data['user_name']
                    app.globalData.user_image_path=r.data['user_head']
                    app.globalData.user_motto = r.data['motto']
                    app.globalData.login_state=1      //全局变量login_state变为1
                    this.setData({
                      nickName : app.globalData.user_name,
                      avatarUrl : app.globalData.user_image_path,
                      motto : app.globalData.user_motto,     // 令等于一个undefine将不会发生改变!
                      login_state : app.globalData.login_state,
                      account:'食珍录账号：'+this.data.openid.slice(18,28)  //食珍录账号
                    })
                  }},
                  fail: function() {  //接口调用失败的回调函数
                  console.log('failure')  // 发生网络错误等情况触发
                  },
                  })
              })
            },
            fail:(err)=> {
              console.log('授权失败', err);
          }
          })
        }
      })
  },
  // 请求得到用户的openid
  request_openid:function(){
    var that = this
    return new Promise(function(resolve,reject){  //同步
    // 通过code换取openId
    wx.request({
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=${that.data.appid}&secret=${that.data.secret}&js_code=${that.data.code}&grant_type=authorization_code`,
      success:(res)=>{
        resolve(res)
        app.globalData.user_openid=res.data.openid
        that.setData({         
          openid:app.globalData.user_openid,
        })
      }
    })
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    openid:"食珍录账号:××××××",
    nickName:"请登录",
    avatarUrl:"/images/member.png",
    motto:"登陆后解锁功能",
    login_state:0,
    account:"食珍录账号:××××××"
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
    /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      nickName:app.globalData.user_name,
      avatarUrl:app.globalData.user_image_path,
      motto:app.globalData.user_motto,
      openid:app.globalData.user_openid,
    })
  },
})