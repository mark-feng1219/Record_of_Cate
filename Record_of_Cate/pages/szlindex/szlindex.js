// pages/szlindex/szlindex.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    start: 0,
    loading: false,
    currentIndex: 0,
    followpushs:[],
    user_id:app.globalData.user_openid,
    // followpushs: [
    //   {
    //     "cover_image": "/images/推荐1.jpg",
    //     "cover_image_default": "/images/头像2.jpg",
    //     "name": "陪你去看世界NO.1：🇲🇾马来西亚透清凉",
    //     "desc": "热门游记"
    //   },
    // ],
    trips: [
    {
        "cover_image": "/images/推荐1.jpg",
        "cover_image_default": "/images/头像2.jpg",
        "name": "陪你去看世界NO.1：🇲🇾马来西亚透清凉",
        "desc": "热门游记"
      },
      {
        "cover_image": "/images/推荐2.jpg",
        "cover_image_default": "/images/头像3.jpg",
        "name": "回到拉萨🇨🇳跟王小新一起去许愿",
        "desc": "热门游记"
      },
      {
        "cover_image": "/images/推荐3.jpg",
        "cover_image_default": "/images/头像1.jpg",
        "name": "无人岛露营之鬼湾",
        "desc": "热门游记"
      },
      {
        "cover_image": "/images/推荐4.jpg",
        "cover_image_default": "/images/头像1.jpg",
        "name": "不完全的跳岛之旅",
        "desc": "热门游记"
      },
      {
        "cover_image": "/images/推荐4.jpg",
        "cover_image_default": "/images/头像1.jpg",
        "name": "薄荷味的杜马盖地",
        "desc": "热门游记"
      },
      {
        "cover_image": "/images/推荐4.jpg",
        "cover_image_default": "/images/头像1.jpg",
        "name": "锡兰夏梦",
        "desc": "热门游记"
      },
      {
        "cover_image": "/images/推荐4.jpg",
        "cover_image_default": "/images/头像1.jpg",
        "name": "意外？注定？之浪捷奥",
        "desc": "热门游记"
      },
      {
        "cover_image": "/images/推荐4.jpg",
        "cover_image_default": "/images/头像1.jpg",
        "name": "花园之国--哥斯达黎加",
        "desc": "热门游记"
      }
    ],
    pushs:[],
    msg1:'超级好吃',
    msg2:'超级好吃',
    msg3:'超级好吃',
    msg4:'超级好吃 ',
    value:0
  },

  jump1:function(event){
    this.setData({value:1}),
    wx.navigateTo({
      url: '/pages/page1/page1?value='+this.data.value,
      success(){
        console.log('页面one跳转成功')
      }
    })
  },

  jump2:function(event){
    this.setData({value:2}),
    wx.navigateTo({
      url: '/pages/page1/page1?value='+this.data.value,
      success(){
        console.log('页面two跳转成功')
      }
    })
  },

  jump3:function(event){
    this.setData({value:3}),
    wx.navigateTo({
      url: '/pages/page1/page1?value='+this.data.value,
      success(){
        console.log('页面three跳转成功')
      }
    })
  },
  jump4:function(event){
    this.setData({value:4}),
    wx.navigateTo({
      url: '/pages/page1/page1?value='+this.data.value,
      success(){
        console.log('页面four跳转成功')
      }
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
    var self = this;
    /*-------------------------------*/
    //修改导航栏颜色
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#FFC359',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    /*-------------------------------*/
    //设置页面标题
    wx.setNavigationBarTitle({
      title: '食珍录'
    });
    /*-------------------------------*/
    wx.getSystemInfo({
      success(res) {
        var widths = res.windowWidth;
        var bfb = widths * 1.0 / 187;
        if (bfb <= 1) {
          bfb = 1;
        }
        if (widths < 700) {
          bfb = 2;
        }
        //console.log('百分比 : ' + bfb);
        //-------------------------------
        var num = Math.floor(bfb) * 2 + 2; //个数 
        var numtol = Math.floor(num * 4); //总框
        var panlwidth = widths - numtol;
        // console.log('dd : ' + panlwidth);
        //-------------------------------
        self.setData({
          width: Math.floor(panlwidth * 1.0 / Math.floor(bfb)),
          height: Math.floor(panlwidth * 1.0 / Math.floor(bfb)*1.5),
          borderwidth: 4
        })
      }
    });
    wx.cloud.init()
    this.request_focus().then(async(res)=>{  //加载首页关注的内容
      var user_id_image = {}
      for(var i=0;i<res.data['user_head'].length;i++){     //加载用户头像
      var tmp_dict={}
      tmp_dict['headportrait'] = res.data['user_head'][i]
      tmp_dict['user_id'] = res.data['user_id'][i]
      tmp_dict['user_name'] = res.data['user_name'][i]
      user_id_image[res.data['user_id'][i]] = res.data['user_head'][i]
      this.data.pushs.push(tmp_dict)
      this.setData({pushs:this.data.pushs})
      }
      for(var i=0;i<res.data['note_image'].length;i++){     //加载笔记图像
      var tmp_dict={}
      tmp_dict['cover_image'] = res.data['note_image'][i]   //事实证明,是可以直接从存储桶里下的
      tmp_dict['cover_image_default'] = user_id_image[res.data['publisher_id'][i]]
      tmp_dict['desc'] = res.data['publisher_name'][i]
      tmp_dict['name'] = res.data['note_title'][i]
      tmp_dict['note_id'] = res.data['note_id'][i]
      tmp_dict['publisher_id'] = res.data['publisher_id'][i]
      this.data.followpushs.push(tmp_dict)
      this.setData({followpushs:this.data.followpushs})
      }
      // console.log(this.data.followpushs)
    })
  },
  // 跳转至个人主页
  gotoHomePage: function (e)  {
    console.log(e.currentTarget.dataset)
      wx.navigateTo({
        url: '../zy/zy?user_id=' + e.currentTarget.dataset['user_id'] + '&user_name=' + e.currentTarget.dataset['user_name'] + '&user_head=' + e.currentTarget.dataset['headportrait']
      })
  },
    //加载首页关注的内容
    request_focus:function(){
      return new Promise(function(resolve,reject){
        wx.request({
          url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/follow/myfocus',
          data: { user_id:"test_id"},
          method:'GET',
          header: { 'content-type': 'application/json' },
          success: (res) => {resolve(res);console.log('加载首页关注的内容:',res)},
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