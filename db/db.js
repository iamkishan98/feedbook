const mongoose = require("mongoose");

const connectDB = async ()=>{
    const params = {
        useNewUrlParser:true,
        useUnifiedTopology: true
    };
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,params);
        console.log("feedbook-app database connected successfully");
    }
    catch(err){
        console.error(err);
    }
}

module.exports = connectDB;