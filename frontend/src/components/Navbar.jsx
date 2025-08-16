
import { motion } from "framer-motion";
import {NavLink} from 'react-router-dom'
import { Useauth } from '../auth'
export const Navbar = ({value,value2}) => {
  const Toggle = () => value(!value2);
const {updating}=Useauth()
  return (
    <>
      <div className={!value2?"blue flex justify-between item-center p-4":"flex justify-between items-center p-4"}>
        <div className="ml-5 md:hidden">
          <img
            src="download.png"
            style={{ width: "40px", cursor: "pointer" }}
            onClick={Toggle}
            alt="menu"
          />
        </div>

        <div class={!value2?"blur":"visible"}>
          <h1 style={{ color: "#1877F2", fontSize: "35px" }}>
            Thapa Technical
          </h1>
        </div>
<div className="hidden md:flex gap-4">
               <NavLink
  to="/"
  className={({ isActive }) =>isActive ? "text-blue-700 font-bold my-2" : "text-white my-2"}>
  Home
</NavLink>
         <br></br>
         <NavLink
  to="/about"
  className={({ isActive }) =>isActive ? "text-blue-700 font-bold my-2" : "text-white my-2"}>
  About
</NavLink>
 <br></br>
  <NavLink
  to="/service"
  className={({ isActive }) =>isActive ? "text-blue-700 font-bold my-2" : "text-white my-2"}>
  Services
</NavLink>
 <br></br>
  <NavLink
  to="/contact"
  className={({ isActive }) =>isActive ? "text-blue-700 font-bold my-2" : "text-white my-2"}>
  Contact
</NavLink>
 <br></br>
 {!updating?<NavLink
  to="/register"
  className={({ isActive }) =>isActive ? "text-blue-700 font-bold my-2" : "text-white my-2"}>
Register
</NavLink>
 :""}
{!updating? <NavLink
  to="/login"
  className={({ isActive }) =>isActive ? "text-blue-700 font-bold my-2" : "text-white my-2"}>
Login
</NavLink>
 : <NavLink
  to="/logout"
  className={({ isActive }) =>isActive ? "text-blue-700 font-bold my-2" : "text-white my-2"}>
Logout
</NavLink> }
 {!updating?"":<NavLink
  to="/portfolio"
  className={({ isActive }) =>isActive ? "text-blue-700 font-bold my-2" : "text-white my-2"}>
Portfolio
</NavLink> }
        </div>
      </div>

      {!value2 && (
        <motion.div
          className="ml-2 bg-white md:hidden"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
       <NavLink
  to="/"
  className={({ isActive }) =>isActive ? "text-blue-700 font-bold my-2" : "text-[#1877F2] my-2"}>
  Home
</NavLink>
         <br></br>
         <NavLink
  to="/about"
  className={({ isActive }) =>isActive ? "text-blue-700 font-bold my-2" : "text-[#1877F2] my-2"}>
  About
</NavLink>
 <br></br>
  <NavLink
  to="/service"
  className={({ isActive }) =>isActive ? "text-blue-700 font-bold my-2" : "text-[#1877F2] my-2"}>
  Services
</NavLink>
 <br></br>
  <NavLink
  to="/contact"
  className={({ isActive }) =>isActive ? "text-blue-700 font-bold my-2" : "text-[#1877F2] my-2"}>
  Contact
</NavLink>
 <br></br>
{!updating?<NavLink
  to="/register"
  className={({ isActive }) =>isActive ? "text-blue-700 font-bold my-2" : "text-[#1877F2] my-2"}>
Register
</NavLink>
 :""}
 <br></br>
{!updating? <NavLink
  to="/login"
  className={({ isActive }) =>isActive ? "text-blue-700 font-bold my-2" : "text-[#1877F2] my-2"}>
Login
</NavLink>
 : <NavLink
  to="/logout"
  className={({ isActive }) =>isActive ? "text-blue-700 font-bold my-2" : "text-[#1877F2] my-2"}>
Logout
</NavLink> }{!updating?"":<NavLink
  to="/portfolio"
  className={({ isActive }) =>isActive ? "text-blue-700 font-bold my-2" : "text-white my-2"}>
Portfolio
</NavLink> }
        </motion.div>
      )}
    </>
  );
};
