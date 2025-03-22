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
    console.log("Got inside get task by user id")
    try {
        const userid = req.params.id; // Correct naming
        console.log("User ID:", userid);

        // Check if userId is a valid MongoDB ObjectId
        // if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
        //     return res.status(400).json({ message: "Invalid user ID format" });
        // }

        // Query tasks by userId (ensure field name matches database schema)
        const tasks = await taskModel.find({ userid });

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

const updatetaskbyid = async(req, res) => {
    try{
        const id  = req.params.id;
        console.log(id);
        const updatedData = req.body;
        console.log(updatedData);
        const task = await taskModel.findByIdAndUpdate({id:id},{updatedData:updatedData});
        if(task){
            res.status(200).json({message: "Task updated successfully", data:task});
        }
    }
    catch(err){
        res.status(500).json({message: "Error in updating task", error:err.message});
    }
    }

    const updateTaskStatus = async (req, res) => {
        try {
            console.log("req.params", req.params.id);
            console.log("req.body", req.body);
    
            const id = req.params.id;
            const { status } = req.body; // Destructure the status from body
    
            console.log("Got all the data");
    
            const task = await taskModel.findByIdAndUpdate(
                id,
                { stauts: status }, // Use correct field name and structure
                { new: true } // Return updated task
            );
    
            if (task) {
                console.log("Task updated successfully");
                res.status(200).json({ message: "Task updated successfully", data: task });
            } else {
                res.status(404).json({ message: "Task not found" });
            }
        } catch (err) {
            res.status(500).json({ message: "Error in updating task", error: err.message });
        }
    };
    

module.exports = {addTask, getTask, getUserTask, updateUsersTask, deleteTask, getTaskByUserId, updatetaskbyid, updateTaskStatus};