const taskModel = require('../model/taskModel');

const addTask = async (req, res) => {
    try{
        const {task, status, description, duedate} = req.body;
        const taskDetail = await taskModel.create(res.body);
        if(taskDetail){
            res.status(201).json({message: "Task added successfully", data:taskDetail});
        }
    }catch(err){
        res.status(500).json({message: "Error in adding task", error:err.message});
    }
}

const getTask = async (req, res) => {
    try{
        const task = await taskModel.find();
        if(task){
            res.status(200).json({message: "Fetched task successfully", data:task});
        }
    }catch(err){
        res.status(500).json({message: "Error in getting task", error:err.message});
    }
}

const getUserTask = async (req, res) => {
    try{
        const {id} = req.body;
        const task = await taskModel.find(id);
        if(task){
            res.status(200).json({message: "Fetched task successfully", data:task});
        }
    }catch(err){
        res.status(500).json({message: "Error in getting task", error:err.message});
    }
}

const updateUsersTask = async(req, res) => {
    try{
        const id  = req.params.id;
        const updatedData = req.body;
        const task = await taskModel.findByIdAndUpdate({id:id},{updatedData:updatedData});
        if(task){
            res.status(200).json({message: "Task updated successfully", data:task});
        }
    }catch(err){
        res.status(500).json({message: "Error in updating task", error:err.message});
    }
}

const deleteTask = async(req, res) => {
    try{
        const id = req.params.id;
        const task = await taskModel.findByIdAndDelete(id);
        if(task){   
            res.status(200).json({message: "Task deleted successfully", data:task});
        }
}catch(err){
    res.status(500).json({message: "Error in deleting task", error:err.message});
}
}

module.exports = {addTask, getTask, getUserTask, updateUsersTask, deleteTask}