// pages/myPosition/myPosition.js

//获取应用实例
const app = getApp()

var schoolArr = getApp().data.schoolArray;
var schoolIdArr = getApp().data.schoolId;

var myPositionArr = getApp().data.myPosition;
var myPositionIdArr = getApp().data.myPositionId;
var defaultMyPosition = getApp().data.defaultMyPosition;
var defaultMyPositionId = getApp().data.defaultMyPositionId;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图组件的数据
    imgUrls: [
      '/images/11.jpg',
      '/images/dataSchool7.png',
      '/images/one_page.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,

    //我的地址列表信息
    myPositionsList: myPositionArr,
    myPositionsIdList: myPositionIdArr,
    defaulePosition: defaultMyPosition,
    defaulePositionId: defaultMyPositionId,

    changePositionName:'',
    changePositionId:'',
    hiddenClickList:true,

    //区别默认地址与普通地址
    isChecked:false,

    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
    hiddenmodalput: true,
    mySchoolIndex: 0,
    mySchoolArray: schoolArr,
    mySchoolId: schoolIdArr,
    myDetailPosition:'',
    index:0,
  },


  //列表点击事件
  modelpop:function(e){
    //console.log(e.currentTarget.dataset.value);
    //console.log(this.data.myPositionsIdList[e.currentTarget.dataset.value]);
    this.setData({
      changePositionName: e.currentTarget.dataset.name,
      changePositionId: e.currentTarget.dataset.value,
      hiddenClickList:false,
    })
  },

  defaultconfirm:function(){
    this.setData({
      isChecked: true,
      hiddenClickList:true
    })
    //修改默认地址，请求接口
    wx.request({
      url: 'http://120.77.32.233/print/address/update/default/' + myPositionIdArr[this.data.changePositionId],
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      method: 'POST',
      success: function (res) {
      }
    })
    console.log('用户点击确定');
    
  },

  defaultcancel:function(){
    this.setData({
      hiddenClickList: true,
    })
  },

 /* //我的地址选择组件变化事件
  selectMyPosition:function(){
    //设置全局变量在app.js中访问后台获取已经存入的地址，问题是如何更新新添加的地址
    //将选择的值存入缓存中做为默认的地址或者后台一个接口专门存默认地址需要时再去访问，也是在改变事件中处理
  },*/

  //查看默认地址事件
  checkDefaultPosition:function(){
    wx.request({
      url: 'http://120.77.32.233/print/address/get/default',
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data.data.address);
        wx.showModal({
          title: '我的默认地址',
          content: res.data.data.address,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })

      }
    })
  },

  //添加地址按钮的监听事件
  addPosition:function(){
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    }) 
    /*wx.navigateTo({//页面跳转addmyPosition
      url: '/pages/addmyPosition/addmyPosition',
    })*/
  },

  //选择我的学校
  selectMySchool:function(e){
    //console.log('我的学校'+e.detail.value);
    this.setData({
      mySchoolIndex: e.detail.value,
    });
    console.log('我的学校' + this.data.mySchoolArray[this.data.mySchoolIndex]);
    //console.log('我的学校Id' + this.data.mySchoolId[this.data.mySchoolIndex]);
  },

  //我的详细地址
  myDetailPosition:function(e){
    console.log('姓名input发送选择改变，携带值为', e.detail.value)
    this.setData({
      myDetailPosition: e.detail.value
    })
  },

  //取消
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    //将地址通过接口存入,访问接口
    var myPosition = this.data.mySchoolArray[this.data.mySchoolIndex] + this.data.myDetailPosition;
    if (myPosition===null){

    }
    else{
      console.log(myPosition);
      wx.request({
        url: 'http://120.77.32.233/print/address/add',
        data:{
          address: myPosition
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'cookie': wx.getStorageSync("sessionid")//读取cookie
        },
        method: 'POST',
        success: function (res) {
          
          //请求我的地址信息
          wx.request({
            url: 'http://120.77.32.233/print/address/list',
            method: 'POST',
            header: {
              'Content-Type': 'application/json',
              'cookie': wx.getStorageSync("sessionid")//读取cookie
            },
            success: function (res) {
              //服务器返回我的地址数据信息
              console.log('position');
              console.log(res.data);
              for (var j in res.data.data) {
                myPositionArr[j] = res.data.data[j].address;
                myPositionIdArr[j] = res.data.data[j].id;
              }
              app.globalData.myPosition = myPositionArr;
              app.globalData.myPositionId = myPositionIdArr;

              wx.showToast({
                title: '成功',
                icon: 'succes',
                duration: 1000,
                mask: true
              });

              wx.switchTab({//页面跳转mine
                url: '/pages/mine/mine',
              })
              
            }
          })
        }
      })
    }
    //console.log(myPosition);

    //访问接口取出所有地址，更新全局变量，更新myPositionArr进而更新myPositionsList
    this.setData({
      hiddenmodalput: true
    })
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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