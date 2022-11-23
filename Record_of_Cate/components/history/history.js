// components/history/history.js
const app = getApp()
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
    user_id:''
  },

  /**
   * 组件的初始数据
   */
  data: {
    like: false,
    yesSrc: '../images/点赞点亮.png', // 点赞时的图片路径
    noSrc: '../images/点赞未点亮.png' // 没有点赞时的图片路径

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(e) {
      console.log(e.currentTarget.dataset)
      let like = this.properties.like
      this.setData({ // 更新数据
        like: !like,
        note_id:e.currentTarget.dataset['note_id'],
        user_id:e.currentTarget.dataset['user_id']
      })
      // 将用户点赞或取消点赞的动作上传至微信云托管
      if(this.data.like){
        wx.request({ 
          url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/support/operate_note',
          data: {
            user_id: this.data.user_id,
            note_id: this.data.note_id,
            choice:"insert"
          },
          method:"GET",               //后续再改成POST
          header: { 'content-type': 'application/json' },
          success: function(res) {  //接口调用成功的回调函数
          console.log(res)          // 收到https服务成功后返回
          },
          fail: function() {  //接口调用失败的回调函数
          console.log('failure')  // 发生网络错误等情况触发
          },
          })
      }else{
        wx.request({ 
          url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/support/operate_note',
          data: {
            user_id: this.data.user_id,
            note_id: this.data.note_id,
            choice:"delete"
          },
          method:"GET",               //后续再改成POST
          header: { 'content-type': 'application/json' },
          success: function(res) {  //接口调用成功的回调函数
          console.log(res)          // 收到https服务成功后返回
          },
          fail: function() {  //接口调用失败的回调函数
          console.log('failure')  // 发生网络错误等情况触发
          },
          })
      }
    },
    getUrl: function (e) {
      console.log(e.currentTarget.dataset)
      wx.navigateTo({
        // url: '/pages/zy/zy?id=' + id,
        url: '/pages/details/details?user_id=' + e.currentTarget.dataset['user_id'],
      })
    },
    getUrl1: function (e) {
      console.log(e.currentTarget.dataset)
      wx.navigateTo({
        // url: '/pages/zy/zy?id=' + id,
        url: '/pages/zy/zy?note_id='+ e.currentTarget.dataset['note_id'],
      })
    },

  }
})
