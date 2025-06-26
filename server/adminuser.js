const User=require('./user-model')
const adminuser=async(req,res)=>{
    const fg=await User.find().select({
        password:0
    })
    if(!fg || fg.length==0){
        return res.status(400).json({mssg:"no users currently"})
    }
return res.status(200).json({mssg:fg})
}
module.exports=adminuser