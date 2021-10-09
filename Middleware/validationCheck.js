const {check, validationResult} = require('express-validator'); 


const validationCheck = [[
    check('userName','userName required').not().isEmpty(),
    check('email','please type valid email').isEmail(),
    check('password','type password greater then 8').isLength({min:8})
],(req,res,next)=>{
    const errors = validationResult(req);
    
    if(! errors.isEmpty()){
       res.status(400).json({msg: errors.array()}); 
    }
    next()
}
]
module.exports = validationCheck