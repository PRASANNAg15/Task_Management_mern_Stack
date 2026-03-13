import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTaskById, updateTask,deleteTask } from "../Services/TaskService";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
function Home(){
  const navigate =useNavigate();
  const id=useSelector(state=>state.user.id);
  const[tasks,setTasks]=useState([]);
  const[updateId,setUpdateId]=useState("");
  const[isUpdate,setIsUpdate]=useState(false);
  const [updatetask, setUpdateTask] = useState({
    userId: "",
    taskName: "",
    taskDescription: "",
    taskDeadLine: "",
    taskStatus: "pending",
  });
 const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateTask((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(()=>{
    async function getTasks(){
      const res=await getTaskById(id);
      console.log(res);
      setTasks(res.data);
    }
    getTasks();
  },[id]);
  function handleLogOut(){
    localStorage.clear("token");
    localStorage.clear("userId");
    navigate("/");
  }
  async function deletetask(id)
  {
    const res=await deleteTask(id);
    console.log(res);
    alert("deleted successfully");
  }
  function handleUpdate(id){
    setUpdateId(id);
    setIsUpdate(true);
    
  }
  async function handleStatus(id){
    const data={
      taskStatus:"FINISHED"
    }
  const res=await updateTask(id,data);
  console.log(res);
  }
  async function handleSave()
  {
    const res=await updateTask(updateId,updateTask);
    alert("updated");
  }
    return(
        <>
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand fw-bold">Task Management  App</span>
        <div className="ms-auto d-flex align-items-center gap-3">
         
          <Link to="/tasks" className="nav-link text-white">
            Manage Tasks
          </Link>
          

          <Link to="/profile">
            <img
              src="./src/assets/profile.jpg"
              alt="Profile"
              className="rounded-circle"
              width="40"
              height="40"
            />
          </Link>

          <button
            className="btn btn-danger btn-sm"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </nav>
       {tasks.length>0 &&tasks.map(tasks=>(
       <div className="container mt-4">

     <div className="card shadow ">
       <div className={`card-body mb-3 ${tasks.taskStatus === "FINISHED" ? "bg-success text-white" : ""}`}>
           
          <h5 className="card-title">{tasks.taskName}</h5>

          <p className="card-text">
            <strong>Description:</strong> {tasks.taskDescription}
          </p>

          <p className="card-text">
            <strong>Deadline:</strong> {tasks.taskDeadline}
          </p>

          <p className="card-text">
            <strong>Status:</strong> 
            <span className="badge bg-warning ms-2">
              {tasks.taskStatus}
            </span>
          </p>
           <button className="btn btn-danger" onClick={()=>deletetask(tasks._id)}>Delete</button>
            {tasks.taskStatus!=="FINISHED" &&(
           <button className="btn btn-secondary" onClick={()=>handleUpdate(tasks._id)}>Update</button>
            )}
             {tasks.taskStatus!=="FINISHED" &&(
           <button className="btn btn-primary" onClick={()=>handleStatus(tasks._id)}>Completed</button>
           )}
        </div>
      </div>
    </div>  ))}
     {tasks.length===0 &&(
          <p align="center">No tasks added</p>)}
    
   
    {isUpdate &&(
      <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-warning text-dark">
          <h4 className="mb-0">Update Task</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label className="form-label fw-bold">User ID</label>
              <input
                type="text"
                className="form-control"
                name="userId"
                value={id}
                onChange={handleChange}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Task Name</label>
              <input
                type="text"
                className="form-control"
                name="taskName"
                value={updatetask.taskName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Task Description</label>
              <textarea
                className="form-control"
                name="taskDescription"
                value={updatetask.taskDescription}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Deadline</label>
              <input
                type="date"
                className="form-control"
                name="taskDeadLine"
                value={updatetask.taskDeadLine?.split("T")[0]} 
                onChange={handleChange}
                required
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleSave()}>
              Update Task
            </button>
            <button className="btn btn-danger" onClick={()=>setIsUpdate(false)}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
    )}
        </>
    )
}
export default Home;