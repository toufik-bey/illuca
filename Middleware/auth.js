const jwt = require('jsonwebtoken'); 
const config = require('config'); 

module.exports = function (req, res, next) {
    const token =  req.header('x-auth-token'); 
    console.log(token);
    console.log('this is token')
    if(!token){
        return res.status(401).json({msg:'No token'})
    };  

    // verify token 

    try {
        const decoded  = jwt.verify(token,config.get('jwtSecret'));
        req.user = decoded; 
        next(); 
    }
    catch(err){

        res.status(401).json({msg:'token no valid'}); 

    }
    
}




