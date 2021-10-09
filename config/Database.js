const config = require('config'); 
const mongoose = require('mongoose'); 
const URI = config.get('mongoUri'); 

const connectDB = async ()=>{
    try {
        await mongoose.connect(URI,{
            useNewUrlParser: true ,
            useUnifiedTopology: true 
        }); 
        console.log("Mongodb connected");
    } catch (err) {
        console.error("server crashed")
        
    }
}

module.exports = connectDB; 