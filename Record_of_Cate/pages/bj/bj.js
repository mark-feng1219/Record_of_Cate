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
    getUrl: function (e) {    //注意不要写options和console.log(options)
      console.log(e.currentTarget.dataset)
      wx.navigateTo({
        url: '/pages/details/details?note_id='+e.currentTarget.dataset['note_id']+'&title='+e.currentTarget.dataset['title']+'&name='+e.currentTarget.dataset['publisher']+'&cover_image='+ e.currentTarget.dataset['cover_image']+'&user_head='+e.currentTarget.dataset['user_head']+'&publisher_id='+e.currentTarget.dataset['publisher_id'],
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
    data: {user_id:app.globalData.user_openid},
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
    data: {user_id:app.globalData.user_openid},
    header: { 'content-type': 'application/json' },
    success: (res) =>{
      resolve(res)
      console.log('获取点赞数据',res)
    },
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
            tmp_dict['publisher_id'] = app.globalData.user_openid
            this.data.cardTeams.push(tmp_dict)
          }
          this.setData({cardTeams:this.data.cardTeams})
        })

        this.request_like().then(async(res)=>{
          this.setData({
            image_like_array:res.data['photo_path'],
            note_id_like_array:res.data['note_id'],
            title_like_array:res.data['title'],
            publisher_id_array:res.data['publisher_id'],
            publisher_name_array:res.data['publisher_name'],
            publisher_head_array:res.data['publisher_head_image']
          })
          for(var j=0;j<this.data.note_id_like_array.length;j++){
            var tmp_dict={}
            tmp_dict['imgsrc'] = this.data.image_like_array[j]
            tmp_dict['Head_picture'] = this.data.publisher_head_array[j]
            tmp_dict['count'] = this.data.publisher_name_array[j]
            tmp_dict['publisher_id'] = this.data.publisher_id_array[j]
            tmp_dict['name'] = this.data.title_like_array[j]
            tmp_dict['note_id'] = this.data.note_id_like_array[j]
            this.data.card_like_Teams.push(tmp_dict)
          }
          this.setData({card_like_Teams:this.data.card_like_Teams})
        })
        this.setData({request_count:1})
    }else if(app.globalData.login_state==0){
      wx.showToast({
        title: '请先登录！',
        duration: 2000
      })}
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
    this.onRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },
  //onRefresh生命周期函数
  onRefresh:function(){      //现场一定会有那种闲着蛋疼一发表笔记就想看的
    //导航条加载动画
    wx.showNavigationBarLoading()
    //loading 提示框
    wx.showLoading({
      title: 'Loading...',
    })
    console.log("笔记页下拉刷新");
    setTimeout(function () {
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
    }, 2000)
    this.request_note().then(async(res)=>{
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
        tmp_dict['publisher_id'] = app.globalData.user_openid
        this.data.cardTeams.push(tmp_dict)
      }
      this.setData({cardTeams:this.data.cardTeams})
    })

    this.request_like().then(async(res)=>{
      this.setData({
        card_like_Teams:[],
        image_like_array:res.data['photo_path'],
        note_id_like_array:res.data['note_id'],
        title_like_array:res.data['title'],
        publisher_id_array:res.data['publisher_id'],
        publisher_name_array:res.data['publisher_name'],
        publisher_head_array:res.data['publisher_head_image']
      })
      for(var j=0;j<this.data.note_id_like_array.length;j++){
        var tmp_dict={}
        tmp_dict['imgsrc'] = this.data.image_like_array[j]
        tmp_dict['Head_picture'] = this.data.publisher_head_array[j]
        tmp_dict['count'] = this.data.publisher_name_array[j]
        tmp_dict['publisher_id'] = this.data.publisher_id_array[j]
        tmp_dict['name'] = this.data.title_like_array[j]
        tmp_dict['note_id'] = this.data.note_id_like_array[j]
        this.data.card_like_Teams.push(tmp_dict)
      }
      this.setData({card_like_Teams:this.data.card_like_Teams})
    })
  }
})