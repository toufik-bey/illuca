const mongoose = require('mongoose'); 


const UserSchema = new mongoose.Schema(
    {
        userName:{
            type: String , 
            require:true
        },
        email : {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type:String,
            required: true
        },
    
    }
);

module.exports=  User = mongoose.model('user', UserSchema); 