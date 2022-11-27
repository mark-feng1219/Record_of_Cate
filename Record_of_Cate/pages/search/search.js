// pages/search/search.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    exist:true,
    cardTeams:[]
  },
  onSearch(){                //敲下回车触发搜索
    console.log("搜索用户的关键词")
    this.request_note().then(async(res)=>{
      this.setData({
        image_array:res.data['photo_path'],
        note_id_array:res.data['note_id'],
        title_array:res.data['title']
      })
      for(var j=0;j<this.data.note_id_array.length;j++){
        var tmp_dict={}
        tmp_dict['imgsrc'] = this.data.image_array[j]
        tmp_dict['Head_picture'] = app.globalData.user_image_path
        tmp_dict['count'] = app.globalData.user_name,
        tmp_dict['name'] = this.data.title_array[j]
        tmp_dict['note_id'] = this.data.note_id_array[j]
        this.data.cardTeams.push(tmp_dict)
      }
      this.setData({cardTeams:this.data.cardTeams})
      if(this.data.cardTeams==[]){this.setData({exist:false})}  //如果没有任何跟关键词有关的笔记时触发
      else{this.setData({exist:true})}       //如果有任何跟关键词有关的笔记时触发
    })
  },
   //请求后端获取跟关键词有关的内容
   request_note:function(){
    return new Promise(function(resolve,reject){
    wx.request({
    url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/note/mynote',
    data: {
      user_id:"test_id"
    },
    header: { 'content-type': 'application/json' },
    success: (res) =>{resolve(res);console.log('获取笔记数据：',res)},
    fail: function() {console.log('failure')},
    })})
  },
  getUrl: function (e) {    //注意不要写options和console.log(options)
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/details/details?note_id='+e.currentTarget.dataset['note_id']+'&title='+e.currentTarget.dataset['title']+'&name='+e.currentTarget.dataset['publisher']+'&cover_image='+ e.currentTarget.dataset['cover_image']+'&user_head='+e.currentTarget.dataset['user_head']+'&publisher_id='+app.globalData.user_openid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '搜索-食珍录'
      
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