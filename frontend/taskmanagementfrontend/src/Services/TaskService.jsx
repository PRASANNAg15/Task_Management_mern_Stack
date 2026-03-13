import axios from "axios";
const API_URL="http://localhost:5000/tasks";
const token=localStorage.getItem("token");
export const addTask=async(data)=>{
    return axios.post(`${API_URL}/add`,data,{
        headers:{
            'Content-Type':'application/json'
        }
    });
}

export const deleteTask=async(id)=>{
    return axios.delete(`${API_URL}/delete/${id}`);
}
export const updateTask=async(id,data)=>{
    return axios.patch(`${API_URL}/update/${id}`,data,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    });
}
export const getAllTasks=async()=>{
    return axios.get(`${API_URL}`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    });
}
export const getTaskById=async(id)=>{
    return axios.get(`${API_URL}/${id}`,{
        headers:{
            'Content-Type':'application/json'
        }
    });
}