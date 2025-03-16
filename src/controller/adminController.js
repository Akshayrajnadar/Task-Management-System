const adminModel = require('../models/adminModel');
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');

const addAdmin = async (req, res) => {

    try{
        const data = req.body;

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const adminDetail = {name:data.name, email:data.email, password: hashedPassword, role: data.role};

        const admin = await adminModel.create(adminDetail);

        if(admin){
            res.status(201).json({message: "Admin added successfully", data:admin});
        }
    }catch(err){
        res.status(400).json({message: "Error in adding admin", error: err.message});
    }
}

const getAllUsers = async (req, res) =>{
    try{
            console.log("get user")
            const user = await userModel.find();
            if(user){
                return res.status(200).json({
                    message: 'Fetched user successfully',
                    status: 'success',
                    data: user
                })
            }
        }catch(err){
            res.json({
                message: "Error in getting user",
                error: err.message
            })
    }
}

const adminlogin = async (req, res) =>{
    
}

const deleteUser = async (req, res) =>{
    try{
        const {id} = req.body
        const userdelete = await userModel.findByIdAndDelete(id)
        if(userdelete){
            res.json({
                message:"User deleted successfully!",
    
            })
        }
    }catch(err){
        res.json({
            message:"Not able to delete user",
            error:err.message
        })
    }
}

module.exports = {addAdmin, adminlogin, getAllUsers,deleteUser};