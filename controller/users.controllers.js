const {check, validationResult} = require('express-validator'); 
const User = require('../Models/Users'); 
const bcrypt = require('bcrypt');

const register = async (req,res)=>{
    let {userName,email,password} = req.body; 
    
    
    try {
        let user = await User.find({email:email}); 
        if(user != []) {
           return res.status(409).send('User already exist')
        }
      // encryption of the password 
        bcrypt.genSalt(10, function (err, salt) {
            console.log(salt);
            bcrypt.hash(password, salt, async(err, hash) => {
             console.log(password);
             user = new User({
                 userName:userName,
                 email:email,
                 password:hash
             })
             try {
                await user.save();
                 // implement 
                res.json('user saved '); 
 
             } catch (error) {
                console.log("mongo db error");
             }
              
            });
        })
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
 }
module.exports={
    register,
}