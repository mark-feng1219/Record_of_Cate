// pages/bj/bj.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardTeams: [{
     "viewid": "1",
     "imgsrc": "/images/sw.jpg",
     
     "count": "食珍录",
     "name": "内容",
    }, {
     "viewid": "2",
     "imgsrc": "/images/sw.jpg",
     
     "count": "食珍录",
     "name": "内容",
    }, {
     "viewid": "3",
     "imgsrc": "/images/sw.jpg",
     
     "count": "食珍录",
     "name": "内容",
    }, {
     "viewid": "4",
     "imgsrc": "/images/sw.jpg",
     
     "count": "食珍录",
     "name": "内容",
    }
    ]
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
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#F86125',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
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