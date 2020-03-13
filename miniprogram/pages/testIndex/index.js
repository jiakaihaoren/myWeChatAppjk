// miniprogram/pages/testIndex/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperArr:[1,2,3,4,5],
    swiperUrl:"cloud://jkwechatcloud-love.6a6b-jkwechatcloud-love-1301545069/jkzzj/swiperImg/swiper",
    inputValue:'',
    sayContent:''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSay();
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

  /**
   * 绑定用户输入
   */
  bindKeyInput: function(e){
    this.setData({
      inputValue: e.detail.value
    })
  },

  /**
   * 绑定点击保存事件
   */
  onTap: function(){
    this.updataSay(this.data.inputValue);
  },

  /**
   * 更新jkzzj数据库say的content
   */
  updataSay: function(value){
    // 更新只能调用云函数
    wx.cloud.callFunction({
      // 云函数名称
      name: 'updateJkzzjSay',
      // 传给云函数的参数
      data: {
        "dbName":"jkzzj",
        "content":value
      },
    })
    .then(res => {
      if (res&&res.result&&res.result.stats&&typeof res.result.stats.updated === "number") {
        wx.showToast({
          title: '保存成功',
        });
        this.getSay();
      }else{
        wx.showToast({
          title: '保存失败',
        })
      }
    })
    .catch(console.error)
  },

  /**
   * 获取say的content
   */
  getSay: function(){
    const db = wx.cloud.database();
    db.collection('jkzzj').where({"name":"say"}).get({
      success: res => {
        console.log('[数据库] [查询记录] 成功: ', res.data[0].content);
        this.setData({
          sayContent:res.data[0].content
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    });
  }
})