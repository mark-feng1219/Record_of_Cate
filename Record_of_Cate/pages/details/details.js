// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardTeams: [{
      "viewid": "1",
      "imgdetailsrc": "/images/笔记详情照片.jpg",
      "headportrait": "/images/头像1.jpg",
      "name": "暖啊榆",
      "title": "这是什么菜",
      "content": "虽然还没有吃，但是看起来好好吃呀！我好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃！好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃！",
     }
     ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: ' '
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