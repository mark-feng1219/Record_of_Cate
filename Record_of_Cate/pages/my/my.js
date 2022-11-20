// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '', //用于存放获取的用户信息
    head:"/images/member.png",
    name:"未命名"
  },
  goto2:function(){
    wx.navigateTo({
      url: '/pages/publishnote/publishnote',
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