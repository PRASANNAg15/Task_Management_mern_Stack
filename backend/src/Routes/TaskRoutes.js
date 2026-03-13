import express from "express";
import {createTask,deleteTask,updateTask,getAllTasks,getTaskById} from "../Controllers/TaskController.js";

const router=express.Router();
router.get("/",getAllTasks);
router.get("/:id",getTaskById);
router.post("/add",createTask);
router.delete("/delete/:id",deleteTask);
router.patch("/update/:id",updateTask);

export default router;