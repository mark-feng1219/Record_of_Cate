// components/history/history.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cover_image:{
      type: String,
      value:''
    },
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
  },

  /**
   * 组件的初始数据
   */
  data: {
    like: false,
    count: 0,
    yesSrc: '../images/点赞点亮.png', // 点赞时的图片路径
    noSrc: '../images/点赞未点亮.png' // 没有点赞时的图片路径

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(e) {
      let like = this.properties.like
      this.setData({ // 更新数据
        like: !like,
      })
    },
    getUrl: function (e) {
      // var id = e.currentTarget.dataset.id;//获取到绑定的数据
      //跳转传值
      wx.navigateTo({
        // url: '/pages/zy/zy?id=' + id,
        url: '/pages/details/details',
      })
    },
    getUrl1: function (e) {
      // var id = e.currentTarget.dataset.id;//获取到绑定的数据
      //跳转传值
      wx.navigateTo({
        // url: '/pages/zy/zy?id=' + id,
        url: '/pages/zy/zy',
      })
    },

  }
})
