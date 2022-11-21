// pages/pl/pl.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  test: function (){
    const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '发表倒数 3 秒',
        selector: '#custom-selector',
      });
      
      let second = 3;
      const timer = setInterval(() => {
        second--;
        if (second) {
          toast.setData({
            message: `发表倒数 ${second} 秒`,
          });
        } else {
          clearInterval(timer);
          Toast.clear();
        }
      }, 1000);      
 }, 


  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: ' ',
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