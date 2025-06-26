const mongoose = require('mongoose')

const uri=process.env.MONGO

const connectdb=async()=>{
try{
await mongoose.connect(uri)
console.log('database connected successfully')
}catch(error){
    console.log(error)
}
}
module.exports=connectdb