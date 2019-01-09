// pages/mine/mine.js
//获取应用实例
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: wx.getStorageSync('nickName'),
    headerUrl: wx.getStorageSync('imageUrl'),
  },

  //我的信息点击事件
  myInformation:function(){
    wx.navigateTo({//页面跳转myInformation
      url: '/pages/myInformation/myInformation',
    })
  },

  //我的地址点击事件
  myPosition:function(){
    wx.navigateTo({//页面跳转myPosition
      url: '/pages/myPosition/myPosition',
    })
  },

  //我的订单点击事件
  myMenu:function(){
    app.globalData.myMenuNum=1;
    wx.request({
      //获取openid接口
      url: 'http://120.77.32.233/print/order/list/' + getApp().globalData.myMenuNum,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      success: function (res) {
        app.globalData.myMenu = res.data.data;
        console.log(res.data.data);
        app.globalData.myMenuNum = getApp().globalData.myMenuNum+1;
        wx.navigateTo({//页面跳转myMenu
          url: '/pages/myMenu/myMenu',
        })
      }
    })  
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nickName: wx.getStorageSync('nickName'),
      headerUrl: wx.getStorageSync('imageUrl'),
    });
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})