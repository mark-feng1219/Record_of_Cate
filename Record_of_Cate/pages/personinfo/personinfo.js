Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    head:"/images/member.png",
    icon_r: 'https://manager.diandianxc.com/mine/enter.png',
    sex:[
      {name:'0',value:'男',checked:'true'},
      {name:'1',value:'女'}
    ],
    isSex:"0",
    information:[],
    userSex:'',
    modalHidden:true
  },
  // 点击更换手机相册或者电脑本地图片   

  headimage: function () {
    var  _this = this;
     wx.chooseImage({
       count: 1,
       sizeType: ['original', 'compressed'],
       sourceType: ['album', 'camera'],

       success: function (res) {   
         _this.setData({
           head: res.tempFilePaths
        })
      }
    })
  },
  //单选按钮发生变化
  radioChange(e){
    console.log(e.detail.value);
    var sexName=this.data.isSex
    this.setData({
      isSex:e.detail.value
    })
  },
 // 图片显示
 buttonclick:function () {
  var that = this
  wx: wx.showActionSheet({
    itemList: ['拍照', '从手机相册选择'],
    itemColor: '',
    success: function (res) {
        wx.chooseImage({
          count: 1,//最多选2张
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success (res) {
            console.log('res',res)
            const tempFilePaths = res.tempFilePaths
            that.setData({
              "info.licensePicUrls":tempFilePaths,
              imgShow:true
            })
          }
        })
    },
    fail: function (res) {
      console.log('取消',res.errMsg);
    },
    complete: function (res) {},
  })
},

//图片预览
previewImage(e) {
  const current = e.target.dataset.src  //获取当前点击的 图片 url
  wx.previewImage({
    current,
    urls: this.data.info.licensePicUrls
  })
},

  //表单提交
  formSubmit(e){
    console.log(e);
    var userSex=this.data.isSex==0?'男':'女';
    var information= e.detail.value;
    console.log(userSex);
    this.setData({
      information: information,
      userSex,
      modalHidden:false
    });
  },
 
  //模态框取消
  modalCancel(){
    wx.showToast({
      title: '取消提交',
      icon:'none'
    })
    this.setData({
      modalHidden:true,
    })
  },
  //模态框确定
  modalConfirm() {
    wx.showToast({
      title: '提交成功',
      icon:'success'
    })
    this.setData({
      modalHidden: true
    })
  },
  onLoad: function (options) {
  
  }
})