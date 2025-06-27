const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');
const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
      email:{
        type:String,
        required:true
    },
     phone:{
        type:String,
        required:true
    },
     password:{
        type:String,
        required:true
    },
       isadmin:{
        type:Boolean,
        required:true
    },
})
userschema.methods.checkingpassword=async function(password){
  return bcrypt.compare(password,this.password)
}
userschema.pre('save',async function(next){
if(!this.isModified('password')){
    return next()
}
else{
    const salting=await bcrypt.genSalt(10)
    const secure=await bcrypt.hash(this.password,salting)
    this.password=secure
    next()
}
})


userschema.methods.generatetoken = async function () {
  return jwt.sign(
    {
      id: this._id.toString(),
      email: this.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};
const User=mongoose.model('realdatabasehavingusersdetails',userschema)
module.exports=User