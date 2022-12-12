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
    if(!this.data.shareshow){           //如果框中没有内容
    this.request_recommend().then(async(res)=>{
      this.setData({
        food:res.data,
        shareshow: !this.data.shareshow
      })
    })}else{                            //如果框中有内容,则清空掉
      this.setData({
        food:'',
        shareshow: !this.data.shareshow
      })
    }
  },
   //请求后端获取点餐选择
   request_recommend:function(){            //从数据库里随机,不用用户的openid
    return new Promise(function(resolve,reject){
      wx.request({
        url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/recommend/order_for_me',
        header: { 'content-type': 'application/json' },
        success: (res) => {resolve(res);console.log('点餐推荐:',res)},
        fail: function() {console.log('failure')},
      })})}
})