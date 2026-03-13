import axios from "axios";
const API_URL="http://localhost:5000/users";
const token=localStorage.getItem("token");
export const createUser=async(data)=>{
    return axios.post(`${API_URL}/add`,data,{
        headers:{
            'Content-Type':'application/json'
        }
    });
}

export const loginUser=async(data)=>{
    return axios.post(`${API_URL}/auth`,data,{
        headers:{
            'Content-Type':'application/json'
        }
    });
}
export const deleteUser=async(id)=>{
    return axios.delete(`${API_URL}/delete/${id}`);
}
export const updateUser=async(id,data)=>{
    return axios.patch(`${API_URL}/update/${id}`,data,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    });
}
export const getAllUsers=async()=>{
    return axios.get(`${API_URL}`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    });
}


export const getUserById=async(id)=>{
    return axios.get(`${API_URL}/${id}`,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    });
}