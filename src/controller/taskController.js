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
        console.log("Reach Backend getTaskByUserId");
        const {userId}  = req.body; // Correct usage of req.body
        console.log("User ID:", userId);

        // Validate userId format (optional but recommended)
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        // Correct query to fetch tasks by userId
        const tasks = await taskModel.find({ userid: userId });

        return res.status(200).json({
            message: "Fetched tasks successfully",
            data: tasks, // Return fetched tasks
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