const connectDB = require('./config/Database'); 
const express = require('express'); 

const app = express(); 



//connecting database 
connectDB(); 
// init the server 
app.listen(5000); 
console.log('server running on port 5000'); 