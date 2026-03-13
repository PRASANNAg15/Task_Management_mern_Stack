import { Router,Route,Routes } from "react-router-dom";
import Login from "../Pages/Login";
import UserRegistration from "../Pages/UserRegistration";
import Task from "../Pages/TaskManagement";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import Admin from "../Pages/Admin";
function AppRouter(){
    return(
            <Routes>
           <Route path="/" element={<Login/>}></Route>
           <Route path="/register" element={<UserRegistration/>}></Route>
           <Route path="/tasks" element={<Task/>}></Route>
           <Route path="/home" element={<Home/>}></Route>
           <Route path="/profile" element={<Profile/>}></Route>
           <Route path="/admin" element={<Admin/>}></Route>
           </Routes>
    )
}
export default AppRouter;