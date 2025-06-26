const mongoose=require('mongoose')
const { required } = require('./zodfile/loginzod')
const serviceschema=new mongoose.Schema({
    service:{
        type:String,
        required:true
    },
     description:{
        type:String,
        required:true
    },
     price:{
        type:Number,
        required:true
    },
     provider:{
        type:String,
        required:true
    },
})

const Service=mongoose.model('services',serviceschema)
module.exports=Service