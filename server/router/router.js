const express=require('express')
const router=express.Router()

const registerschema=require('../zodfile/registerzod')
const loginschema=require('../zodfile/loginzod')
const validate=require('../validate/auth-validate')
const checkinguser=require('../error-middleware/user-middleware')
const contactzod=require('../zodfile/contactzod')
const authtaking=require('../controller/auth-controller')
router.post('/',validate(registerschema),authtaking.home)
router.post('/login',validate(loginschema),authtaking.login)
router.get('/service',authtaking.service)
router.get('/user',checkinguser,authtaking.user)
router.post('/message',validate(contactzod),authtaking.message)
router.get('/purchasedcour',authtaking.purchasedcour);
module.exports=router