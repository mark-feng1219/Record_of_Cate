// pages/bj/bj.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cardTeams:[],
    card_like_Teams:[],
    currentIndex:0,   // 默认展示笔记
    note_id_array:[],
    title_array:[],
    image_array:[],
    image_like_array:[],
    note_id_like_array:[],
    title_like_array:[]
  },
    getUrl: function (e) {
      console.log(this.data.note_id_array)
      wx.navigateTo({
        url: '/pages/details/details',
      })
    },
    
   // 切换笔记详情照片iper-item触发bindchange事件
  pagechange: function (e) {
    // 通过touch判断，改变tab的下标值
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex;
      currentPageIndex = (currentPageIndex + 1) % 2;
      // 拿到当前索引并动态改变
      this.setData({
        currentIndex: currentPageIndex,
      })
    }
  },
//点击tab时触发
titleClick: function (e) {
  this.setData({
    //拿到当前索引并动态改变
    currentIndex: e.currentTarget.dataset.idx
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
    console.log(app.globalData.login_state)
    if(app.globalData.login_state==1){  //如果用户处于登录状态
      var note_list = wx.getStorageSync('note')
      var like_list = wx.getStorageSync('like')
      if(note_list!=[] || like_list!=[])   //结果不为空，即用户有本地缓存
      {
        console.log("exist Storage")
        this.setData({
          cardTeams:note_list
        })
        this.setData({
          card_like_Teams:like_list
        })
      }
      else{          //结果为空，即用户没有本地缓存
        wx.cloud.init()
        var image_list = []                      // 存储在本地缓存的图像数组
        this.request_note().then(async(res)=>{
          this.setData({
            image_array:res.data['photo_path'],
            note_id_array:res.data['note_id'],
            title_array:res.data['title']
          })
         // 根据笔记的image_path请求微信云托管的对象存储把图片返回
          for(var i=0;i<this.data.image_array.length;i++)
          {
          const result = await this.downloadFile(this.data.image_array[i],function(){})
          image_list.push(result.tempFilePath)    // 把图片缓存路径加到image_array数组里
          }
          for(var j=0;j<this.data.note_id_array.length;j++)
          {
            var tmp_dict={}
            tmp_dict['imgsrc'] = image_list[j]
            tmp_dict['Head_picture'] = app.globalData.user_image_path
            tmp_dict['count'] = app.globalData.user_name,
            tmp_dict['name'] = this.data.title_array[j]
            tmp_dict['note_id'] = this.data.note_id_array[j]
            this.data.cardTeams.push(tmp_dict)
          }
          this.setData({
            cardTeams:this.data.cardTeams
          })
          wx.setStorageSync('note',this.data.cardTeams)
        })

        var image_like_list = []                      // 存储在本地缓存的图像数组
        this.request_like().then(async(res)=>{
          this.setData({
            image_like_array:res.data['photo_path'],
            note_id_like_array:res.data['note_id'],
            title_like_array:res.data['title']
          })
          // 根据笔记的image_path请求微信云托管的对象存储把图片返回
          for(var i=0;i<this.data.image_like_array.length;i++)
          {
          const result = await this.downloadFile(this.data.image_like_array[i],function(){})
          image_like_list.push(result.tempFilePath)    // 把图片缓存路径加到image_array数组里
          }
          for(var j=0;j<this.data.note_id_like_array.length;j++)
          {
            var tmp_dict={}
            tmp_dict['imgsrc'] = image_like_list[j]
            tmp_dict['Head_picture'] = app.globalData.user_image_path
            tmp_dict['count'] = app.globalData.user_name
            tmp_dict['name'] = this.data.title_like_array[j]
            tmp_dict['note_id'] = this.data.note_id_like_array[j]
            this.data.card_like_Teams.push(tmp_dict)
          }
          this.setData({
            card_like_Teams:this.data.card_like_Teams
          })
          // console.log(this.data.image_like_array)
          wx.setStorageSync('like',this.data.card_like_Teams)
        })
      }
    }
  },

  //请求后端获取笔记数据
  request_note:function(){
    return new Promise(function(resolve,reject){
    wx.request({
    url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/note/mynote',
    data: {
      user_id:"test_id"
    },
    method: "GET",
    header: { 'content-type': 'application/json' },
    success: (res) =>     //要在success回调里面写this.setData必须这样写:success: (res) => 
    {
      resolve(res)
      console.log(res)
      // console.log(res.data['photo_path'])
    },
    fail: function() {console.log('failure')},
    })
    })
  },

  // 请求后端获取用户点赞的笔记数据
  request_like:function(){
    return new Promise(function(resolve,reject){
    wx.request({
    url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/support/like_note_info',
    data: {
      user_id:"test_id"
    },
    method: "GET",
    header: { 'content-type': 'application/json' },
    success: (res) =>     //要在success回调里面写this.setData必须这样写:success: (res) => 
    {
      resolve(res)
      console.log(res)
    },
    fail: function() {console.log('failure')},
    })
    })
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {    //避免用户第一步先点开笔记,再登录,再点开笔记没有任何的内容
    console.log(app.globalData.login_state)
    if(app.globalData.login_state==1){  //如果用户处于登录状态
      var note_list = wx.getStorageSync('note')
      var like_list = wx.getStorageSync('like')
      if(note_list!=[] || like_list!=[])   //结果不为空，即用户有本地缓存
      {
        console.log("exist Storage")
        this.setData({
          cardTeams:note_list
        })
        this.setData({
          card_like_Teams:like_list
        })
      }
      else{          //结果为空，即用户没有本地缓存
        wx.cloud.init()
        var image_list = []                      // 存储在本地缓存的图像数组
        this.request_note().then(async(res)=>{
          this.setData({
            image_array:res.data['photo_path'],
            note_id_array:res.data['note_id'],
            title_array:res.data['title']
          })
         // 根据笔记的image_path请求微信云托管的对象存储把图片返回
          for(var i=0;i<this.data.image_array.length;i++)
          {
          const result = await this.downloadFile(this.data.image_array[i],function(){})
          image_list.push(result.tempFilePath)    // 把图片缓存路径加到image_array数组里
          }
          for(var j=0;j<this.data.note_id_array.length;j++)
          {
            var tmp_dict={}
            tmp_dict['imgsrc'] = image_list[j]
            tmp_dict['Head_picture'] = app.globalData.user_image_path
            tmp_dict['count'] = app.globalData.user_name,
            tmp_dict['name'] = this.data.title_array[j]
            tmp_dict['note_id'] = this.data.note_id_array[j]
            this.data.cardTeams.push(tmp_dict)
          }
          this.setData({
            cardTeams:this.data.cardTeams
          })
          wx.setStorageSync('note',this.data.cardTeams)
        })

        var image_like_list = []                      // 存储在本地缓存的图像数组
        this.request_like().then(async(res)=>{
          this.setData({
            image_like_array:res.data['photo_path'],
            note_id_like_array:res.data['note_id'],
            title_like_array:res.data['title']
          })
          // 根据笔记的image_path请求微信云托管的对象存储把图片返回
          for(var i=0;i<this.data.image_like_array.length;i++)
          {
          const result = await this.downloadFile(this.data.image_like_array[i],function(){})
          image_like_list.push(result.tempFilePath)    // 把图片缓存路径加到image_array数组里
          }
          for(var j=0;j<this.data.note_id_like_array.length;j++)
          {
            var tmp_dict={}
            tmp_dict['imgsrc'] = image_like_list[j]
            tmp_dict['Head_picture'] = app.globalData.user_image_path
            tmp_dict['count'] = app.globalData.user_name
            tmp_dict['name'] = this.data.title_like_array[j]
            tmp_dict['note_id'] = this.data.note_id_like_array[j]
            this.data.card_like_Teams.push(tmp_dict)
          }
          this.setData({
            card_like_Teams:this.data.card_like_Teams
          })
          // console.log(this.data.image_like_array)
          wx.setStorageSync('like',this.data.card_like_Teams)
        })
      }
    }
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