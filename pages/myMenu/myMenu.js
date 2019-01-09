// pages/myMenu/myMenu.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    myMenu:[],

    hiddenmodalOrder:true,
    catchTabItem:[],
    catchTabValue:'',
    hasDelivery:'',

  },

  look:function(e){
    if (e.currentTarget.dataset.name.hasDelivery === false) {
      this.setData({
        hasDelivery: '不配送',
      })
    }
    else if (e.currentTarget.dataset.name.hasDelivery === true) {
      this.setData({
        hasDelivery: '配送',
      })
    }
    this.setData({
      catchTabItem: e.currentTarget.dataset.name,
      catchTabValue: e.currentTarget.dataset.value,
      hiddenmodalOrder: false,
    })
  },

  /*订单项的点击事件*/
  myMenuTop:function(e){
    if (e.currentTarget.dataset.name.hasDelivery === false) {
      this.setData({
        hasDelivery:'不配送',
      })
    }
    else if (e.currentTarget.dataset.name.hasDelivery === true) {
      this.setData({
        hasDelivery: '配送',
      })
    }
    this.setData({
      catchTabItem: e.currentTarget.dataset.name,
      catchTabValue: e.currentTarget.dataset.value,
      hiddenmodalOrder: false,
    })
    
  },

  cancel:function(){
    this.setData({
      hiddenmodalOrder: true,
    })
  },

  confirm:function(){
    if (!this.data.catchTabItem.haspay){
      //调用支付接口
      /*var id = this.data.catchTabItem.id;
      //跳转支付界面
      wx.request({
        url: 'http://120.77.32.233/print/pay/order/' + id,

        header: {
          'Content-Type': 'application/json',
          'cookie': wx.getStorageSync("sessionid")//读取cookie
        },
        method: 'POST',
        success: function (res) {
          console.log(res);
          wx.requestPayment(
            {
              'timeStamp': res.data.data.timeStamp,
              'nonceStr': res.data.data.nonceStr,
              'package': res.data.data.package,
              'signType': res.data.data.signType,
              'paySign': res.data.data.paySign,
              'success': function (succ) {
                console.log(succ);
              },
              'fail': function (err) {
                console.log(err);
              },
            }
          )
        }
      })*/
    }
    this.setData({
      hiddenmodalOrder: true,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.myMenu=getApp().globalData.myMenu;
    this.setData({
      myMenu: this.data.myMenu
    });
    console.log(getApp().globalData.myMenu);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  updateMyMenu: function () {
    this.setData({
      myMenu: app.globalData.myMenu,
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that=this;
    wx.request({
      url: 'http://120.77.32.233/print/order/list/' + getApp().globalData.myMenuNum,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      success: function (res) {
        app.globalData.myMenu = app.globalData.myMenu.concat(res.data.data);
        app.globalData.myMenuNum = getApp().globalData.myMenuNum + 1;
        that.updateMyMenu();
        
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })

  },

  

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    wx.request({
      url: 'http://120.77.32.233/print/order/list/' + getApp().globalData.myMenuNum,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      success: function (res) {
        app.globalData.myMenu = app.globalData.myMenu.concat(res.data.data);
        app.globalData.myMenuNum = getApp().globalData.myMenuNum + 1;
        that.updateMyMenu();
        
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})