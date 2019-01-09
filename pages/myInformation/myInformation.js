// pages/myInformation/myInformation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    OPEN_ID : '',//储存获取到openid
    sex:'',
    imageUrl : '',//头像
    nickName : '',//微信名
    gender : '',//性别
    city : '',//城市
    province : '',//省份
    country : '',//国家
    phone:'',//电话号码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('gender')==='1'){
      this.data.sex='男';
    }
    else{
      this.data.sex = '女';
    }
    this.setData({
      nickName: wx.getStorageSync('nickName'),
      imageUrl: wx.getStorageSync('imageUrl'),
      OPEN_ID: wx.getStorageSync('openId'),
      gender: this.data.sex,
      city: wx.getStorageSync('city'),
      province: wx.getStorageSync('province'),
      country: wx.getStorageSync('country'),
      phone: wx.getStorageSync('phone'),
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