// conponents/history.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
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
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

