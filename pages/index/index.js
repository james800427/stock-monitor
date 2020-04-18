//index.js
//获取应用实例
Page({
  data: {
    cvsWidth: 0,
    cvsHeight: 0,
  },
  
  methods: {
    getElInfo: function(key, options){
      return new Promise(function(resolve, reject){
        const query = wx.createSelectorQuery()
        const nr = query.select(key).fields(options)
        query.exec(function(res){
          resolve(res)
        })
      })
    },
    draw: function(res, sysInfo){
      const canvas = res[0].node
      const w = res[0].width
      const h = res[0].height
      const dpr = sysInfo.pixelRatio
      canvas.width = w * dpr
      canvas.height = h * dpr
      const ctx = canvas.getContext('2d')
      ctx.scale(dpr, dpr)
      ctx.save()
      ctx.fillStyle = '#fff'
      ctx.fillText('bias指标', 0, 8)
      ctx.fillText('均价:', w - 50, 8)
      ctx.fillText('9:30', 0, h)
      ctx.fillText('15:00', w - 30, h)

      ctx.strokeStyle = '#666666'
      ctx.strokeRect(0, 10 , w, h - 20)
      ctx.moveTo(w/4, 10)
      ctx.lineTo(w/4, h-10)
      ctx.stroke()
      ctx.moveTo(w/2, 10)
      ctx.lineTo(w/2, h-10)
      ctx.stroke()
      ctx.moveTo(w*3 / 4, 10)
      ctx.lineTo(w*3 / 4, h-10)
      ctx.stroke()
      ctx.setLineDash([3, 3])
      ctx.lineDashOffset = 3
      ctx.moveTo(0, h/2)
      ctx.lineTo(w, h/2)
      ctx.stroke()

      ctx.fillStyle = '#f00'
      ctx.fillText('12.88', 1, 20)
      ctx.fillText('10%', w-23, 20)
      ctx.fillStyle = '#0f0'
      ctx.fillText('9.68', 1, h - 12)
      ctx.fillText('-10%', w-27, h - 12)

      ctx.restore()
      ctx.strokeStyle = '#ff0'
      ctx.beginPath()
      ctx.moveTo(1, h/2+30)
      ctx.lineTo(10, h/2)
      ctx.lineTo(30, h/2)
      ctx.lineTo(50, h/2 - 40)
      ctx.stroke()
    }
  },
  onReady: function(){
    console.log(this.data.userInfo)
    const sysInfo = wx.getSystemInfoSync()
    const that = this
    this.methods.getElInfo('#cvs', {node: true, size: true}).then(function(res){
      that.methods.draw(res, sysInfo)
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
