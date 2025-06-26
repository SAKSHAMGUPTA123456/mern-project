const User=require('./user-model')
const Contact=require('./messagemodel')
const checkingadmin=async(req,res)=>{
return res.status(200).json({mssg:'welcome to admin page'})
}
const deleteuser=async(req,res,next)=>{
try{
const id=req.params.id
const deleteuser=await User.deleteOne({_id:id})
return res.status(200).json({mssg:"user deleted from  database"})
}catch(error){
    next(error)
}
}
const updateuser=async(req,res)=>{
const id= req.params.id
const gh=await User.findOne({_id: id})
return res.status(200).json({mssg:gh})
}
const updatinguser=async(req,res)=>{
try{
const id=req.params.id
const updateduserdata=req.body
const updateuser=await User.updateOne({_id:id},{
    $set:updateduserdata
})
res.status(200).json(updateuser)
}catch(error){
    next(error)
}
}
const contact=async(req,res)=>{
    const contactdatas=await Contact.find()
res.status(200).json({check:contactdatas})
}
const contactdelete=async(req,res)=>{
const takeid=req.params.id
const gh=await Contact.deleteOne({_id:takeid})
res.status(200).json({mssg:"user message deleted successfully"})
}
module.exports={checkingadmin,deleteuser,updateuser,updatinguser,contact,contactdelete}