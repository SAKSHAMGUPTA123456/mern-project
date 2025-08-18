import { Navbar } from "./components/Navbar"
import { useState } from "react"
import { Useauth } from "./auth"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const Register=()=>{
  const {storetoken}=Useauth()
  const navigate=useNavigate()
     const [oldupdate,newupdate]=useState(true)
     const [oldusername,newusername]=useState(true)
       const [oldemail,newemail]=useState(true)
       const [oldphone,newphone]=useState(true)
        const [oldpassword,newpassword]=useState(true)
     const [olddetails,newdetails]=useState({
                username:"",
email:"",
phone:"",
password:""

})

const handling=(e,realentity)=>{
    const type=e.target.value
  
   newdetails((prev=>({
    ...prev,[realentity]:type
   })))
  
}
const registering=async()=>{
  try{
 if(olddetails.username!=="" || olddetails.email!=="" || olddetails.phone!=="" || olddetails.password!==""){
 const response=await fetch('https://mern-project-tv78.onrender.com/home',{
  method:"POST",
  headers:{
    "content-type":"application/json"
  },
   body:JSON.stringify(olddetails)
 },

 )
 if(response.ok){
    const gh=await response.json()
  console.log(gh)
  storetoken(gh.token)
   newdetails({
  username:"",
  email:"",
  phone:"",
  password:""
 })
 newusername(true)
 newphone(true)
 newpassword(true)
newemail(true)
toast.success('login successfully')
 }
if(!response.ok){
  const gh=await response.json()
  const checking=gh.error||gh.mssg
  console.log(checking)
  if(checking==="email already exist pls go to login page"){
     toast.error('email already exist go to login page')
navigate('/login')
return
  }
 if(checking.email){
  newemail(false)
  toast.error(checking.email)
 }
 else{
  newemail(true)
}
 if(checking.username){
  newusername(false)
   toast.error(checking.username)
 }
 else{
  newusername(true)
 }
  if(checking.phone){
  newphone(false)
    toast.error(checking.phone)
 }
 else{
  newphone(true)
 }
   if(checking.password){
  newpassword(false)
    toast.error(checking.password)
 }
 else{
  newpassword(true)
 }
}
}
else{
  toast.error('fill details properly')
}
  }catch(error){

  }
}
return(
    <>
   <Navbar value={newupdate} value2={oldupdate}/>

   <div className={!oldupdate?"blur":"md:flex justify-between"}>
<div className="hidden md:block"></div>
<div><img src="register.png" className="md:w-[445px]" alt="good"></img></div>
<div style={{border:"2px solid black"}}>
<div style={{color:"white",fontSize:"35px",fontStyle:"italic",textDecoration:"underline",    textDecorationColor: "#1877F2"}} className="flex justify-center">Registration Form</div>
<div style={{color:"white"}} className="ml-4">Username</div>
<div className="ml-4"><input
  type="text"
  placeholder="Enter your name"
  className={oldusername?"border border-black":"border border-red-500"}
  style={{
    background: "linear-gradient(to bottom, #111 0%, #222 100%)",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    outline: "none",
    width: "100%",
  }}
  onChange={(e)=>handling(e,"username")}
  value={olddetails.username}
/>
<div style={{color:"white"}} className="ml-1">Email</div>
<div className="ml-1"><input
  type="text"
  placeholder="Enter your email"
  className={oldemail?"border border-black":"border border-red-500"}
  style={{
    background: "linear-gradient(to bottom, #111 0%, #222 100%)",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    outline: "none",
    width: "100%",
  }}
  onChange={(e)=>handling(e,"email")}
  value={olddetails.email}
/>
</div>
<div style={{color:"white"}} className="ml-1">Phone</div>
<div className="ml-1"><input
  type="text"
  placeholder="Enter your phone number"
   className={oldphone?"border border-black":"border border-red-500"}
  style={{
    background: "linear-gradient(to bottom, #111 0%, #222 100%)",
    color: "#fff",
  
    padding: "10px",
    borderRadius: "8px",
    outline: "none",
    width: "100%",
  }}
  onChange={(e)=>handling(e,"phone")}
   value={olddetails.phone}
/>
</div>
<div style={{color:"white"}} className="ml-1">Password</div>
<div className="ml-1"><input
  type="text"
  placeholder="Enter your password"
   className={oldpassword?"border border-black":"border border-red-500"}
  style={{
    background: "linear-gradient(to bottom, #111 0%, #222 100%)",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    outline: "none",
    width: "100%",
  }}
  onChange={(e)=>handling(e,"password")}
   value={olddetails.password}
/>
</div>
<div><button
  style={{
    backgroundColor: "#1877F2", // Facebook blue
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  }}
  className="mt-3"
  onClick={registering}
>
 Register Now
</button></div>
</div>

   </div>
   <div className="hidden md:block"></div>
   </div>
<br></br>
   <div className="flex justify-center" style={{backgroundColor:"#1877F2",height:"50px"}}>
    <div style={{color:"white"}} className="mt-4">@Thapatechnical 2024</div>
   </div>
    </>
)
}
export default Register