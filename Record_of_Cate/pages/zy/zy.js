// pages/zy/zy.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0, //默认是活动项
    start: 0,
    loading: false,
    follow: false,
    count: 0,
    yesSrc: '/images/已关注.png', // 已关注时的图片路径
    noSrc: '/images/关注.png', // 没有关注时的图片路径
    trips: [],
    like_trips: [],
    value:0
  },
  onFollow: function(e) {
    var follow = this.data.follow
    var count = this.data.count
    this.setData({ // 更新数据
      follow: !follow,
      count: (count+1)%2,
    })
    if(this.data.count==1){var choice = 'follow'}
    else{var choice = 'cancel'}
    wx.request({                   //将关注或取消关注用户的数据上传至后端
      url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/follow/operate_user',
      data: {
        fans_id:app.globalData.user_openid,
        blogger_id:this.data.blogger_id,
        choice:choice
      },
      header: { 'content-type': 'application/json' },
      success: function(res) {
        console.log(res)
        if(res.data=="follow success") {wx.showToast({title: '感谢您的关注',})}
        else if(res.data=="you have alredy followed"){wx.showToast({title: '您已经关注过了',})}
        else if(res.data=="cancel success") {wx.showToast({title: '您已取消关注',})}
      },
      fail: function() {console.log('failure')},
    })
  },
  // 切换swiper-item触发bindchange事件
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
    console.log(options)
    this.setData({
      blogger_id:options.user_id,    //博主ID
      blogger_name:options.user_name,  //博主昵称
      blogger_head:options.user_head,  //博主头像
    })
    wx.setNavigationBarTitle({
      title: ' ',
      backgroundColor: '#FFF4D9',
    });
    this.request_note().then(async(res)=>{   //请求个人主页的笔记
      var note_image_array=res.data['photo_path']
      var note_id_array = res.data['note_id']
      var note_title_array = res.data['title']
      for(var i=0;i<note_id_array.length;i++){
        var tmp_dict={}
        tmp_dict['cover_image'] = note_image_array[i]
        tmp_dict['cover_image_default'] = this.data.blogger_head
        tmp_dict['name'] = note_title_array[i]
        tmp_dict['desc'] = this.data.blogger_name
        tmp_dict['note_id'] = note_id_array[i]
        tmp_dict['user_id'] = this.data.blogger_id
        this.data.trips.push(tmp_dict)
      }
      this.setData({trips:this.data.trips})   //渲染到渲染层中
    })
    this.request_like().then(async(res)=>{   //请求个人主页的点赞
      var like_image_array=res.data['photo_path']
      var like_id_array = res.data['note_id']
      var like_title_array = res.data['title']
      var like_blogger_head_array = res.data['publisher_head_image']
      var like_blogger_name_array = res.data['publisher_name']
      var like_blogger_id_array = res.data['publisher_name']
      for(var i=0;i<like_id_array.length;i++){
        var tmp_dict={}
        tmp_dict['cover_image'] = like_image_array[i]      //居然可以从存储桶cloud里直接下
        tmp_dict['cover_image_default'] = like_blogger_head_array[i]
        tmp_dict['name'] = like_title_array[i]
        tmp_dict['desc'] = like_blogger_name_array[i]
        tmp_dict['note_id'] = like_id_array[i]
        tmp_dict['user_id'] = like_blogger_id_array[i]
        this.data.like_trips.push(tmp_dict)
      }
      this.setData({like_trips:this.data.like_trips})   //渲染到渲染层中
    })
  },
  //请求后端获取笔记数据
  request_note:function(){
    var that = this
    return new Promise(function(resolve,reject){
    wx.request({
    url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/note/mynote',
    data: {user_id:that.data.blogger_id},
    header: { 'content-type': 'application/json' },
    success: (res) =>{resolve(res);console.log('请求笔记:',res)},
    fail: function() {console.log('failure')},
    })})
  },
  //请求后端获取点赞数据
  request_like:function(){
    var that = this
    return new Promise(function(resolve,reject){
    wx.request({
    url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/support/like_note_info',
    data: {user_id:that.data.blogger_id},
    header: { 'content-type': 'application/json' },
    success: (res) =>{resolve(res);console.log('请求点赞:',res)},
    fail: function() {console.log('failure')},
    })})
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