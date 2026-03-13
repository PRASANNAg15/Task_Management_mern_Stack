import mongoose from "mongoose";
const taskSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    taskName:{type:String,required:true},
    taskDescription:{type:String,required:true},
    taskDeadline:{type:Date,required:true},
    taskStatus:{type:String,enum:["PENDING","FINISHED"],default:"PENDING"},

},{timestamps:true});

const Task=mongoose.model("Task",taskSchema);

export default Task;