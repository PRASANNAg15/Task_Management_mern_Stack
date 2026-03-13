import { useState } from "react";
import { createUser } from "../Services/UserService";
import { useNavigate } from "react-router-dom";
function Admin(){
    const[name,setName]=useState("");
        const[email,setEmail]=useState("");
        const[password,setPassword]=useState("");
        const[confirm,setConfirm]=useState("");
       const[error,setError]=useState("");
       const[loginError,setLoginError]=useState("");
       const Navigate=useNavigate();
       async  function handleRegister(){
            if(name!=="" && email!=="" && password!=="" && confirm!=="")
            {
                if(password!==confirm)
                {
            setError("Password Mismatch");
                }
                else{
                    const user={
                        name:name,
                        email:email,
                        password:password,
                        role:"ADMIN"
                    }
                    try{
                   const res= await createUser(user); 
                   console.log(res);
                   Navigate("/");
                    }
                    catch(err)
                    {
                        setLoginError("Invalid Details give correct one");
                    }
                }
            }
        }
    return(
       <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "450px" }}>
        <h3 className="text-center mb-4">Register</h3>

        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password(Password must be at least 8 characters long and contain letters, digits, and special characters)</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger py-2">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Role</label>
            <input
              type="text"
              className="form-control"
              value="ADMIN"
              disabled
            />
          </div>

          <div className="d-grid">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>

          {loginError && (
            <div className="alert alert-danger mt-3 py-2">
              {loginError}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
export default Admin;