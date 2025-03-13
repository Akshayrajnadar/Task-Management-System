const userModel = require('../models/userModel');
const encriptpassword = require('../utils/EncriptPassword');
const tokenUtil = require('../utils/TokenUtil');

const adduser = async (req, res) => {

    try{
        const {name, email, password, role} = req.body;

        const encriptpassword = await encriptpassword.hashPassword(res.body.password)
        
        const token = tokenUtil.generateToken(res.body.email);
        if(!token){
            console.log("Fail to generate token.")
        }

        const userDetail = {...req.body, password:encriptpassword, token:token};
        
        const user =  await userModel.create(userDetail)

        res.status(200).json({
            message: 'User added successfully',
            status: 'success',
            data: user
        })
    }catch(err){
        res.json({
            message: "Error in ading user",
            error: err.message
        })
    }
}

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