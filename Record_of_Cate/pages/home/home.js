var app = getApp() 
Page({ 
 data: { 
 navbar: ['关注', '推荐', '附近'], 
 currentTab: 0 
 }, 
 navbarTap: function(e){ 
 this.setData({ 
 currentTab: e.currentTarget.dataset.idx 
 }) 
 } 
}) 
