const adminModel = require('../models/adminModel');

const addAdmin = async (req, res) => {

    try{
        const {name, email, password, role} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const adminDetail = {...req.body, password: hashedPassword, role};

        const admin = await adminModel.create(adminDetail);

        if(admin){
            res.status(201).json({message: "Admin added successfully", data:admin});
        }
    }catch(err){
        res.status(400).json({message: "Error in adding admin", error: err.message});
    }
}

const adminlogin = async (req, res) =>{
    
}

module.exports = {addAdmin, adminlogin};