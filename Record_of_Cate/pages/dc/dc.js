Page({
  data: {
    shareshow: false,
    food:''
  },


  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '食珍录-帮我点餐'
    });

  },

  onShow: function() {

  },
  
  share:function(){
    var paths = new Array("/images/食物1.jpg","/images/食物2.jpg","/images/推荐1.jpg","/images/推荐2.jpg","/images/推荐3.jpg","/images/推荐4.jpg","/images/推荐1.jpg","/images/推荐2.jpg","/images/推荐3.jpg","/images/推荐4.jpg",);
    var that = this;
    var shareshow = that.data.shareshow ;
    var i = Math.floor(Math.random()*10);
    var food = paths[i];
    that.setData({
      food:food,
      shareshow: !that.data.shareshow
    })
  }
})