// pages/grant/grant.js

const app = getApp();
const APP_ID = '';//输入小程序appid
const APP_SECRET = '';//输入小程序app_secret
var OPEN_ID = ''//储存获取到openid
var SESSION_KEY = ''//储存获取到session_key
var imageUrl = ''
var nickName = ''
var avatarUrl = ''
var gender = ''
var city = ''
var province = ''
var country = ''
var authorize = true;

/*var schoolArr = [];
var schoolnum = [];

var myPos = ['409', '407', '404'];
var myPosId = [];
var defaultMyPos = '福大6#409';
var defaultMyPosId = '1'*/

Page({
  data: {

    isAgreement: false, // 是否显示用户协议

    submitBtn: false // 是否允许投稿


  },
  
 /* getPhoneNumber:function(e){
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function (res) { }
      })
    }

  },*/

  onGotUserInfo: function (e) {
    var that = this;
    if (e.detail.userInfo != null) {    //用户点击允许授权
      imageUrl = e.detail.userInfo.avatarUrl,
      nickName = e.detail.userInfo.nickName,
      avatarUrl = e.detail.userInfo.avatarUrl,
      gender = e.detail.userInfo.gender,
      city = e.detail.userInfo.city,
      province = e.detail.userInfo.province,
      country = e.detail.userInfo.country,
      authorize = true;
      /*console.log(nickName),
      console.log(imageUrl),
      console.log(avatarUrl),
      console.log(gender),
      console.log(city),
      console.log(province),
      console.log(country),*/

      wx.setStorageSync('nickName', nickName);
      wx.setStorageSync('imageUrl', imageUrl);
      wx.setStorageSync('gender', gender);
      wx.setStorageSync('country', country);
      wx.setStorageSync('province', province);
      wx.setStorageSync('city', city);
      wx.setStorageSync('phone', '12345678900');

      wx.request({
        url: 'http://120.77.32.233/print/user/update',
        data: {
          phone: "123456789",
          nickName: nickName,
          avatarUrl: avatarUrl,
          gender: gender,
          city: city,
          province: province,
          country: country,
        },
        header: {
          'Content-Type': 'application/json',
          'cookie': wx.getStorageSync("sessionid")//读取cookie
        },
        method: 'POST',
        success: function (res) {
          //服务器返回数据null
          console.log(res.data);
        }
      })  

      wx.switchTab({
        url: '../show/show'
      });

    }
    else {
      wx.switchTab({
        url: '../grant/grant'
      });
    }
    
  },

  /**
  
  * 生命周期函数--监听页面加载
  
  */

  onLoad: function (options) {

  },

  onLaunch: function () {
    
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

  },

  showAgreement: function () {

    let that = this;

    if (that.data.isAgreement) {

      that.setData({

        isAgreement: false

      });

    } else {

      that.setData({

        isAgreement: true

      });

    }

  },

  // 同意用户协议

  agreeMent: function (event) {

    let that = this;

    if (event.detail.value == "true") {

      that.setData({

        submitBtn: false

      });

    } else {
      that.setData({
        submitBtn: true
      });
    }
  },
})