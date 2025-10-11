const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter The Name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter The Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter The Password"]
    }
},{
    timestamps:true
})
module.exports = mongoose.model('user',userSchema);