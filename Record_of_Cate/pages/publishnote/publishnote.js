// pages/publishnote/publishnote.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data:{
    info: {
        licensePicUrls: [],
      },
      title:'',
      content:'',
      label:"",
      imgShow:false
  },
  // 图片显示
    buttonclick:function () {
      var that = this
      wx: wx.showActionSheet({
        itemList: ['拍照', '从手机相册选择'],
        itemColor: '',
        success: function (res) {
            wx.chooseImage({
              count: 2,//最多选2张
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
        complete: function (res) {},
      })
    },
  
    //图片预览
    previewImage(e) {
      const current = e.target.dataset.src  //获取当前点击的 图片 url
      wx.previewImage({
        current,
        urls: this.data.info.licensePicUrls
      })
    },

    async onSubmit(e){
      console.log(e);
      var value = e.detail.value
      this.setData({
        information:value,
        modalHidden:false
    });
    if(value.title && value.content && value.label) {   //如果标题以及内容不为空
      wx.cloud.init()
      const result = await this.uploadFile(this.data.info.licensePicUrls[0], 'test/test_1.png', function(res){
        console.log(`上传进度：${res.progress}%，已上传${res.totalBytesSent}B，共${res.totalBytesExpectedToSend}B`)     //result是存储在对象存储的路径
    })
    console.log(result)
    var note_id=Date.now()
    console.log(note_id)
    wx.request({ //多的参数服务器会忽略,少了服务器会报错Internal Server Error在接口中没有接收到对应的数据
      url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/note/upload_user_note',
      data: {
        note_id:note_id,
        publisher_id:app.globalData.openid,
        title:value.title,
        content:value.content,
        tag:value.label,
        photo_path:result
      },
      method:"POST",               //后续再改成POST
      header: { 'content-type': 'application/json' },
      success: function(res) {  //接口调用成功的回调函数
      console.log(res)          // 收到https服务成功后返回
      },
      fail: function() {  //接口调用失败的回调函数
      console.log('failure')  // 发生网络错误等情况触发
      },
      })
    //  wx.cloud.callContainer({
    //    "config": {
    //      "env": "prod-1gzin06weddc0c77"
    //    },
    //    "path": "/note/upload_user_note?publisher_id=1232&note_id=426&title=DEBUG&photo_path=ugly.jpg&content=我讨厌BUG",
    //    "header": {
    //      "X-WX-SERVICE": "flask-ddml",
    //      "content-type": "application/json"
    //    },
    //    "method": "POST",
    //    "data": ""
    //  })
  }
    else {
      wx.showModal({
        title: '提示',
        content: '请将信息填写完整',
        showCancel: false
      });
    }
    },
    uploadFile(file, path, onCall = () => {}) {  //上传到微信云托管的对象存储
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})