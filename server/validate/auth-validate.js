const validate=(schema)=>async function(req,res,next){
try{
const check=await schema.parseAsync(req.body)
req.body=check
next()
}catch(error){
    next(error)
}
}
module.exports=validate