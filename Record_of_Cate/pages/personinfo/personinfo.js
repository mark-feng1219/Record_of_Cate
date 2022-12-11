const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    icon_r: 'https://manager.diandianxc.com/mine/enter.png',
    sex:[
      {name:'0',value:'男',checked:'true'},
      {name:'1',value:'女'}
    ],
    isSex:"0",
    information:[],
    userSex:'',
    modalHidden:true
  },
  onShow: function () {
    this.setData({
      head_choice:"unchoosed",         //没有换头像
      nickName:app.globalData.user_name,
      avatarUrl:app.globalData.user_image_path,
      motto:app.globalData.user_motto
    })
  },
  // 从相册中选择用户的新头像
  headimage: function () {
    var that = this;
     wx.chooseImage({
       count: 1,
       sizeType: ['original', 'compressed'],
       sourceType: ['album', 'camera'],
       success: function (res) {
         that.setData({
           avatarUrl: res.tempFilePaths[0],
           head_choice: "choosed"       //如果更新了头像
          })
      }
    })
  },
  //单选按钮性别发生变化
  radioChange(e){
    this.setData({
      isSex:e.detail.value
    })
  },
  //表单提交
  formSubmit(e){
    console.log(e);
    var userSex=this.data.isSex==0?'男':'女';
    var information= e.detail.value;
    this.setData({
      information: information,
      userSex:userSex,
      modalHidden:false
    });
  },
 
  //模态框取消
  modalCancel(){
    wx.showToast({
      title: '取消提交',
      icon:'none'
    })
    this.setData({
      modalHidden:true,
    })
  },
  //模态框确定
  async modalConfirm() {
    wx.showToast({
      title: '提交成功',
      icon:'success'
    })
    this.setData({modalHidden: true})
    //把用户头像存到微信云托管的对象存储之中
    wx.cloud.init()
    app.globalData.user_image_path = this.data.avatarUrl
    if(this.data.head_choice=="choosed"){   //如果用户更新了头像
    var store_path = app.globalData.user_openid+'/head_image/my_head.jpg'
    var result = await this.uploadFile(this.data.avatarUrl, store_path, function(){
      console.log("用户新头像上传完成")
    })}else{                                //如果用户没有更新头像
      var result = this.data.avatarUrl
    }
    //把用户的信息上传到微信云托管的MySQL之中
    wx.request({
      url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/user/modify', 
      data: {
        user_id:app.globalData.user_openid,
        user_name:this.data.information['name'],
        user_sex:this.data.userSex,
        user_motto:this.data.information['sign'],
        head_image_path:result
      },
      method:"POST",
      header: { 'content-type': 'application/json' },
      success: (res) =>{console.log('更新用户信息：',res)},
      fail: function() {console.log('failure')}
      })
      // 修改全局变量
      app.globalData.user_name = this.data.information['name']
      app.globalData.user_motto = this.data.information['sign']
      //跳转回my页面
      wx.navigateBack()
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
  onLoad: function (options) {
    console.log(app.globalData.user_image_path)
  }
})