const express = require('express'); 
const router = express.Router(); 
const userControllers = require("../controller/users.controllers");
const validationCheck = require('../Middleware/validationCheck');


router.post('/register',validationCheck,userControllers.register); 

module.exports = router; 