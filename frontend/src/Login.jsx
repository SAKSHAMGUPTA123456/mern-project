import { Navbar } from "./components/Navbar"
import { useState } from "react"
import { toast } from "react-toastify"
import { Useauth } from "./auth"
const Login=()=>{
  const {storetoken}=Useauth()
const uri = "https://thapaservices-backend.up.railway.app/home/login";
      const [oldupdate,newupdate]=useState(true)
      const [oldemail,newemail]=useState(true)
         const [oldpassword,newpassword]=useState(true)
           const [olddetails,newdetails]=useState({
email:"",
password:""
})

const handling=(e,realentity)=>{
    const type=e.target.value
  
   newdetails((prev=>({
    ...prev,[realentity]:type
   })))}

   const registering=async()=>{
    if(olddetails.email!=="" || olddetails.password!==""){
    try{
const response=await fetch(uri,{
  method:"POST",
  headers:{
    "content-type":"application/json"
  },
  credentials:true,
  body:JSON.stringify(olddetails)
})
if(response.ok){
  const gh=await response.json()
  console.log(gh)
  toast.success("login successfully")
  newdetails({
    email:"",
    password:""
  })
  storetoken(gh.token)
}
if(!response.ok){
   const gh=await response.json()
   const checking=gh.error||gh.mssg
   if(gh.mssg!==""){
    toast.error(checking)
   }


   if(checking.email){
    newemail(false)
    toast.error(checking.email)
   }
   else{
    newemail(true)
   }
   if(checking.password){
    newpassword(false)
   }
   else{
    newpassword(true)
   }

}
    }catch(error){
console.log(error)
toast.error('server error')
    }

}
else{
  toast.error('fill all details properly')
}
   }
 const userclick=()=>{
        if(oldupdate===false){
          newupdate(!oldupdate)
        }
    }
return(
  <>
   <Navbar value={newupdate} value2={oldupdate}/>
    <div className={!oldupdate?"blur":"md:flex justify-between"} onClick={userclick} >
<div className="hidden md:block"></div>
<div><img src="login.png" className="md:w-[445px]" alt="good"></img></div>
<div style={{border:"2px solid black"}} >
<div style={{color:"white",fontSize:"35px",fontStyle:"italic",textDecoration:"underline",    textDecorationColor: "#1877F2"}} className="flex justify-center">Login Form</div>
<div style={{color:"white"}} className="ml-1">Email</div>
<div className="ml-1"><input
  type="text"
  placeholder="Enter your email"
  className={oldemail?"border border-black":"border border-red-600"}
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
<div style={{color:"white"}} className="ml-1">Password</div>
<div className="ml-1"><input
  type="text"
  placeholder="Enter your password"
    className={oldpassword?"border border-black":"border border-red-600"}

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
 Login Now
</button></div>

</div>
<div></div>
   </div>
   <div className="hidden md:block"></div>
<br></br>
   <div className="flex justify-center" style={{backgroundColor:"#1877F2",height:"50px"}}>
    <div style={{color:"white"}} className="mt-4">@Thapatechnical 2024</div>
   </div>
    </>


)
}
export default Login