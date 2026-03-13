import mongoose from "mongoose";
async function ConnectDB(){
    try{
   await mongoose.connect("mongodb://localhost:27017/TaskManagement");
   console.log("connection success");
    }
    catch(err)
    {
        console.log("error connection refused");
        console.log(err);
        process.exit(1);
    }
}
export default ConnectDB;