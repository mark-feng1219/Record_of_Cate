const app = getApp()  //组件里也是可以使用全局变量的
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cover_image:'',
    title:{
      type: String,
      value:''
    },
    cover_image_default:{
      type: String,
      value:''
    },
    name:{
      type: String,
      value:''
    },
    note_id:'',
    user_id:'',
  },

  /**
   * 组件的初始数据
   */
  data: {
    like: false,
    count:0,
    yesSrc: '../images/like.png', // 点赞时的图片路径
    noSrc: '../images/unlike.png' // 没有点赞时的图片路径
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(e) {
      console.log(e.currentTarget.dataset)
      let like = this.properties.like
      let count = this.properties.count
      this.setData({
        like: !like,
        count: (count+1)%2,
        note_id:e.currentTarget.dataset['note_id'],
        user_id:e.currentTarget.dataset['user_id']  //发布此笔记的用户ID
      })
      if(this.data.user_id==app.globalData.user_openid){ //如果这篇笔记的拥有者是自己,就不能点赞
        wx.showToast({title: '不能点赞自己的笔记',icon: 'none'})
      }else{
        // 将用户点赞或取消点赞的动作上传至微信云托管
        console.log('用户是否选择点赞：',this.data.like)
        if(this.data.like){var choice = "insert"}
        else{var choice = "delete"}
        wx.request({
          url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/support/operate_note',
          data: {
            user_id:app.globalData.user_openid,//用户自己的ID
            note_id: this.data.note_id,        //用户要点赞的笔记ID
            choice:choice
          },
          header: { 'content-type': 'application/json' },
          success: function(res) {
            console.log(res)
            if(res.data=="like success"){wx.showToast({title: '您的点赞是我创作的鼓励！',icon: 'none'})}
            if(res.data=="cancel success"){wx.showToast({title: '取消点赞成功',icon: 'none'})}
            if(res.data=="you have already supported"){wx.showToast({title: '您已经点赞过了',icon: 'none'})}
          },
          fail: function() {console.log('failure')}
          })
      }
    },
    getUrl: function (e) {     //跳转至笔记的详情页
      wx.navigateTo({
        url: '/pages/details/details?note_id=' + e.currentTarget.dataset['note_id'] + '&title=' + e.currentTarget.dataset['note_title'] + '&name=' + e.currentTarget.dataset['publisher'] + '&cover_image=' + e.currentTarget.dataset['image'] + '&user_head=' + e.currentTarget.dataset['publisher_head'] + '&publisher_id=' + e.currentTarget.dataset['user_id']
      })
    },
    getUrl1: function (e) {    //跳转至用户的个人主页,用户起名字为???时会出bug,跳转至自己主页时没有头像和名称
      wx.navigateTo({
        url: '/pages/zy/zy?user_id='+ e.currentTarget.dataset['user_id'] + '&user_name=' + e.currentTarget.dataset['publisher'] + '&user_head=' + e.currentTarget.dataset['publisher_head'] + '&self_id='+app.globalData.user_openid
      })
    },
  }
})
