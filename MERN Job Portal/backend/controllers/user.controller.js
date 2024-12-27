const User  = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudinary");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
require("dotenv").config()

exports.register = async(req,res)=>{
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        // console.log(req.body)

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "! Account created unsuccessfully.",
            success: false,
        })
    }
}

exports.login = async(req,res)=>{
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        }) 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error to login the user",
            success: true
        })
    }
}

exports.logout = async(req,res)=>{
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(201).json({
            message: "Account Logout Unsuccessfully.",
            success: false
        })
    }
}

exports.updateProfile = async(req,res)=>{
    try {
        const { fullname, email, phoneNumber, bio, skills} = req.body;
        
        const file = req.file;
        // cloudinary ayega idhar
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);



        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
        // resume comes later here...
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }
        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
        res.status(201).json({
            message: "Account update unsuccessfully.",
            success: true
        })
    }
}

exports.forgetPassword=async(req,res)=>{
    const {email} = req.body
    // console.log("request",email)

    if(!email){
        return res.status(400).json({
            message: "Please enter the Email",
            success: false
        })
    }
    const matchEmail = await User.findOne({email:email})
    if(!matchEmail){
        return res.status(400).json({
            message: "User not found.",
            success: false
        })
    }
    const token = crypto.randomBytes(32).toString("hex")

    const updatedUser = await User.findOneAndUpdate({email},{token,resetPasswordExpires:Date.now()+3600000},{new:true})

    const url = `http://localhost:5173/reset-password/${token}`

    await mailSender(email,"Reset Password",`your Link for email Verification is ${url}. Please click this url to reset your Password`)

    res.json({
        success: true,
        message:
            "Email Sent Successfully, Please Check Your Email to Continue Further",
    });
}

exports.resetPassword=async(req,res)=>{
    const {token,password,confirmPassword} = req.body.input
    // console.log("request",req.body)
    if(!token || !password || !confirmPassword){
        return res.status(400).json({
            message: "Please enter the Token and Password",
            success: false
        })
    }
    if(password !== confirmPassword){
        return res.status(400).json({
            message: "Password does not match",
            success: false
        })
    }

    const user = await User.findOne({token,resetPasswordExpires:{$gt:Date.now()}})
    if(!user){
        return res.status(400).json({
            message: "Invalid or Expired Token",
            success: false
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword
    user.token = ""
    user.resetPasswordExpires = Date.now()
    await user.save()
    res.json({
        success: true,
        message: "Password Reset Successfully",
    });
}