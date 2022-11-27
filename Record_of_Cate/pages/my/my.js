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
                  success: (async(r) => {
                  app.globalData.login_state=1      //全局变量login_state变为1
                  console.log('返回用户信息:',r)
                  if(r.data=="login success"){                             //用户是第一次登录时
                    console.log("用户第一次登录")
                    app.globalData.user_sex = this.data.gender_tmp
                    app.globalData.user_name = this.data.name_tmp
                    app.globalData.user_image_path= this.data.head_tmp
                    app.globalData.user_motto = "这个人很懒~，什么都没留下"
                    this.setData({
                      nickName : app.globalData.user_name,
                      avatarUrl : app.globalData.user_image_path,
                      motto : app.globalData.user_motto,     // 令等于一个undefine将不会发生改变!
                      login_state : app.globalData.login_state,
                      account:'食珍录账号：'+this.data.openid.slice(18,28)  //食珍录账号
                    })}else{           //用户不是第一次登录时
                    console.log("用户不是第一次登录")
                    app.globalData.user_sex = r.data['user_sex']
                    app.globalData.user_name=r.data['user_name']
                    app.globalData.user_image_path=r.data['user_head']
                    app.globalData.user_motto = r.data['motto']
                    this.setData({
                      nickName : app.globalData.user_name,
                      avatarUrl : app.globalData.user_image_path,
                      motto : app.globalData.user_motto,     // 令等于一个undefine将不会发生改变!
                      login_state : app.globalData.login_state,
                      account:'食珍录账号：'+this.data.openid.slice(18,28)  //食珍录账号
                    })
                  }
                }),
                  fail: function() {console.log('failure')},
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
    return new Promise(function(resolve){  //同步
    // 通过code换取openId
    wx.request({
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=${that.data.appid}&secret=${that.data.secret}&js_code=${that.data.code}&grant_type=authorization_code`,
      success:(res)=>{
        resolve(res)
        app.globalData.user_openid=res.data.openid
        that.setData({openid:app.globalData.user_openid})
      }
    })
    })
  },
  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad(options) {

  },
    /**
   * 生命周期函数--监听页面
   */
  onShow() {
    console.log(app.globalData.user_openid)
    console.log(app.globalData.user_image_path)
    this.setData({
      login_state:app.globalData.login_state,
      nickName:app.globalData.user_name,
      avatarUrl:app.globalData.user_image_path,
      motto:app.globalData.user_motto,
      account:"食珍录账号:"+app.globalData.user_openid.slice(18,28)
    })
  }
})