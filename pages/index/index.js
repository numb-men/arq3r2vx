//index.js
//获取应用实例
const app = getApp()

//学校信息数据
var schoolArr = getApp().data.schoolArray;
var schoolIdArr = getApp().data.schoolId;

//我的地址数据
var mypos = getApp().data.myPosition;
var myposId = getApp().data.myPositionId;
var defaultPosition = getApp().data.defaultMyPosition;
var defaultPositionId = getApp().data.defaultMyPositionId;

//默认地址
var defaultPos='';
var defaultPosId='';


Page({
  data: {
    //轮播图组件的数据
    imgUrls: [
      '/images/1.jpg',
      '/images/2.jpg',
      '/images/3.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,

    //日期选择的数据
    date: '2018-09-01',

    //时间选择器的数据
    time: '12:00',

    //学校数据信息
    schoolArray: schoolArr,
    schoolId:schoolIdArr,
    schoolIndex: 0,
    //被选择的学校和ID用数组加schoolIndex来取

    //打印店信息
    printShopPos: '',
    printIdNum: '',
    isSend:'false',
    hiddenPrintPos:true,

    //收件人姓名
    name:'',

    //收件人手机号码
    phone:'',

    //存储页数
    pageNum:0,

    //我的地址
    myposArray: mypos,
    myposIdArray: myposId,
    defauleMyPosition: defaultPosition,
    defauleMyPositionId: defaultPositionId,
    //最终选择的默认地址
    posSelected: defaultPosition,
    posIdSelected: defaultPositionId,
    myPositionIndex:0,

    //可以通过hidden是否掩藏要不要配送的属性，来指定那个弹出框  
    hiddenmodalput: true,
    sendSelect:'不配送',  

    //是否显示选择我的地址（配送地址）
    hiddenSelectMyPos:true,
  },
  //事件处理函数

  //添加文件事件
  addFile:function(){
    wx.navigateTo({//页面跳转upload
      url: '/pages/upload/upload',
    })
  },

  //收件人姓名输入框事件
  humanName: function (e) {
    console.log('姓名input发送选择改变，携带值为', e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },

  //收件人手机号输入框事件
  humanPhone: function (e) {
    console.log('手机号input发送选择改变，携带值为', e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },

  //取件日期改变事件
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  //取件时间改变事件
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  //学校改变事件
  bindPickerChangeSchool: function (e) {
    this.setData({
      schoolIndex: e.detail.value,
    });
    //console.log('picker发送选择改变，携带值为', e.detail.value);
    //console.log('picker发送选择改变，携带值为', this.data.schoolPos)
    //console.log(this.data.positionUrl)
    //console.log(this.data.schoolIdSelected);
  },

  //选择收件地址按钮的监听事件
  takeFilePosition:function(){
    this.setData({
      hiddenPrintPos: false
    })
    //请求学校打印店位置信息
    wx.request({
      url: 'http://120.77.32.233/print/shop/list/' + this.data.schoolId[this.data.schoolIndex],
      method: 'POST',
      header:{
        'content-type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      success: function (res) {
        //服务器返回打印店位置数据
        var posTemp = [];
        var posTempId = [];

        //需要获取是否支持配送的信息
        var posSend=[];
        for (var n in res.data.data) {
          posTemp[n] = res.data.data[n].address;
          posTempId[n] = res.data.data[n].id;
          posSend[n] = res.data.data[n].distribution;
          console.log(posTemp[n]);
          //console.log(posTempId[n]);
        }

        app.globalData.positionArray = posTemp;
        app.globalData.positionId = posTempId;
        app.globalData.sendServce = posSend;

        //wx.setStorageSync(positionArray, posTemp);
        //wx.setStorageSync(positionId, posTempId);

        wx.navigateTo({//页面跳转selectPosition
          url: '/pages/selectPosition/selectPosition'
          //?positionArray=' + positionArray + '&positionId=' + positionId,
        })
      }
    })

    

  },


  //不需要配送按钮  
  cancel: function () {
    this.setData({
      sendSelect:'不配送',
      hiddenmodalput: true
    });
  },
  //需要配送按钮  
  confirm: function () {
    //显示我的地址
    this.setData({
      sendSelect:'要配送',
      hiddenSelectMyPos:false,
      hiddenmodalput: true
    })
  },

  //选择我的地址
  selectMyPosition:function(e){
    
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      myPositionIndex: e.detail.value,
    })
    
  },

  //选择地址取消事件
  cancelMyPosition:function(){
    //请求我的默认地址
    wx.request({
      url: 'http://120.77.32.233/print/address/get/default',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")//读取cookie
      },
      success: function (res) {
        //服务器返回默认地址数据信息
        console.log('defaultPosition')
        console.log(res.data);
        defaultPos = res.data.data.address;
        defaultPosId = res.data.data.id;
        console.log(defaultPos);
      }
    })
    
    this.setData({
      hiddenSelectMyPos: true,
    })
  } ,

  //选择地址确定事件 
  confirmMyPositio:function(){
    defaultPos= this.data.myposArray[this.data.myPositionIndex];
    this.setData({
      hiddenSelectMyPos: true,
    })
  },

  //下一步按钮的监听事件事件
  nexPagetButton:function(){
    this.setData({
      posSelected: defaultPos,
      pageNum: app.globalData.filePage,
    })

    //数据存入本地缓存
    wx.setStorageSync('humanName',this.data.name);
    wx.setStorageSync('humanPhone', this.data.phone);
    wx.setStorageSync('takeDate',this.data.date);
    wx.setStorageSync('takeTime',this.data.time);
    wx.setStorageSync('schoolName', this.data.schoolArray[this.data.schoolIndex]);
    wx.setStorageSync('positionName', this.data.printShopPos);
    wx.setStorageSync('pageNum', this.data.pageNum);
    wx.setStorageSync('myPosition', this.data.posSelected);
    wx.setStorageSync('sendSelect', this.data.sendSelect);
    console.log(this.data.pageNum);

    //是否请求接口存数据
    wx.navigateTo({//页面跳转printAttribution
      url: '/pages/printAttribution/printAttribution'
    })
  },

  onLoad:function(options){
    console.log('index');
    this.setData({
      schoolArray : getApp().data.schoolArray,
      schoolId : getApp().data.schoolId,
    })
    /*for (var j in getApp().globalData.schoolArray) {
      console.log(getApp().globalData.schoolArray[j]);
      console.log(getApp().globalData.schoolId[j]);
    }*/
    for (var j in this.data.schoolArray) {
      console.log(this.data.schoolArray[j]);
      console.log(this.data.schoolId[j]);
    }

    if (options != null && app.globalData.filemask && (options.page != undefined)){
      console.log(options.id);
      console.log(options.userId);
      console.log(options.size);
      console.log(options.name);
      console.log(options.page);
      app.globalData.fileId = options.id;
      app.globalData.fileName = options.name;
      app.globalData.fileSize = options.size;
      app.globalData.userId = options.userId;
      app.globalData.filePage = parseInt(options.page);
      app.globalData.filemask=false;
    }
  },

  onShow: function () {
    if (getApp().globalData.isPrintPos==='true'){
      this.setData({
        printShopPos:getApp().globalData.printPosition,
        printIdNum:getApp().globalData.printShopId,
        isSend: getApp().globalData.isSend,
        hiddenmodalput: !getApp().globalData.isSend,
      })
      app.globalData.isPrintPos = 'false';
    }
    
  },
 
})
