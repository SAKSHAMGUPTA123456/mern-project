import { Navbar } from "./components/Navbar"
import { useEffect, useState } from "react"
import { Useauth } from "./auth"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { FaUser } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";
import { GrServices } from "react-icons/gr";
import { useLocation } from "react-router-dom";
import { useCallback } from "react"
export const Admin=()=>{
    const navigate=useNavigate()
    const {oldtoken}=Useauth()
    const [oldupdate,newupdate]=useState(true)
    
    const location = useLocation();
  const isMainAdminRoute = location.pathname === "/admin";
const testingadmin=useCallback(async(req,res)=>{
const response=await fetch("http://localhost:9001/admin",{
    method:"GET",
    headers:{
        Authorization:`Bearer ${oldtoken}`
    }
})
 const gh=await response.json()
if(response.ok){
    
    console.log(gh)
    toast.success(gh.mssg)
}

if(!response.ok){
  const ghh=gh.mssg||gh.error
  if(ghh==="Invalid or expired token"){
    toast.error('pls log in website to access admin panel')
navigate('/login')
    return
  }
  else{
    toast.error(ghh)
    navigate('/')
  }

}
},[oldtoken])
useEffect(()=>{
testingadmin()
},[testingadmin,oldtoken])
const checking=(value)=>{
    navigate(`${value}`)
}
    return(<>
  {isMainAdminRoute && <Navbar value={newupdate} value2={oldupdate} />}

   <div className="flex justify-center">
    <FaUser style={{color:"#1877F2",fontSize:"25px"}} />
    <div style={{color:"#1877F2"}} className="ml-2" onClick={()=>checking('user')}>users</div>
    <RiContactsLine style={{color:"#1877F2",fontSize:"25px"}}  className="ml-2"/>
    <div style={{color:"#1877F2"}} className="ml-2" onClick={()=>checking('contactusers')}>Contact</div>
    <GrServices style={{color:"#1877F2",fontSize:"25px"}} className="ml-2"/>
    <div style={{color:"#1877F2"}} className="ml-2">Services</div>
    <FaHome  style={{color:"#1877F2",fontSize:"25px"}} className="ml-2"/>
    <div style={{color:"#1877F2"}} className="ml-2">Home</div>
   </div>
   <Outlet />
    <div className="flex justify-center" style={{backgroundColor:"#1877F2",height:"50px"}}>
    <div style={{color:"white"}} className="mt-4">@Thapatechnical 2024</div>
   </div>
</>
    )
}