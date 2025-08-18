const mongoose=require('mongoose')
const paymentcourse=new mongoose.Schema({
    courseId:{
        type:String,
        required:true
    }
})

const payedcourses=mongoose.model('paymentcourses',paymentcourse)
module.exports=payedcourses