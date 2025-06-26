import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Useauth } from "./auth"
import { toast } from "react-toastify"
import { useCallback } from "react"
const Updateuseradmin=()=>{
const {oldtoken}=Useauth()
const {id}=useParams()
const [oldname,newname]=useState()
const [oldemail,newemail]=useState()
const [olddetails,newdetails]=useState({
    username:"",
    email:"",
    phone:""
})
const gettingsingleuserdata=useCallback(async(req,res)=>{
    const response=await fetch(`https://mern-project-backend-c97u.onrender.com/admin/user/individual/${id}`,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${oldtoken}`
        }
    })
    if(response.ok){
        const gh=await response.json()
        console.log(gh)
        newname(gh.mssg.username)
        newemail(gh.mssg.email)
        newdetails({
          username:gh.mssg.username,
          email:gh.mssg.email,
          phone:""
        })
    }
    else{
          const gh=await response.json()
        console.log(gh)
    }
},[oldtoken,id])
useEffect(()=>{
gettingsingleuserdata()
},[gettingsingleuserdata])
const handlingtext = (e, field) => {
  newdetails((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };
const handlesubmit=async()=>{
 console.log(olddetails)
  try{
const response=await fetch(`http://localhost:9001/admin/user/update/${id}`,{
  method:"PATCH",
  headers:{
     "Content-Type": "application/json",
    Authorization:`Bearer ${oldtoken}`
  },
  body:JSON.stringify(olddetails)
})
if(response.ok){
    toast.success('user data updated successfully');
     newdetails({
      username:oldname,
      email:oldemail,
      phone:""
    })
}
else{
  console.log('dmkdl')
}
  }catch(error){
    console.log(error)
  }
}




return(
    <>
    <div className="flex justify-center mt-10">
 <div class="w-full sm:w-[48%] lg:w-[30%] bg-white shadow-lg rounded-2xl p-6">
      <h2 class="text-xl font-semibold text-center mb-4">Update User Data</h2>
      {/* <form class="space-y-4"> */}
        <div>
          <label class="block mb-1 font-medium text-gray-700">Username</label>
          <input type="text" placeholder="Enter your username" class="w-full p-2 border rounded-xl"  value={olddetails.username} onChange={(e)=>handlingtext(e,"username")}/>
        </div>
        <div>
          <label class="block mb-1 font-medium text-gray-700">Email</label>
          <input type="text" placeholder="Enter your email" class="w-full p-2 border rounded-xl"  value={olddetails.email} onChange={(e)=>handlingtext(e,"email")} />
        </div>
        <div>
          <label class="block mb-1 font-medium text-gray-700">Phone</label>
          <input type="text"   value={olddetails.phone} placeholder="Enter your mobile number" class="w-full p-2 border rounded-xl" onChange={(e)=>handlingtext(e,"phone") }/>
        </div>
        <button  class="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600" onClick={()=>handlesubmit()}>
          Submit
        </button>
      {/* </form> */}
    </div>
    </div>
    </>
)
}
export default Updateuseradmin