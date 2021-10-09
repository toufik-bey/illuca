const connectDB = require('./config/Database'); 
const express = require('express');
const app = express(); 



//connecting database 
connectDB(); 

//JSON stringify 
app.use(express.json({extended:false})); 

// application routes 
app.use('/api/users', require('./routes/users.routes')); 

// init the server 
app.listen(5000); 
console.log('server running on port 5000'); 