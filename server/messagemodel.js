const mongoose=require('mongoose')
const { Schema } = require('zod')
const { schema } = require('./user-model')
const { required } = require('./zodfile/registerzod')

const contactschema=new mongoose.Schema({
    username:{
type:String,
required:true
    },
       email:{
type:String,
required:true
    },
         message:{
type:String,
required:true
    },
})

const Contact=mongoose.model('messages',contactschema)
module.exports=Contact