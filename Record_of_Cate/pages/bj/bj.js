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
    title_like_array:[],
    request_count:0
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
    console.log('onLoad：',app.globalData.login_state)
  },

  //请求后端获取笔记数据
  request_note:function(){
    return new Promise(function(resolve,reject){
    wx.request({
    url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/note/mynote',
    data: {user_id:"test_id"},
    header: { 'content-type': 'application/json' },
    success: (res) =>{resolve(res);console.log('获取笔记数据：',res)},
    fail: function() {console.log('failure')},
    })})
  },

  // 请求后端获取用户点赞的笔记数据
  request_like:function(){
    return new Promise(function(resolve,reject){
    wx.request({
    url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/support/like_note_info',
    data: {user_id:"test_id"},
    header: { 'content-type': 'application/json' },
    success: (res) =>{resolve(res);console.log('获取点赞数据',res)},
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
  onShow() {    //避免用户第一步先点开笔记,再登录,再点开笔记没有任何的内容
    console.log('onShow：',app.globalData.login_state)
    if(app.globalData.login_state==1&&this.data.request_count==0){  //如果用户处于登录状态
        this.request_note().then(async(res)=>{
          this.setData({
            image_array:res.data['photo_path'],
            note_id_array:res.data['note_id'],
            title_array:res.data['title']
          })
          for(var j=0;j<this.data.note_id_array.length;j++){
            var tmp_dict={}
            tmp_dict['imgsrc'] = this.data.image_array[j]
            tmp_dict['Head_picture'] = app.globalData.user_image_path
            tmp_dict['count'] = app.globalData.user_name,
            tmp_dict['name'] = this.data.title_array[j]
            tmp_dict['note_id'] = this.data.note_id_array[j]
            this.data.cardTeams.push(tmp_dict)
          }
          this.setData({cardTeams:this.data.cardTeams})
        })

        this.request_like().then(async(res)=>{
          this.setData({
            image_like_array:res.data['photo_path'],
            note_id_like_array:res.data['note_id'],
            title_like_array:res.data['title']
          })
          for(var j=0;j<this.data.note_id_like_array.length;j++){
            var tmp_dict={}
            tmp_dict['imgsrc'] = this.data.image_like_array[j]
            tmp_dict['Head_picture'] = app.globalData.user_image_path
            tmp_dict['count'] = app.globalData.user_name
            tmp_dict['name'] = this.data.title_like_array[j]
            tmp_dict['note_id'] = this.data.note_id_like_array[j]
            this.data.card_like_Teams.push(tmp_dict)
          }
          this.setData({card_like_Teams:this.data.card_like_Teams})
        })
        this.setData({request_count:1})
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
    this.request_note().then(async(res)=>{        //用户刚发表完笔记想看结果
      this.setData({
        cardTeams:[],
        image_array:res.data['photo_path'],
        note_id_array:res.data['note_id'],
        title_array:res.data['title']
      })
      for(var j=0;j<this.data.note_id_array.length;j++){
        var tmp_dict={}
        tmp_dict['imgsrc'] = this.data.image_array[j]
        tmp_dict['Head_picture'] = app.globalData.user_image_path
        tmp_dict['count'] = app.globalData.user_name,
        tmp_dict['name'] = this.data.title_array[j]
        tmp_dict['note_id'] = this.data.note_id_array[j]
        this.data.cardTeams.push(tmp_dict)
      }
      this.setData({cardTeams:this.data.cardTeams})
    })

    this.request_like().then(async(res)=>{       //用户刚点赞完笔记想看结果
      this.setData({
        card_like_Teams:[],
        image_like_array:res.data['photo_path'],
        note_id_like_array:res.data['note_id'],
        title_like_array:res.data['title']
      })
      for(var j=0;j<this.data.note_id_like_array.length;j++){
        var tmp_dict={}
        tmp_dict['imgsrc'] = this.data.image_like_array[j]
        tmp_dict['Head_picture'] = app.globalData.user_image_path
        tmp_dict['count'] = app.globalData.user_name
        tmp_dict['name'] = this.data.title_like_array[j]
        tmp_dict['note_id'] = this.data.note_id_like_array[j]
        this.data.card_like_Teams.push(tmp_dict)
      }
      this.setData({card_like_Teams:this.data.card_like_Teams})
    })
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