const userModel = require('../models/userModel');

const adduser = async (req, res) => {

    try{
        const {name, email, password, role} = req.body;
        const userDetail = {...req.body};
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
        const user = await userModel.find();
        res.status(200).json({
            message: 'User details',
            status: 'success',
            data: user
        })
    }catch(err){
        res.json({
            message: "Error in getting user",
            error: err.message
        })
    }
}

module.exports = {adduser, getUser}