const isadmin=async(req,res,next)=>{
    const using=req.user
   if(using.isadmin==false){
    return res.status(400).json({mssg:"you are not admin assigned by developer"})
   }
   next()
}
module.exports=isadmin