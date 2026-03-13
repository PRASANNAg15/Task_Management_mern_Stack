import Task from "../models/taskModel.js";

export const createTask = async (req, res) => {
    try {
        const { userId, taskName, taskDescription, taskStatus,taskDeadline } = req.body;

        const saveTask = new Task({
            taskName,
            userId,
            taskDescription,
            taskDeadline,
            taskStatus
        });
        const saved = await saveTask.save();
        res.status(201).json(saved);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedTask) {
            res.status(400).json({ message: "Task Not found" });
        }
        res.status(200).json(updatedTask);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}

export const deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            res.status(400).json({ message: "Task Not found" });
        }
        res.status(200).json({ message: "Successfull" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "server error" });
    }
}

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}

export const getTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.find({userId:id});
        res.status(200).json(task);
        if (!task) {
            res.status(400).json({ message: "User Not found" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}
