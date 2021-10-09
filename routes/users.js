const express = require('express'); 
const router = express.Router(); 
const {check, validationResult} = require('express-validator'); 
const User = require('../Models/Users'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../Middleware/auth'); 


router.post('/',[   
    check('userName','userName required').not().isEmpty(),
    check('email','please type valid email').isEmail(),
    check('password','type password greater then').isLength({min:8})
]
, async (req,res)=>{
   let {userName,email,password} = req.body; 
   const errors = validationResult(req);
   if(! errors.isEmpty()){
      res.status(400).json({msg: errors.array()}); 
   }

   try {
       let user = await User.find({email:email}); 
       if(user == []) {
           res.status(400).send('User already exist')
       }
     // encryption of the password 
         bcrypt.genSalt(10,function (err, salt) {
           bcrypt.hash(password, salt, async(err, hash) => {
            user = new User({
                userName:userName,
                email:email,
                password:hash
            })
          
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
                    res.json({token}); 
                    //verify and log in redirect
                    const decoded  = jwt.verify(token,config.get('jwtSecret')); 
                    console.log(decoded);
                    res.status(201).send('redirect user login'); 
                }
                );
           });
       }); 
   } catch (error) {
       console.error(error.message);
       res.status(500).json({msg:error.message});
   }
}); 


router.get('/',auth,(req,res)=>{
    console.log('user register');
    res.send('token');
})
   
module.exports = router; 