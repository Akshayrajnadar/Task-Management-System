const mongoose  = require("mongoose")
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title:{
        type:String,
        require: true
    },
    description:{
        type:String,
    },
    duedate:{
        type:Date,
        require: true
    },
    stauts:{
        type:String,
        enum:['Pending', 'In Progress', 'Completed'],
        require: true
    }
}, {timestamps:true})