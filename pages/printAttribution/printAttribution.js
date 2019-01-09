// pages/printAttribution/printAttribution.js
//获取应用实例
const app = getApp();
var num=0;
var color=0;
var price=0;
var pagenum=0;
var fee=0;
var total=0;
var copies=1;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    //纸张大小
    pageSizeArray: ['A4', 'A3'],
    pageIndex: 0,

    //单双面
    simple_page: '单面打印',
    double_page: '双面打印',
    pageNumType: '单面打印',

    //黑白或彩色打印
    black_white_page: '黑白打印',
    coloured_page: '彩色打印',
    pageColor: '黑白打印',

    //份数
    copyNum:1,

    //备注
    remarks:'',

  },

  //纸张大小改变事件
  bindPageTypeChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pageIndex: e.detail.value,
    })
    console.log('picker发送选择改变，携带值为', this.data.pageSizeArray[this.data.pageIndex])
  },

  //单面或者双面的单选框改变事件
  PageNumRadioChange: function (e) {
    console.log('radio发送选择改变，携带值为', e.detail.value);
    if (e.detail.value === '0') {
      num = 0;
    }
    else {
      num = 1;
    }
    this.setData({
      pageNumType: e.detail.value
    })
  },

  //黑白或者彩印的单选框
  radioChangeColor: function (e) {
    console.log('radio发送选择改变，携带值为', e.detail.value);
    if (e.detail.value==='0'){
      color = 0;
    }
    else{
      color = 1;
    }
    
    this.setData({
      pageColor: e.detail.value
    })
  },

  //份数监听
  Copies:function(e){
    console.log('份数input发送选择改变，携带值为', e.detail.value)
    this.setData({
      copyNum: parseInt(e.detail.value)
    })
    copies=this.data.copyNum;
  },

  //备注监听
  beizhu:function(e){
    console.log('备注发送选择改变，携带值为', e.detail.value)
    this.setData({
      remarks: e.detail.value,
    })
  },

  //提交按钮监听事件
  submitMessage:function(){
    //调用接口提交信息（包括页数，返回费用）
    
    wx.setStorageSync('pageSize', this.data.pageSizeArray[this.data.pageIndex]);
    wx.setStorageSync('pageType', this.data.pageNumType);
    wx.setStorageSync('pageColor', this.data.pageColor);
    wx.setStorageSync('remarks', this.data.remarks);
    wx.setStorageSync('copyNum', this.data.copyNum);

    wx.request({
      url: 'http://120.77.32.233/print/property/get',
      data: {
        typePaper: this.data.pageSizeArray[this.data.pageIndex],
        hascolor: color,
        hasdouble: num,
      },
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      method: 'POST',
      success: function (res) {
        //服务器返回数据null
        console.log(res);
        wx.setStorageSync('propertyId', res.data.data.id);
        copies = parseFloat(copies);
        price = parseFloat(res.data.data.price);
        pagenum = parseFloat(app.globalData.filePage);
        console.log(res.data);
        //console.log(price);
        fee = copies * price * pagenum;
        total = fee.toFixed(2);
        console.log(copies);
        console.log(price);
        console.log(pagenum);

        console.log(total);
        wx.setStorageSync('fee', total);
        console.log(wx.getStorageSync('fee'));
        //跳转显示订单信息
        wx.navigateTo({//页面跳转orderSure
          url: '/pages/orderSure/orderSure'
        })
      }
    })

    //fee = price * this.data.copyNum;
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    copies=1;
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