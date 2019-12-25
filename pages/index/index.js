const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    DFrames: {
      layOut: [
        { imgUrl: "https://www.gfcamps.cn/sun/xsq.png", text: "限时抢", route: "../indexdetail/indexdetail?id=7" },
        { imgUrl: "https://www.gfcamps.cn/sun/1yg.png", text: "1元购", route: "../indexdetail/indexdetail?id=8" },
        { imgUrl: "https://www.gfcamps.cn/sun/xptj.png", text: "新品特价", route: "../indexdetail/indexdetail?id=9" },
        { imgUrl: "https://www.gfcamps.cn/sun/ggzx.png", text: "公告中心", route: "../indexdetail/indexdetail?id=14" },
        { imgUrl: "https://www.gfcamps.cn/sun/jyjx.png", text: "教育教学", route: "../indexdetail/indexdetail?id=10" },
        { imgUrl: "https://www.gfcamps.cn/sun/jyzb.png", text: "教育周边", route: "../indexdetail/indexdetail?id=11" },
        { imgUrl: "https://www.gfcamps.cn/sun/xsnc.png", text: "绿色农场", route: "../indexdetail/indexdetail?id=12" },
        { imgUrl: "https://www.gfcamps.cn/sun/jkys.png", text: "健康养生", route: "../indexdetail/indexdetail?id=13" },
      ]
    },
    navScrollLeft: 0,
    name: '',
    imgUrls: [],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    recommend: [],
    hotrec: []
  },

  onShow: function () {
    this.initCert();
    this.initData1();
  },

  goto(ev) {
    let route = ev.currentTarget.dataset.route;
    if (route) {
      wx.navigateTo({
        url: route,
      })
    }
  },

  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })

    this.initData1();
  },

  initData1: function () {
    var page = this;
    wx.request({
      url: 'https://www.hattonstar.com/getIndexset',
      data: {
        shop_id: app.globalData.shop_id
      },
      method: 'POST',
      success: function (res) {
        var imgUrls = [];
        for (var i in res.data.lunbo) {
          var object = new Object();
          object.url = 'https://www.hattonstar.com/storage/' + res.data.lunbo[i].title_pic;
          object.link = '../detail/detail?id=' + res.data.lunbo[i].id;
          imgUrls[i] = object;
        }
        var recommend = [];
        for (var i in res.data.good) {
          var object = new Object();
          object.url = 'https://www.hattonstar.com/storage/' + res.data.good[i].title_pic;
          object.title = res.data.good[i].name;
          object.price = res.data.good[i].price + '元';
          object.id = res.data.good[i].id;
          recommend[i] = object;
        }
        var hotrec = [];
        for (var i in res.data.week) {
          var object = new Object();
          object.url = 'https://www.hattonstar.com/storage/' + res.data.week[i].title_pic;
          object.title = res.data.week[i].name;
          object.price = res.data.week[i].price + '元';
          object.id = res.data.week[i].id;
          hotrec[i] = object;
        }
        page.setData({
          imgUrls: imgUrls,
          recommend: recommend,
          hotrec: hotrec
        });
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

  onPullDownRefresh: function () {
    this.initData1();
  },


  recommendGood: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    });
  },

  hotrecGood: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    });
  },

  accountInput: function (e) {
    var content = e.detail.value;
    this.setData({ name: content });
  },

  resetSearch: function () {
    var name = this.data.name;
    if (this.data.name == '') {
      wx.showModal({
        title: '搜索条件为空',
        content: '请输入关键字!',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      });
      return;
    }
    wx.navigateTo({
      url: '../search/search?name=' + name
    });
  },
  
  initCert: function () {
    var that = this;
    wx.request({
      url: 'https://www.hattonstar.com/getCertsNum',
      data: {
        wx_id: app.globalData.wx_id
      },
      method: 'POST',
      success: function (res) {
        var num = res.data;
        if (num) {
          var numString = num + ""
          wx.setTabBarBadge({
            index: 1,
            text: numString
          })
        } else {
          wx.removeTabBarBadge({
            index: 1,
          })
        }
      },
      fail: function (res) {
      }
    })
  }
})