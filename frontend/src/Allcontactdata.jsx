import { useEffect, useState } from "react"
import { Useauth } from "./auth"
import { useCallback } from "react"
export const Allcontact=()=>{
    const {oldtoken}=Useauth()
    const [olddetails,newdetails]=useState([])
    const getallcontactdata = useCallback(async () => {
    const response = await fetch('http://localhost:9001/admin/contact', {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${oldtoken}`
      }
    })
    const gh = await response.json()
    if (response.ok) {
      console.log(gh)
      newdetails(gh.check)
    }
  }, [oldtoken])
    useEffect(()=>{
getallcontactdata()
    },[getallcontactdata])
    const handlingdelete=async(id)=>{
        const response=await fetch(`http://localhost:9001/admin/contact/delete/${id}`,{
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${oldtoken}`
            }
        })
        if(response.ok){
            console.log('good')
            getallcontactdata()
        }
    }
return(<>
<div style={{color:"white",fontSize:"50px"}} className="flex justify-center">Contact  Data</div>
     <div className="p-4" style={{backgroundColor:"white"}}>
     
      <div className="flex justify-between sm:flex bg-blue-500 text-white font-bold rounded-t-lg">
     <div>Name</div>
     <div>Email</div>
        <div className="w-20 text-center">Message</div>
        <div className="w-20 text-center">Delete</div>
      </div>

      {olddetails.map((curr, index) => (
        <div
          key={index}
          className="flex justify-between mt-3"
        >
          <div className="break-words w-16 ">{curr.username}</div>
          <div className="break-words w-16 ">{curr.email}</div>
          <div className="break-words w-16">{curr.message}</div>
          <div className="w-20 h-10 text-center text-red-600 cursor-pointer py-1 hover:bg-red-600 hover:text-white" onClick={()=>handlingdelete(curr._id)}>Delete</div>
        </div>
      ))}
    </div>
    </>
)
}