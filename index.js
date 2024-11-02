const express = require('express');
const mongoose= require('mongoose');
require('dotenv').config();

const serverPort = process.env.SERVER_PORT;

const app : any|Express = express();

mongoose.connect('mongodb://localhost:27017/TestApp'), ():void=>{
    app.listen(serverPort,():void=>{
        console.log(`server up & running on ${serverPort}`)
    })
}

app.get('/test',(req, res)=>{
    return res.json('server Works');
})
