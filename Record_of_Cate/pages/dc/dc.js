Page({
  data: {
    shareshow: false
  },


  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '食珍录-帮我点餐'
    });

  },

  onShow: function() {

  },
  
  share:function(){
    var that = this;
    var shareshow = that.data.shareshow 
    that.setData({
      shareshow: !that.data.shareshow
    })
  }
})