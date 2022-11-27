// pages/details/details.js
const app = getApp()
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  /**
   * 页面的初始数据
   */

  data: {
    like_count : 0,
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
    comments: []
    // cardTeams: [{
    //   "viewid": "1",
    //   "imgdetailsrc": "/images/笔记详情照片.jpg",
    //   "headportrait": "/images/头像1.jpg",
    //   "name": "暖啊榆",
    //   "title": "这是什么菜",
    //   "content": "虽然还没有吃，但是看起来好好吃呀！我好想吃好想吃",
    //  }],
    //  comments: [{
    //    "name": "暖啊榆",
    //    "headportrait": "/images/头像1.jpg",
    //    "content": "哇！！发现宝藏啦！点开这个博主的主页根本出不来欸！"
    //  }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      note_id:options.note_id,
      publisher_id:options.publisher_id
    })
    loading: (options.loading == "true" ? true : false)
    wx.request({
      url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/note/note_details',
      data: {note_id:options.note_id},
      header: { 'content-type': 'application/json' },
      success: (res) => {
      console.log('请求返回笔记的内容和评论:',res)
      var note_info={}
      note_info["imgdetailsrc"] = options.cover_image
      note_info["headportrait"] = options.user_head
      note_info["name"] = options.name
      note_info['title'] = options.title
      note_info['content'] = res.data['note_content']
      this.data.cardTeams.push(note_info)
      this.setData({cardTeams:this.data.cardTeams})
      for(var i=0;i<res.data['comment_content'].length;i++){
        var comment_info = {}
        comment_info['name'] = "暖啊榆",
        comment_info['headportrait'] = 'https://thirdwx.qlogo.cn/mmopen/vi_32/05XINsPDic2ELnfPnIiadmy4ytlSZW0Ew00XOwKnobTsWM8lkrMMVpaUvMladiaIo0J5kyyAv4EaeMQ4GXbnvGhNQ/132'
        comment_info['content'] = res.data['comment_content'][i]
        this.data.comments.push(comment_info)
      }
      this.setData({comments:this.data.comments})
      },
      fail: function() {console.log('failure')},
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
      console.log("评论区上拉触底")
  },
  onChange(event) {
    this.setData({ active: event.detail });
  },
  test: function (){        //点击点赞按钮时触发
    if(app.globalData.login_state!=0){
      console.log(this.data.publisher_id)
      if(this.data.publisher_id==app.globalData.user_openid){  //如果这篇笔记的拥有者是自己,就不能点赞
        Toast.success('不能点赞自己的笔记哦！')
      }else{                                                   //这篇笔记不是自己发表的
      if(this.data.like_count==0){var choice = "insert";this.setData({like_count:1})}
      else{choice = "delete";this.setData({like_count:0})}
      console.log('用户'+app.globalData.user_openid+'点赞/取消点赞了'+this.data.note_id)
      wx.request({
        url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/support/operate_note',
        data: {
          user_id:app.globalData.user_openid,
          note_id: this.data.note_id,
          choice:choice
        },
        header: { 'content-type': 'application/json' },
        success: function(res) {
          console.log(res)
          if(res.data=="like success"){Toast.success('点赞成功')}
          if(res.data=="cancel success"){Toast.success('取消点赞成功')}
          if(res.data=="you have already supported"){Toast.success('您已经点赞过了')}
        },
        fail: function() {console.log('failure')}
        })
    }}
    else{Toast.success('请先登录！')}
 },
  goto:function(){          //点击评论按钮时触发
    if(app.globalData.login_state!=0){wx.navigateTo({url: '/pages/pl/pl',})}
    else{Toast.success('请先登录！');}
  }
});