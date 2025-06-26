const {z}=require('zod')

const contactzod=z.object({
       username:z
    .string({required_error:"message field is required"})
    .trim()
    .min(1,{message:"atleast 10 words required in message"})
    .max(255,{message:"maximum 255 words in message"}),
       email:z
    .string({required_error:"message field is required"})
    .trim()
    .min(1,{message:"atleast 10 words required in message"})
    .max(255,{message:"maximum 255 words in message"}),
    message:z
    .string({required_error:"message field is required"})
    .trim()
    .min(10,{message:"atleast 10 words required in message"})
    .max(255,{message:"maximum 255 words in message"})
})

module.exports=contactzod