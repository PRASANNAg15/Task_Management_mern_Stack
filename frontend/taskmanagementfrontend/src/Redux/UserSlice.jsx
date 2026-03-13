import { createSlice } from "@reduxjs/toolkit";


const initialState={
    token:localStorage.getItem("token"),
    id:localStorage.getItem("userId"),
    role:localStorage.getItem("role")
}
const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload;
            localStorage.setItem("token",action.payload);
        },
        setUserId:(state,action)=>{
            state.id=action.payload;
            localStorage.setItem("userId",action.payload);
        },
        setRole:(state,action)=>{
            state.role=action.payload;
            localStorage.setItem("role",action.payload);
        }
    }
});
export const{setToken,setUserId,setRole}=userSlice.actions;
export default userSlice.reducer;