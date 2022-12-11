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
  onSearch(e){                //敲下回车触发搜索
    console.log(e.detail)
    this.setData({
      key_words:e.detail,
      cardTeams:[]       //避免用户连续搜索导致追加写
    })
    this.request_note().then(async(res)=>{
      this.setData({
        image_array:res.data['note_image'],
        note_id_array:res.data['note_id'],
        title_array:res.data['note_title'],
        publisher_head_array:res.data['publisher_head'],
        publisher_name_array:res.data['publisher_name'],
        publisher_id_array:res.data['note_publisher_id']
      })
      for(var j=0;j<this.data.note_id_array.length;j++){
        var tmp_dict={}
        tmp_dict['imgsrc'] = this.data.image_array[j]
        tmp_dict['Head_picture'] = this.data.publisher_head_array[j]
        tmp_dict['count'] = this.data.publisher_name_array[j]
        tmp_dict['name'] = this.data.title_array[j]
        tmp_dict['note_id'] = this.data.note_id_array[j]
        tmp_dict['publisher_id'] = this.data.publisher_id_array[j]
        this.data.cardTeams.push(tmp_dict)
      }
      this.setData({cardTeams:this.data.cardTeams})
      if(this.data.cardTeams==[]){this.setData({exist:false})}  //如果没有任何跟关键词有关的笔记时触发
      else{this.setData({exist:true})}                          //如果有任何跟关键词有关的笔记时触发
    })
  },
   //请求后端获取跟关键词有关的内容
   request_note:function(){
    var that = this
    return new Promise(function(resolve,reject){
    wx.request({
    url: 'https://flask-ddml-18847-6-1315110634.sh.run.tcloudbase.com/note/search',
    data: {
      key_words:that.data.key_words
    },
    header: { 'content-type': 'application/json' },
    success: (res) =>{resolve(res);console.log('获取笔记数据：',res)},
    fail: function() {console.log('failure')},
    })})
  },
  //跳转至详情页
  getUrl: function (e) {    //注意不要写options和console.log(options)
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/details/details?note_id='+e.currentTarget.dataset['note_id']+'&title='+e.currentTarget.dataset['title']+'&name='+e.currentTarget.dataset['publisher']+'&cover_image='+ e.currentTarget.dataset['cover_image']+'&user_head='+e.currentTarget.dataset['user_head']+'&publisher_id='+e.currentTarget.dataset['publisher_id'],
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
})