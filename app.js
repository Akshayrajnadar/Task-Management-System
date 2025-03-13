const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors = require('cors');
app.use(cors());

//router
const userRouter = require('./src/routes/userRoute');

//router use
app.use('/user', userRouter);

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