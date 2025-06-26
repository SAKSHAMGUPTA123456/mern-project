const jwt=require('jsonwebtoken')
const User=require('../user-model')
const checkinguser=async(req,res,next)=>{
const token=await req.header('Authorization')
if(!token){
    return res.status(400).json({mssg:"invalid token"})
}
const securetoken=await token.replace('Bearer',"").trim()
const isverify=await jwt.verify(securetoken,process.env.JWT_SECRET)
if(!isverify){
    return res.status(400).json({mssg:"user had not logged in"})
}
const userexist=await User.findOne({email:isverify.email})
req.user=userexist
next()
}
module.exports=checkinguser