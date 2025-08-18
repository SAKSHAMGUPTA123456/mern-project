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
import { Hacking } from "./individualpurchaseddetails";
import Updateuseradmin from "./gettinguserindividualdata";
import { Allcontact } from "./Allcontactdata";
import Portfolio from './portfolio'
import { Alreadypurchased } from "./purchasedcourse";
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
        path:'/individual/:id',
        element:<Hacking/>

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
        path:"/portfolio",
        element:<Portfolio/>
    },
    {
        path:"/service",
        element:<Service/>
    },{
        path:"/logout",
        element:<Logout/>
    },
      {
        path:"/alreadypurchased",
        element:<Alreadypurchased/>
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