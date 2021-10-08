const express = require('express'); 
const router = express.Router(); 
const {check, validationResult} = require('express-validator'); 
const User = require('../Models/Users'); 


router.post('/',[
    check('userName','userName required').not().isEmpty(),
    check('email','please type valid email').isEmail(),
    check('password','type password greater then').isLength({min:8})
]
, async (req,res)=>{
    const {userName,email,password} = req.body; 
   const errors = validationResult(req);
   if(! errors.isEmpty()){
      res.status(400).json({msg: errors.array()}); 
   }

   try {
       let user = await User.find({email:email}); 
       if(user == []) {
           res.status(400).send('User already exist')
       }
     
        user = new User({
            userName:userName,
            email:email,
            password:password
        })

        await user.save(); 

        // implement 
        res.json('user saved '); 



   } catch (error) {
       console.error(error.message);
       res.status(500).json({msg:error.message}); 
   }
}); 

module.exports = router; 