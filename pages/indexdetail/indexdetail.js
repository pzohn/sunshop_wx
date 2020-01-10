const app = getApp()

Page({
  data: {
    activity: [],
    btn_type:'btn',
    info_flag: false
  },

  onShow: function () {
    
  },

  //事件处理函数
  onLoad: function (options) {
    var id = options.id
    this.initData(id);
    if (id == 14) {
      this.setData({ info_flag: true,
        btn_type:'btn_gonggao' })
    }else {
      this.setData({
        info_flag: false,
        btn_type: 'btn'
      })     
    }
  },

  initData: function (id) {
    var page = this;
    wx.request({
      url: 'https://www.hattonstar.com/shoppingGetByType',
      data: {
        type_id: id,
        shop_id: app.globalData.shop_id
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 0) {
          var activity = [];
          for (var index in res.data.data.shoppings) {
            var object = new Object();
            object.img = 'https://www.hattonstar.com/storage/' + res.data.data.shoppings[index].url;
            object.name = res.data.data.shoppings[index].name;
            object.id = res.data.data.shoppings[index].id;
            activity[index] = object;
          }
          page.setData({
            activity: activity
          });
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

  typeHandler: function (e) {
    var id = e.currentTarget.dataset.id;
    if (this.data.info_flag == false) {
      wx.navigateTo({
        url: '../detail/detail?id=' + id
      });
    }else {
      wx.navigateTo({
        url: '../detailinfo/detailinfo?id=' + id
      });
    }
  }
})