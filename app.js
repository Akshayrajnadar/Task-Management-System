const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors = require('cors');
app.use(cors());

//router
const userRouter = require('./src/routes/userRoute');
const taskRouter = require('./src/routes/taskRoute');
const adminRouter = require('./src/routes/adminRoute');

//router use
app.use('/user', userRouter);
app.use('/task', taskRouter);
app.use('/admin', adminRouter);

//db connection

mongoose.connect('mongodb://localhost:27017/TMS')
    .then(()=>{
        console.log("DB connected")
    })
    .catch((err)=>{
        console.log("DB connection failed")
    })


//create server

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})