// pages/pl/pl.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    openid:""
  },
  onSubmit(e){
    console.log('提交成功',e);
    var content= e.detail.value;
    this.setData({
      content:content,
      openid:app.globalData.user_name,
      modalHidden:false
    });
  },

  test: function (){
    var comment_id = Date.now()
    console.log(comment_id)
    wx.request({ //多的参数服务器会忽略,少了服务器会报错Internal Server Error在接口中没有接收到对应的数据
      url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/comment/insert_comment',
      data: {
        comment_id:comment_id,
        comment_publisher_id:this.data.openid,
        comment_content:this.data.content,
        publishAt_note_id:"1668432609"
      },
      method:"GET", 
      header: { 'content-type': 'application/json' },
      success: function(res) {  //接口调用成功的回调函数
      console.log(res)          // 收到https服务成功后返回
      },
      fail: function() {  //接口调用失败的回调函数
      console.log('failure')  // 发生网络错误等情况触发
      },
    })
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