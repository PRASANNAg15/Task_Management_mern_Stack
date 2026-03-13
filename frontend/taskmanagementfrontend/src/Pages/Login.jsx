import { useState } from "react";
import { loginUser } from "../Services/UserService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRole,setUserId,setToken } from "../Redux/UserSlice";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loginError,setLoginError]=useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogin() {
    try{
    const userData = { 
      email:email, password:password };
    const res = await loginUser(userData);
    console.log(res);
   localStorage.setItem("token",res.data.token);
   dispatch(setUserId(res.data.user._id));
  dispatch(setRole(res.data.user.role));
    dispatch(setToken(res.data.token));
   localStorage.setItem("userId", res.data.user._id);
    localStorage.setItem("role", res.data.user.role);
      navigate("/home")
    }
    catch(err)
    { 
      setLoginError("Invalid Credentials");

    }
  }

  function handleRegister() {
    navigate("/register");
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <form>
          

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
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid mb-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
             {loginError &&(<p style={{color:"red"}}>{loginError}</p>)}
          <div className="d-grid">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;