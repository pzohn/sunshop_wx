var app = getApp()
Page({
  data: {
    
  },

  onLoad: function (options) {
    var id = options.id;
    this.initData(id);
  },

  initData: function (id) {
    var page = this;
    wx.request({
      url: 'https://www.hattonstar.com/shoppingGetById',
      data: {
        id: id
      },
      method: 'POST',
      success: function (res) {
        var imgUrls = [];
        for (var i in res.data.data.shopping.lunbo) {
          var object = new Object();
          object = 'https://www.hattonstar.com/storage/' + res.data.data.shopping.lunbo[i];
          imgUrls[i] = object;
        }
        var classInfo = [];
        for (var j in res.data.data.shopping.detail) {
          var object = new Object();
          object = 'https://www.hattonstar.com/storage/' + res.data.data.shopping.detail[j];
          classInfo[j] = object;
        }
        page.setData({
          title: res.data.data.shopping.name,
          imgUrls: imgUrls,
          classInfo: classInfo,
          price: res.data.data.shopping.price,
          gg_image: 'https://www.hattonstar.com/storage/' + res.data.data.shopping.title[0]
        });
        if (res.data.data.shopping.video != "") {
          page.setData({
            video_hide: true,
            video_url: 'https://www.hattonstar.com/storage/' + res.data.data.shopping.video[0]
          });
        }
        if (res.data.data.shopping.poster != "") {
          app.globalData.post_url = 'https://www.hattonstar.com/storage/' + res.data.data.shopping.poster[0];
        }

      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '服务器无响应，请联系工作人员!',
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        })
      }
    })
  },
})
