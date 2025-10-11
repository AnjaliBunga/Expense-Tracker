const mongoose = require('mongoose');
const dbconnect = async(req,res)=>{
    const connect = await mongoose.connect(process.env.MONGODBURL);
    console.log("Connected To MongoDb");
}
module.exports = dbconnect;