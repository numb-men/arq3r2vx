// pages/selectPosition/selectPosition.js

//获取应用实例
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    posArr: getApp().globalData.positionArray,
    posId: getApp().globalData.positionId,
    posSend: getApp().globalData.sendServce,
    index:0,
  },


  //取件地点改变事件
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
    //console.log('picker发送选择改变，携带值为', this.data.printPosition)
    //console.log(this.data.ptintShopId);
  },


  //打印店选择确定按钮的事件
  positionSure:function(){
    app.globalData.printPosition = this.data.posArr[this.data.index];
    app.globalData.printShopId = this.data.posId[this.data.index];
    app.globalData.isPrintPos='true';
    app.globalData.isSend = this.data.posSend[this.data.index];
    console.log(app.globalData.printPosition);
    wx.navigateTo({//页面跳转index
      url: '/pages/index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      posArr:getApp().globalData.positionArray,
      posId: getApp().globalData.positionId,
      posSend: getApp().globalData.sendServce,
    })
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