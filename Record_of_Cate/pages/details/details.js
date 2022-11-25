// pages/details/details.js
const app = getApp()
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  /**
   * 页面的初始数据
   */

  data: {
    checked: true,
    active: 0,
    showShare: false,
    loading: true,
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: 'QQ', icon: 'qq' },
      { name: '微博', icon: 'weibo' },
      { name: '复制链接', icon: 'link' },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' },
    ],
    cardTeams: [],
    // cardTeams: [{
    //   "viewid": "1",
    //   "imgdetailsrc": "/images/笔记详情照片.jpg",
    //   "headportrait": "/images/头像1.jpg",
    //   "name": "暖啊榆",
    //   "title": "这是什么菜",
    //   "content": "虽然还没有吃，但是看起来好好吃呀！我好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃！好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃好想吃！\n",
    //  }],
     comments: [{
       "name": "暖啊榆",
       "headportrait": "/images/头像1.jpg",
       "content": "哇！！发现宝藏啦！点开这个博主的主页根本出不来欸！"
     },
     {
      "name": "一再叠唱",
      "headportrait": "/images/头像6.jpg",
      "content": "震惊！QAQ和我抢沙发的居然是博主本人"
    },
    {
     "name": "山有",
     "headportrait": "/images/头像2.jpg",
     "content": "课上了一半刷到，马上拉着小伙伴赶往学生街"
   },
   {
    "name": "哈拉少",
    "headportrait": "/images/头像7.jpg",
    "content": "福大学生街那家吗？上次带女朋友去，她觉得挺不错的"
  },
  {
   "name": "SlackerC",
   "headportrait": "/images/头像8.jpg",
   "content": "温馨提示：千万别点进去主页，要不然会一直流口水"
 },
 {
  "name": "叮叮车",
  "headportrait": "/images/头像9.jpg",
  "content": "虽然不太喜欢油炸食品，但是这个感觉吃起来不会腻，还不错……"
}
    ]

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var note_id = options.note_id
    loading: (options.loading == "true" ? true : false)
    wx.request({
      url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/note/note_details',
      data: {
        note_id:note_id
      },
      method:"GET", 
      header: { 'content-type': 'application/json' },
      success: (res) => {
      console.log(res)
      var note_info={}
      note_info['viewid'] = 1
      note_info["imgdetailsrc"] = options.cover_image
      note_info["headportrait"] = options.user_head
      note_info["name"] = options.name
      note_info['title'] = options.title
      note_info['content'] = res.data['note_content']
      this.data.cardTeams.push(note_info)
      this.setData({cardTeams:this.data.cardTeams})
      },
      fail: function() {  //接口调用失败的回调函数
      console.log('failure')  // 发生网络错误等情况触发
      }
    })
  },
  showcomment: function(){
    var that = this;
    that.setData({
      loading: (!that.data.loading)
    })
  },
  onClick(event) {
    this.setData({ showShare: true });
  },

  onClose() {
    this.setData({ showShare: false });
  },

  onSelect(event) {
    Toast(event.detail.name);
    this.onClose();
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
  onChange(event) {
    this.setData({ active: event.detail });

  },
  test: function (){        //点击点赞按钮时触发
    if(app.globalData.login_state!=0){
      Toast.success('点赞成功');
    }else{
      Toast.success('请先登录！');
    }
 },
  goto:function(){          //点击评论按钮时触发
    if(app.globalData.login_state!=0){
      wx.navigateTo({
        url: '/pages/pl/pl',
      })
    }else{
      Toast.success('请先登录！');
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
});