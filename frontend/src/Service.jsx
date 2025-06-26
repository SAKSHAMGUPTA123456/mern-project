import { useEffect } from "react"
import { Navbar } from "./components/Navbar"
import { useState } from "react"
const Service=()=>{
    const [oldupdate,newupdate]=useState(true)
    const [oldarray,newarray]=useState()
    const uri="https://thapaservices-backend.up.railway.app/home/service"
const fetchingdata=async()=>{
    const response=await fetch(uri,{
        method:"GET",
         credentials: "include",
        headers:{
            "content-type":"application/json"
        },
    
    }
    )
    if(response.ok){
        const gh=await response.json()
      newarray(gh.details)
    }
}
    useEffect(()=>{
fetchingdata()
    },[])
return(
    <>
   <Navbar value={newupdate} value2={oldupdate}/>

 <div className="flex justify-center">  <h1 style={{color:"white",fontSize:"55px",textDecoration: "underline",
    textDecorationColor: "#1877F2",}} >Services</h1></div>
    <div className="flex justify-center">
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
{oldarray?.map((curr)=>{
    return(
      
     <div style={{border:"2px solid white",}} className=" mb-11 md:w-[400px]">
        
<div className="flex justify-center"><img src="design.png" alt="images" style={{height:"340px"}}></img></div>
<div className="flex justify-between">
    <div></div>
    <div><h3 style={{color:"white"}}>Tech solutions Inc</h3></div>
    <div></div>
    <div><h3 style={{color:"white"}}>$2000-${curr.price}</h3></div>
    <div></div>
</div>
<div style={{color:"white",fontSize:"40px"}}>{curr.service}</div>
<div className="flex justify-center"><h4 style={{color:"white"}}>{curr.description}</h4></div>
        </div>
     
    )
})}
</div>
</div>
    </>
)
}
export default Service