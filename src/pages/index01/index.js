//index.js
//获取应用实例
const app = getApp();
//使用云开发 数据库的person 表
const DB = wx.cloud.database().collection("person");

Page({
  data: {
   name:"",
   age:"",
   id:"",
  },
  //事件处理函数
  
  onLoad: function () {
    this.setData({
      name:"",
      age:"",
      id:"",
    })
  },
  //添加数据
  addData(){
    DB.add({
      data:{
        name:this.data.name,
        age:this.data.age,
      },
      success(res){
        console.log("添加成功",res)
      },
      fail(res){
        console.error("添加失败",res)
      }
    })
    this.onLoad()
  },
  //获取数据
  getData(){
    DB.get({
      success(res){
        console.log("查询成功",res.data)
      },
      fail(res){
        console.error("查询失败",res)
      },
    })
    this.onLoad()
  },
  //删除数据
  delData(){
    DB.doc(this.data.id).remove({
      success(res){
        console.log("删除成功",res)
      },
      fail(res){
        console.error("删除失败",res)
      },
    })
    this.onLoad()
  },
  //更新数据
  upData(){
    console.log("12")
    DB.doc(this.data.id).update({
      data:{
        age:this.data.age
      },
      success(res){
        console.log("更新成功",res)
      },
      fail(res){
        console.log("更新失败",res)
      }
    })
    this.onLoad()
  },
})
