Page({
  data:{
    imgUrl:"",
    videoUrl:""
  },

  //上传excel文件
  uploadExcel(){
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles
        console.log(tempFilePaths[0].path)
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+".xls",//上传至云端路径
          filePath: tempFilePaths[0].path,//小程序临时文件路径
          success: res => {
            //返回文件ID
            console.log("上传Excel成功",res.fileID)
            
          },
          fail: console.error
        })
      }
    })
  },
  //上传视频
  uploadVideo(){
    wx.chooseVideo({
      sourceType: ['album'],
      maxDuration: 60,//视频时长 单位秒
      camera: 'back',
      success(res) {
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+".mp4",//上传至云端路径
          filePath: res.tempFilePath,//小程序临时文件路径
          success: res => {
            //返回文件ID
            console.log("上传成功",res.fileID)
            this.setData({
              videoUrl:res.fileID
            })
          },
          fail: console.error
        })
      }
    })
  },
  //上传文件
  upload() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        // console.log(String(tempFilePaths[0]))
        that.uploadImg(tempFilePaths[0])
      }
    })


  },
  uploadImg(fileUrl) {
      wx.cloud.uploadFile({
      cloudPath: new Date().getTime()+"png",//上传至云端路径
      filePath: fileUrl,//小程序临时文件路径
      success: res => {
        //返回文件ID
        console.log("上传成功",res.fileID)
        this.setData({
          imgUrl:res.fileID
        })
      },
      fail: console.error
    })
  }
})