import { useEffect, useState } from "react"
import { Navbar } from "./components/Navbar"
import { Useauth } from "./auth"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
const Contact=()=>{
  const navigate=useNavigate()
const {oldauthen,loading}=Useauth()
console.log(oldauthen)
     const [oldupdate,newupdate]=useState(true)
      const [olddetails,newdetails]=useState({})
const [oldmessage,newmessage]=useState(false)
const handling=(e,realentity)=>{
    const type=e.target.value
  
   newdetails((prev=>({
    ...prev,[realentity]:type
   })))
  
}
useEffect(()=>{
  console.log(oldauthen)
if (oldauthen?.details?.username && oldauthen?.details?.email) {
  newdetails({
    username: oldauthen.details.username,
    email: oldauthen.details.email,
    message: ""
  });
} else {
  newdetails({
    username: "",
    email: "",
    message: ""
  });
}
},[oldauthen])

useEffect(() => {
  if (!loading && !oldauthen?.details) {
    toast.error('Please login first to access contact page');
    navigate('/login');
  }
}, [loading, oldauthen, navigate]);

const registering=async()=>{
const response=await fetch('https://mern-project-backend-c97u.onrender.com/home/message',{
  method:"POST",
  headers:{
    "content-type":"application/json"
  },
  body:JSON.stringify(olddetails)
})
if(response.ok){
  const gh=await response.json()
  console.log(gh)
newdetails({
  username:oldauthen.details.username,
    email:oldauthen.details.email,
    message:""
})
  newmessage(false)
  toast.success('message sent successfully')
}
if(!response.ok){
    const gh=await response.json()
  console.log(gh.error.message)
  toast.error(gh.error.message)
  newmessage(true)
}
} 

return(
   <>
<Navbar value={newupdate} value2={oldupdate}/>


  
 {oldauthen?.details ? (
      <>
        <div
          style={{
            color: "white",
            fontStyle: "italic",
            fontSize: "40px",
            textDecoration: "underline",
            textDecorationColor: "#1877F2",
          }}
          className={!oldupdate ? "blur" : "flex justify-center"}
        >
          Contact Form
        </div>

        <div className={!oldupdate ? "blur" : "md:flex justify-between"}>
          <div className="hidden md:block"></div>
          <div>
            <img src="login.png" className="md:w-[445px]" alt="hlo login " />
          </div>
          <div>
            <div style={{ color: "white" }} className="ml-1">
              Username
            </div>
            <div className="ml-1">
              <input
                type="text"
                placeholder="Enter your Username"
                style={{
                  background: "linear-gradient(to bottom, #111 0%, #222 100%)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "10px",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
                onChange={(e) => handling(e, "username")}
                value={olddetails.username || ""}
              />
            </div>

            <div style={{ color: "white" }} className="ml-1">
              Email
            </div>
            <div className="ml-1">
              <input
                type="text"
                placeholder="Enter your email"
                style={{
                  background: "linear-gradient(to bottom, #111 0%, #222 100%)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "10px",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
                onChange={(e) => handling(e, "email")}
                value={olddetails.email || ""}
              />
            </div>

            <div style={{ color: "white" }} className="ml-1">
              Message
            </div>
            <div>
              <textarea
                placeholder="Type Your Message"
                className={oldmessage?"border border-red-500":"border border-black"}
                style={{
                  background: "linear-gradient(to bottom, #111 0%, #222 100%)",
                  color: "#fff",
                 
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                  height: "145px",
                  padding: "10px",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  resize: "none",
                  whiteSpace: "pre-wrap",
                }}
                onChange={(e) => handling(e, "message")}
                value={olddetails.message || ""}
              />
            </div>

            <div>
              <button
                style={{
                  backgroundColor: "#1877F2",
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
                Submit
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </>
    ) :""
    }
<div className="flex justify-center mt-6" style={{backgroundColor:"#1877F2",height:"50px"}}>
    <div style={{color:"white"}} className="mt-4">@Thapatechnical 2024</div>
   </div>
   <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.895060957486!2d-73.98796348460065!3d40.75889597932632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855d61d2d99%3A0x8086c60f9a43899b!2sTimes%20Square!5e0!3m2!1sen!2sin!4v1718440000000!5m2!1sen!2sin"
  width="100%"
  height="400"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="Times Square Map"
></iframe>
</>

)}


export default Contact