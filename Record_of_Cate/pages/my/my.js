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
          console.log('授权时的用户头像路径：',this.data.head_tmp)
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
                  success: (async(r) => {
                  app.globalData.login_state=1      //全局变量login_state变为1
                  console.log('返回用户信息:',r)
                  if(r.data=="login success"){                              //用户是第一次登录时
                    console.log("用户第一次登录")
                    app.globalData.user_sex = this.data.gender_tmp
                    app.globalData.user_name = this.data.name_tmp
                    //上传用户头像
                    wx.getImageInfo({
                      src: this.data.head_tmp,
                      success:(async(res)=>{
                        console.log(res.path)
                      wx.cloud.init()
                      var store_path = app.globalData.user_openid+'/head_image/my_head.jpg'
                      var result = await this.uploadFile(res.path, store_path, function(){})
                      console.log('用户第一次登录将头像存到存储桶里的路径',result)
                      app.globalData.user_image_path= result    //上传用户头像到存储桶里
                      this.setData({
                        nickName : app.globalData.user_name,
                        avatarUrl : app.globalData.user_image_path,
                        motto : app.globalData.user_motto,     // 令等于一个undefine将不会发生改变!
                        login_state : app.globalData.login_state,
                        account:'食珍录账号：'+this.data.openid.slice(18,28)  //食珍录账号
                      })
                      console.log('登录后头像路径：',this.data.avatarUrl)
                    })})
                  }else{           //用户不是第一次登录时
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
    return new Promise(function(resolve,reject){  //同步
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
    console.log('my onShow：',app.globalData.login_state)
    this.setData({
      login_state:app.globalData.login_state,
      nickName:app.globalData.user_name,
      avatarUrl:app.globalData.user_image_path,
      motto:app.globalData.user_motto,
      account:"食珍录账号:"+app.globalData.user_openid.slice(18,28)
    })
  },
    //上传到微信云托管的对象存储
    uploadFile(file, path, onCall = () => {}) {  
      return new Promise((resolve, reject) => {
        const task = wx.cloud.uploadFile({
          cloudPath: path,
          filePath: file,
          config: {
            env: 'prod-1gzin06weddc0c77' // 需要替换成自己的微信云托管环境ID
          },
          success: res => resolve(res.fileID),
          fail: e => {
            const info = e.toString()
            console.log(info)
            if (info.indexOf('abort') != -1) {
              reject(new Error('【文件上传失败】中断上传'))
            } else {
              reject(new Error('【文件上传失败】网络或其他错误'))
            }
          }
        })
        task.onProgressUpdate((res) => {
          if (onCall(res) == false) {
            task.abort()
          }
        })
      })
    },
})