Page({
  data: {
    shareshow: false,
    food:''
  },


  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '食珍录-帮我点餐'
    });

  },
  // 下载微信云托管对象存储中的图片到本地
  downloadFile(fileID, onCall = () => {}) {
    return new Promise((resolve, reject) => {
      const task = wx.cloud.downloadFile({
        fileID,
        success: res => resolve(res),
        fail: e => {
          const info = e.toString()
          console.log(info)
          if (info.indexOf('abort') != -1) {
            reject(new Error('【文件下载失败】中断下载'))
          } else {
            reject(new Error('【文件下载失败】网络或其他错误'))
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
  onShow: function() {

  },
  share:function(){
    if(!this.data.shareshow){           //如果框中没有内容
    this.request_recommend().then(async(res)=>{
      console.log(res.data)
      const result = await this.downloadFile(res.data,function(){})
      console.log(result.tempFilePath)
      this.setData({
        food:result.tempFilePath,
        shareshow: !this.data.shareshow
      })
    })}else{                            //如果框中有内容,则清空掉
      this.setData({
        food:'',
        shareshow: !this.data.shareshow
      })
    }
  },
   //请求后端获取点餐选择
   request_recommend:function(){
    return new Promise(function(resolve,reject){
      wx.request({
        url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/recommend/',
        data: {
          user_id:"test_id"
        },
        method: "GET",
        header: { 'content-type': 'application/json' },
        success: (res) => {
          resolve(res)
        },
        fail: function() {console.log('failure')},
      })})}
})