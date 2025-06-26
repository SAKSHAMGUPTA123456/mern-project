const {z}=require('zod')
const loginschema=z.object({
    email:z
    .string({required_error:"email is required"})
    .trim()
    .min(3,({message:"atleast 3 words there in email"}))
    .max(255,({message:"maximum 255 words should be there in email"})),
     password:z
    .string({required_error:"password is required"})
    .trim()
    .min(3,({message:"atleast 3 words in password required"}))
    .max(255,({message:"maximum 255 words should be there in password"})),
})
module.exports=loginschema