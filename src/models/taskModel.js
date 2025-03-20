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
    adminid:{
        type:Schema.Types.ObjectId,
        ref:'admin',
    },
    userid:{
        type:Schema.Types.ObjectId,
        ref:'user',
        require: true
    },
    stauts:{
        type:String,
        enum:['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
        require: true
    }
}, {timestamps:true})

module.exports = mongoose.model('task', taskSchema)