import { useEffect } from "react";

import { Navigate } from "react-router-dom";
import { Useauth } from "./auth";
import { toast } from "react-toastify";
export const Logout = () => {
 const {logout}=Useauth()
useEffect(()=>{

logout()
},[logout])
useEffect(()=>{
 toast.success('logout successfull')
},[])
  return (
 
  
  <Navigate to="/login" />
)
};
