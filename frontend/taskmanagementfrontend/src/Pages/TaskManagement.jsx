import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addTask, getAllTasks } from "../Services/TaskService";
function Task(){
  const role=useSelector(state=>state.user.role);
  const[tasks,setTasks]=useState([]);
  const id=useSelector(state=>state.user.id);
     const [task, setTask] = useState({
    taskName: "",
    taskDescription: "",
    taskDeadline: "",
    status:"PENDING",
    userId: id
  });
  useEffect(()=>{
    async function getTasks(){
      const res=await getAllTasks();
      console.log(res);
      setTasks(res.data);
    }
    getTasks();
  },[]);
  const handleChange = (e) => {
    const{name,value}=e.target;
    setTask({
      ...task,
      [name]:value
    });
  };
 async function deleteTask(id){
    const res=await deleteTask(id);
    console.log(res);
    alert("Deleted Successfully");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(task); 
  };
  async function saveTask(){
    try{
  const res=await addTask(task);
  alert("Added successfully");
    }
    catch(err)
    {
      console.log(err);
    }
  }
    return(
        <>
        {role==="USER" &&(
        <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Create Task</h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Task Name</label>
            <input
              type="text"
              className="form-control"
              name="taskName"
              value={task.taskName}
              onChange={handleChange}
              placeholder="Enter task name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="taskDescription"
              rows="3"
              value={task.taskDescription}
              onChange={handleChange}
              placeholder="Enter task description"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Deadline</label>
            <input
              type="date"
              className="form-control"
              name="taskDeadline"
              value={task.taskDeadline}
              onChange={handleChange}
              required
            />
          </div>

          

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" onClick={saveTask}>
              Create Task
            </button>
          </div>

        </form>
      </div>
    </div>)}
    {role==="ADMIN" &&(
       <div className="container mt-4">
      <div className="card shadow">
        {tasks.map(task=>(
        <div className="card-body">

          <h5 className="card-title">{task.taskName}</h5>

          <p className="card-text">
            <strong>Description:</strong> {task.taskDescription}
          </p>

          <p className="card-text">
            <strong>Deadline:</strong> {task.taskDeadline}
          </p>

          <p className="card-text">
            <strong>Status:</strong> 
            <span className="badge bg-warning ms-2">
              {task.taskStatus}
            </span>
          </p>
          <button className="btn btn-danger" onClick={()=>deleteTask(task._id)}>Delete</button>
        
        </div>
        ))}
      </div>
    </div>
    )}

        </>
    )
}
export default Task;