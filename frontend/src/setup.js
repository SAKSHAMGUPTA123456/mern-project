import Home from "./Home"
import { Error } from "./Error";
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import About from "./About";
import Contact from "./Contact";
import Register from "./Register";
import Login from "./Login";
import Service from "./Service";
import  {Logout}  from "./logout";
import { Admin } from "./admin";
import { User } from "./Adminuser";
import Updateuseradmin from "./gettinguserindividualdata";
import { Allcontact } from "./Allcontactdata";
const router=createBrowserRouter([
    {
     path:"/",
     element:<Home/>,
     errorElement:<Error/>
    },
    {
        path:"/about",
        element:<About/>
    },
    {
        path:"/contact",
        element:<Contact/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/service",
        element:<Service/>
    },{
        path:"/logout",
        element:<Logout/>
    },{
        path:"/admin",
        element:<Admin/>,
        children:[{
            path:"user",
            element:<User/>,
        },
    {
        path:"user/:id",
        element:<Updateuseradmin/>
    },
{
    path:"contactusers",
    element:<Allcontact/>

}]}])

export const Setup = () => {
  return <RouterProvider router={router} />;
};