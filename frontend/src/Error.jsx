import { Link } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { useState } from "react"
export const Error=()=>{
      const [oldupdate,newupdate]=useState(true)
    return(
       <>
       <Navbar value={newupdate} value2={oldupdate}/>
         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6 text-center">
      <img
        src="/error.png" // Put error.png inside your /public folder
        alt="Error"
        className="w-72 md:w-96 mb-8"
      />

      <h1 className="text-4xl md:text-6xl font-bold mb-4">Oops! Page not found</h1>
      <p className="text-gray-300 text-lg md:text-xl mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="bg-[#1877F2] hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
       </>
    )
}