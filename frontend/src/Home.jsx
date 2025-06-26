import { useState } from "react"
import { Navbar } from "./components/Navbar"
import "./Home.css"
const Home=()=>{
    const [oldupdate,newupdate]=useState(true)
    const userclick=()=>{
        if(oldupdate===false){
          newupdate(!oldupdate)
        }
    }
return(
    <>
    <Navbar value={newupdate} value2={oldupdate}/>
<div className={!oldupdate?"blur":" mt-10 md:flex justify-between "} onClick={userclick}>
<div>
    <div><img src="home.png" alt="hello"></img></div>
</div>
<div style={{color:"white",fontStyle:"italic",fontSize:"25px"}}>
    We are world best It Company<br></br><h1 style={{fontSize:"40px"}}>Welcome to Thapa Technical</h1>Are you ready to take your business to the next level with
    cutting-edge solutions?Look no further! At Thapa Technical.we specialize in providing IT services and solutions tailoredto meet your
    unique needs.
</div>
  <div></div>
  </div>

  <div className="flex justify-center mt-20">
  <div
    className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-4xl flex flex-wrap justify-around text-center"
  >
    <div className="m-4">
      <h2 className="text-3xl font-bold text-blue-600">50+</h2>
      <p className="text-gray-700 text-sm mt-1">Registered Companies</p>
    </div>

    <div className="m-4">
      <h2 className="text-3xl font-bold text-blue-600">100,000+</h2>
      <p className="text-gray-700 text-sm mt-1">Happy Clients</p>
    </div>

    <div className="m-4">
      <h2 className="text-3xl font-bold text-blue-600">500+</h2>
      <p className="text-gray-700 text-sm mt-1">Well-known Developers</p>
    </div>

    <div className="m-4">
      <h2 className="text-3xl font-bold text-blue-600">24/7</h2>
      <p className="text-gray-700 text-sm mt-1">Customer Support</p>
    </div>
  </div>
</div>

  <div className={!oldupdate?"blur":" mt-10 md:flex justify-between "}>
<div>
    <div><img src="design.png" alt="design"></img></div>
</div>
<div style={{color:"white",fontStyle:"italic",fontSize:"25px"}}>
    We are here to help you<br></br><h1 style={{fontSize:"40px"}}>Get started today</h1>Ready to take the first step towards a more
    efficient and secure  it infrastructure? Contact us  today for a  free consultation and let's discuss how thapa technical can help 
     your business thrive in digital age.
     <div><a href="/contact"><button
  style={{
    backgroundColor: "#1877F2",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
Connect Now
</button></a></div>
</div>
  <div></div>
  </div>
  <div className="flex justify-center mt-5" style={{backgroundColor:"#1877F2",height:"50px"}}>
    <div style={{color:"white"}} className="mt-4">@Thapatechnical 2024</div>
   </div>
    </>

)
}
export default Home