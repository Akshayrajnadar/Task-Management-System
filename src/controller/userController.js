const userModel = require('../models/userModel');
const generatetoken = require('../utils/TokenUtil');

const adduser = async (req, res) => {

    try{
        const {name, email, password, role} = req.body;
        const encriptpassword = generatetoken.generateToken(res.body.password)
        const userDetail = {...req.body, encriptpassword};
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

module.exports = {adduser, getUser}