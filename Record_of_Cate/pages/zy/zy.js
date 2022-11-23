// pages/zy/zy.js
const app = getApp()

Page({
  currentIndex: 0, //默认是活动项
 
 
  /**
   * 页面的初始数据
   */
  data: {
    start: 0,
    loading: false,
    follow: false,
    count: 0,
    yesSrc: '/images/已关注.png', // 已关注时的图片路径
    noSrc: '/images/关注.png', // 没有关注时的图片路径
    
    trips: [
    {
        "cover_image": "/images/推荐1.jpg",
        "cover_image_default": "/images/头像1.jpg",
        "name": "陪你去看世界NO.1：🇲🇾马来西亚透清凉",
        "desc": "热门游记"
      },
      {
        "cover_image": "/images/推荐2.jpg",
        "cover_image_default": "/images/头像1.jpg",
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

    value:0
  },
  getUrl: function (e) {
    // var id = e.currentTarget.dataset.id;//获取到绑定的数据
    //跳转传值
    wx.navigateTo({
      // url: '/pages/zy/zy?id=' + id,
      url: '/pages/details/details',
    })
  },
  getUrl1: function (e) {
    // var id = e.currentTarget.dataset.id;//获取到绑定的数据
    //跳转传值
    wx.navigateTo({
      // url: '/pages/zy/zy?id=' + id,
      url: '/pages/zy/zy',
    })
  },
  onFollow: function(e) {
    let follow = this.data.follow
    let count = this.data.count
    var xc = Array('您已取消关注','感谢您的关注') 
    this.setData({ // 更新数据
      follow: !follow,
      count: (count+1)%2,
    })
    wx.showToast({
      title: `${xc[this.data.count]}`,
      icon: 'none',
    });
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
    wx.setNavigationBarTitle({
      title: ' ',
      backgroundColor: '#FFF4D9',
    });
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