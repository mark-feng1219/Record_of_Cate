// pages/zy/zy.js
const app = getApp()
Page({
  currentIndex: 0, //默认是活动项
  /**
   * 页面的初始数据
   */
  data: {
    msg1:'这个卤肉卷太绝了，吃了还想吃',
    msg2:'不会还有人没吃过吧',
    msg3:'这个卤肉卷太绝了，吃了还想吃',
    msg4:'这个卤肉卷太绝了，吃了还想吃 ',
    value:0
  },

  jump1:function(event){
    this.setData({value:1})
   
  },

  jump2:function(event){
    this.setData({value:2})
    
  },

  jump3:function(event){
    this.setData({value:3})
    
  },

  jump4:function(event){
    this.setData({value:4})
  
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
      title: '别人主页'
      
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