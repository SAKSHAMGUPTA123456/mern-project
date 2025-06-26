import { Navbar } from "./components/Navbar"
import { useState } from "react"
import { Useauth } from "./auth"
const About=()=>{
const {oldauthen}=Useauth()
  console.log(oldauthen)
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
   
</div>
<div style={{color:"white",fontStyle:"italic",fontSize:"25px"}}>
    {/* <p>We care to cure your Health</p> */}

              <h1>Why Choose Us? </h1>
              <p>
                Expertise: Our team consists of experienced IT professionals who
                are passionate about staying up-to-date with the latest industry
                trends.
              </p>
              <p>
                Customization: We understand that every business is unique.
                Thats why we create solutions that are tailored to your specific
                needs and goals.
              </p>
              <p>
                Customer-Centric Approach: We prioritize your satisfaction and
                provide top-notch support to address your IT concerns.
              </p>
              <p>
                Affordability: We offer competitive pricing without compromising
                on the quality of our services.
              </p>
              <p>
                Reliability: Count on us to be there when you need us. We're
                committed to ensuring your IT environment is reliable and
                available 24/7.
              </p>
</div>
 <div><img src="home.png" alt="imagejkj"></img></div>
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
<div className="flex justify-center mt-5" style={{backgroundColor:"#1877F2",height:"50px"}}>
    <div style={{color:"white"}} className="mt-4">@Thapatechnical 2024</div>
   </div>
   </>
)
}
export default About