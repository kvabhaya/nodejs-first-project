const express = require('express');
const mongoose= require('mongoose');
require('dotenv').config();

const serverPort = process.env.SERVER_PORT;

const app = express();

mongoose.connect('mongodb://localhost:27017/TestApp');

app.listen(serverPort,()=>{
    console.log(`server up & running on port ${serverPort}`)
})

app.get('/test',(req, res)=>{
    return res.json('server Works');
})
