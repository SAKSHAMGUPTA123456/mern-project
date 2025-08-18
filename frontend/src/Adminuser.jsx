import { useEffect, useState } from "react";
import { Useauth } from "./auth";
import { Link } from "react-router-dom";
export const User = () => {
  const [olddata, newdata] = useState([]);
const {oldtoken}=Useauth()
  const getuserdata = async () => {
    const response = await fetch("https://mern-project-backend-c97u.onrender.com/admin/user", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    if (response.ok) {
      const gh = await response.json();
      newdata(gh.mssg);
    }
  };
  useEffect(() => {
    getuserdata(); 
  }, []);
const handledelete=async(value)=>{
  console.log(olddata)
const response=await fetch(`https://mern-project-backend-c97u.onrender.com/admin/user/${value}`,{
  method:"DELETE",
  headers:{
    Authorization:`Bearer ${oldtoken}`
  }
})
if(response.ok){
  console.log('hello')
  getuserdata()
}
else{
  const gh=await response.json()
  console.log(gh)
}
}
  return (
<>
    <div style={{color:"white",fontSize:"50px"}} className="flex justify-center">Users Data</div>
    <div className="p-4" style={{backgroundColor:"white"}}>
     
      <div className="flex justify-between sm:flex bg-blue-500 text-white font-bold rounded-t-lg">
     <div>Name</div>
     <div>Email</div>
     <div>Phone</div>
        <div className="w-20 text-center">Update</div>
        <div className="w-20 text-center">Delete</div>
      </div>

      {olddata.map((curr, index) => (
        <div
          key={index}
          className="flex justify-between"
        >
          <div className="break-words w-16 ">{curr.username}</div>
          <div className="break-words w-16 ">{curr.email}</div>
          <div className="break-words w-16 ">{curr.phone}</div>
          <div className="w-20 h-10 text-center cursor-pointer text-blue-600 
                  hover:bg-blue-500 hover:text-white transition-colors duration-200"><Link to={`/admin/user/${curr._id}`}>Edit</Link></div>
          <div className="w-20 h-10 text-center text-red-600 cursor-pointer py-1 hover:bg-red-600 hover:text-white" onClick={()=>handledelete(curr._id)}>Delete</div>
        </div>
      ))}
    </div>
    </>
  );
};
