import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { getUserById, updateUser } from "../Services/UserService";
import { Link } from "react-router-dom";
function Profile(){
    const id=useSelector(state=>state.user.id);
    const[isUpdate,setIsUpdate]=useState(false);
    const[update,setUpdate]=useState({});
    const[user,setUser]=useState({});
    function handleChange(e){
        const {name,value}=e.target;
        setUpdate(prev=>({...prev,
            [name]:value
        }))
    }
    useEffect(()=>{
      async function getProfile(){
        const res=await getUserById(id);
        console.log(res.data);
        setUser(res.data);
      }
      getProfile();
    },[id]);
    async function handleSave(){
      try{
      const res=await updateUser(id,update);
      alert("Updated successfully");
      }
      catch(err)
      {
        console.log(err);
        alert("update failed");
      }
    }
    return(
        <>
         <div className="container mt-5">
  <div className="card shadow">
    <div className="card-header bg-primary text-white">
      <h4 className="mb-0">User Profile</h4>
    </div>
    <div className="card-body">
      {user && (
        <form>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label fw-bold">
              Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                value={user.name}
                readOnly
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label fw-bold">
              Email
            </label>
            <div className="col-sm-9">
              <input
                type="email"
                className="form-control"
                value={user.email}
                readOnly
              />
            </div>
          </div>
        </form>
      )}
    </div>
  </div>
</div>
<button className="btn btn-primary mt-4"><Link style={{color:"white",textDecoration:"none"}} to={"/home"}>Home</Link></button>
<button className="btn btn-secondary mt-4"onClick={()=>setIsUpdate(true)}>Update</button>

<div className="card-body">
         {isUpdate &&(
          <form>
            
         
            <div className="mb-3">
              <label className="form-label fw-bold">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
               onChange={handleChange}
                placeholder="Enter your name"
                
              />
            </div>

          
            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
                 placeholder="Enter your email"
               
              />
            </div>

            
            <div className="mb-3">
              <label className="form-label fw-bold">Password</label>
              <input
              onChange={handleChange}
                type="password"
                className="form-control"
                name="password"
               placeholder="Enter your password"
             
              />
            </div>
            <button type="button" className="btn btn-success" onClick={handleSave}>
                Save
              </button>
          

          </form>
          )}
        </div>

        </>
    )
}
export default Profile;