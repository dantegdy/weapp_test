// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:"test02-6go32tlo09cffde9"
})

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection("users").get()
}