const {z}=require('zod')


const registerschema=z.object({
username:z
.string({required_error:"username is required"})
.trim()
.min(3,{message:"atleast 3 words are required in username"})
.max(255,{message:"maxiumum 255 words can be there in username"}),
email:z
.string({required_error:"email is required"})
.trim()
.min(3,{message:"atleast 3 words are required in email"})
.max(255,{message:"maxiumum 255 words can be there in  email"}),
phone:z
.string({required_error:"phone is required"})
.trim()
.min(3,{message:"atleast 3 words are required in phone"})
.max(255,{message:"maxiumum 255 words can be there in phone"}),
password:z
.string({required_error:"password is required"})
.trim()
.min(3,{message:"atleast 3 words are required in password"})
.max(255,{message:"maxiumum 255 words can be there in password"}),
})
module.exports=registerschema