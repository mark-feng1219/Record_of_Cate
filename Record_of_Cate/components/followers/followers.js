// components/followers/followers.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    headportrait:{
      type: String,
      value:''
    },
    HomePage:{
      type: String,
      value:''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    pushs:[{
      "headportrait": "/images/头像1.jpg",
      "homepage": "/pages/zy/zy"
    },
    {
      "headportrait": "/images/头像.jpg",
      "HomePage": "/pages/zy/zy"
    },
    {
      "headportrait": "/images/头像2.jpg",
      "HomePage": "/pages/zy/zy"
    },
    {
      "headportrait": "/images/头像3.jpg",
      "HomePage": "/pages/zy/zy"
    },{
      "headportrait": "/images/头像4.jpg",
      "HomePage": "/pages/zy/zy"
    },{
      "headportrait": "/images/头像5.jpg",
      "HomePage": "/pages/zy/zy"
    },{
      "headportrait": "/images/头像6.jpg",
      "HomePage": "/pages/zy/zy"
    },{
      "headportrait": "/images/头像7.jpg",
      "HomePage": "/pages/zy/zy"
    },{
      "headportrait": "/images/头像8.jpg",
      "HomePage": "/pages/zy/zy"
    },{
      "headportrait": "/images/头像9.jpg",
      "HomePage": "/pages/zy/zy"
    },
  ],

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoHomePage: function (e)  {
      var url=e.currentTarget.dataset.url
        wx.navigateTo({
          url: url,
        })
    }

  }
})
