const express =  require('express');
const config = require('config');

const adminRelatedRoutes = require('./routes/admin');
const loginRelatedRoutes = require('./routes/login');
// const mysql = require('mysql');

const app = express();

app.use((request, response, next)=>{
    response.setHeader('Access-Control-Allow-Origin',"*");
    response.setHeader('Access-Control-Allow-Headers',"*");
    response.setHeader('Access-Control-Allow-Methods', "*")
    next();
})

app.use(express.json()); 

app.use('/admin',adminRelatedRoutes)
app.use('/login',loginRelatedRoutes);

const portNo = config.get("PORT");
app.listen(portNo,()=>{console.log("Server Started at " + portNo)})