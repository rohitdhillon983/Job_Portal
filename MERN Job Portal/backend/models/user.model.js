const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        required:true
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, // URL to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, 
        profilePhoto:{
            type:String,
            default:""
        }
    },
    education:{
        type:[{
            degree:{type:String},
            college:{type:String},
            year:{type:Number}
        }],
        default:[]
    },
    experience:{
        type:[{
            title:{type:String},
            company:{type:String},
            location:{type:String},
            from:{type:Date},
            to:{type:Date},
            description:{type:String}
        }],
        default:[]
    },
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
},{timestamps:true});
const User = mongoose.model('User', userSchema); 
module.exports = User;