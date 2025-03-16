const userModel = require('../models/userModel');
const encriptpassword = require('../utils/EncriptPassword');
const tokenUtil = require('../utils/TokenUtil');

const adduser = async (req, res) => {
    try {
        // console.log("req...", req.body)        
        const data = req.body;
        // console.log("req...", data.password)        
        
        // Check if all required fields are provided
        if (!data) {
            return res.status(400).json({ message: "All fields are required" });
        }


        // Hash the password
        const encryptedPassword = await encriptpassword.hashPassword(data.password);
        // console.log("Hashed Password:", encryptedPassword);
        
        // Generate token
        const token = tokenUtil.generateToken(data.email);
        if (!token) {
            console.log("Failed to generate token.");
            return res.status(500).json({ message: "Failed to generate token" });
        }
        // console.log("Generated Token:", token);

        // Create user object
        const userDetail = { name: data.name, role: data.role, email: data.email, password: encryptedPassword, token };

        // Store user in DB
        const user = await userModel.create(userDetail);

        res.status(200).json({
            message: 'User added successfully',
            status: 'success',
            data: user
        });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({
            message: "Error in adding user",
            error: err.message
        });
    }
};

const getUser = async (req, res) => {
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

const userlogin = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await userModel.findOne({email:email})

        const comparepass = await encriptpassword.comparePassword(password, user.password)
        if(comparepass){
            res.status(200).json({
                message: 'User login successfully',
                status: 'success',
                data: user,
                token: token
            })
        }
    }catch(err){

    }
}

module.exports = {adduser, getUser, userlogin}