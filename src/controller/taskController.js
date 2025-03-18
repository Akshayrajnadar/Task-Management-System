const taskModel = require('../models/taskModel');

const addTask = async (req, res) => {
    try{
        const data =  req.body;
        console.log(data);
        const taskDetail = await taskModel.create(data);
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

const getTaskByUserId = async (req, res) => {
    try {
        const userId = req.params.id; // Correct naming
        console.log("User ID:", userId);

        // Check if userId is a valid MongoDB ObjectId
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        // Query tasks by userId (ensure field name matches database schema)
        const tasks = await taskModel.find({ userId });

        return res.status(200).json({
            message: "Fetched tasks successfully",
            data: tasks || [], // Return an empty array if no tasks are found
        });

    } catch (err) {
        console.error("Error fetching tasks:", err);
        return res.status(500).json({
            message: "Error in getting tasks",
            error: err.message,
        });
    }
};




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

module.exports = {addTask, getTask, getUserTask, updateUsersTask, deleteTask, getTaskByUserId}