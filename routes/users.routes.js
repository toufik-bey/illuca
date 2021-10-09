const express = require('express'); 
const router = express.Router(); 
const userControllers = require("../controller/users.controllers");
const validationCheck = require('../Middleware/validationCheck');
const auth = require('../Middleware/auth');


router.post('/register',validationCheck,userControllers.register);
router.get("/home",auth,(req,res)=>{
    res.send('login')
})

module.exports = router; 