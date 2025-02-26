const mongoose = require('mongoose');

 const userSchema =new mongoose.schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    gender:{
        type:String,
        enum:['male', 'female', 'other'],
        required:true
    }

 }, { timestamps: true})

 export const user = mongoose.model('User',userSchema)