var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    head:"/images/member.png",
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
  // 点击更换手机相册或者电脑本地图片

  headimage: function () {     //更改用户头像
    var that = this;
     wx.chooseImage({
       count: 1,
       sizeType: ['original', 'compressed'],
       sourceType: ['album', 'camera'],

       success: function (res) {
         that.setData({
           head: res.tempFilePaths[0]
        })
      }
    })
  },
  //单选按钮发生变化
  radioChange(e){
    this.setData({
      isSex:e.detail.value
    })
  },
 // 图片显示
 buttonclick:function () {
  var that = this
  wx: wx.showActionSheet({
    itemList: ['拍照', '从手机相册选择'],
    itemColor: '',
    success: function (res) {
        wx.chooseImage({
          count: 1,//最多选2张
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success (res) {
            console.log('res',res)
            const tempFilePaths = res.tempFilePaths
            that.setData({
              "info.licensePicUrls":tempFilePaths,
              imgShow:true
            })
          }
        })
    },
    fail: function (res) {
      console.log('取消',res.errMsg);
    },
  })
},

//图片预览
// previewImage(e) {
//   const current = e.target.dataset.src  //获取当前点击的 图片 url
//   wx.previewImage({
//     current,
//     urls: this.data.info.licensePicUrls
//   })
// },

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
    this.setData({
      modalHidden: true
    })
    // 修改全局变量
    app.globalData.user_name = this.data.information['name']
    app.globalData.user_motto = this.data.information['sign']
    app.globalData.user_image_path = this.data.head  //把用户头像存到全局变量之中
    //把用户头像存到微信云托管的对象存储之中
    wx.cloud.init()
    const result = await this.uploadFile(this.data.head, 'test_id/head_image/my_head.jpg', function(res){
      console.log(`上传进度：${res.progress}%，已上传${res.totalBytesSent}B，共${res.totalBytesExpectedToSend}B`)     //result是存储在对象存储的路径
    })
    //把用户的信息上传到微信云托管的MySQL之中
    wx.request({
      url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/user/modify', 
      data: {
        user_id:"test_id",
        user_name:this.data.information['name'],
        user_sex:this.data.userSex,
        user_motto:this.data.information['sign'],
        head_image_path:result
      },
      header: { 'content-type': 'application/json' },
      success: (res) =>{  //接口调用成功的回调函数
      console.log(res)
      },
      fail: function() {  //接口调用失败的回调函数
      console.log('failure')  // 发生网络错误等情况触发
      }
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
  onLoad: function (options) {
  
  }
})