const User=require('../user-model')
const Service=require('../servicemodel')
const Contact=require('../messagemodel')
const home=async(req,res)=>{
const {username,email,phone,password}=req.body
const userexist=await User.findOne({email})
if(userexist){
   return  res.status(400).json({mssg:"email already exist pls go to login page"})
}
const userinformation=await User.create({username,email,phone,password,isadmin:false})
res.status(200).json({massg:"new user created",details:userinformation,token:await userinformation.generatetoken()})
}

const login=async(req,res)=>{
   const {email,password}=req.body
   const userexist=await User.findOne({email})
   if(!userexist){
      res.status(400).json({mssg:"you had not logged in"})
   }
   const verifying=await userexist.checkingpassword(password)
   if(verifying){
      return res.status(200).json({mssg:'login successfull',details:userexist,token:await userexist.generatetoken()})
   }
   else{
      return res.status(400).json({mssg:"invalid password"})
   }
}


const service=async(req,res)=>{
  const users=await Service.find()
  if(!users){
   res.status(200).json({message:"no service available till now"})
  }
  res.status(200).json({details:users})
}

const user=async(req,res)=>{
const gh=req.user
console.log(gh)
res.status(200).json({details:gh})
}



const message=async(req,res)=>{
const {username,email,message}=req.body

const messaging=await Contact.create({username,email,message})
res.status(200).json({mssg:messaging})
}

module.exports={home,login,service,user,message}