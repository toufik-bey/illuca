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
                 // implement 
                 await user.save(); 
                 const payload = {
                    user:{
                        id: user._id
                    }
                }; 
                console.log(payload.user.id);
    
                // create log in session 
                jwt.sign(payload , 
                    config.get("jwtSecret"),
                    {expiresIn:36000},
                    (err,token)=>{
                        if(err) throw err; 
                        // sending the token 
                        res.json({token}); 
                        
                        //verify and log in redirect
                        const decoded  = jwt.verify(token,config.get('jwtSecret')); 
                        console.log(decoded);
                        res.status(201).send('redirect user login'); 
                    }
                    );
              
 
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