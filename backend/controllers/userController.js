const User = require('../models/user');
const crypto = require('crypto');
const fetch = require('node-fetch')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        const token = jwt.sign({_id: user._id},"fghfghw132414as@!")
            const options = {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.status(200).cookie('token',token, options).json({
                success: true,
                token,
                message: 'Logged in successfully!',
                user
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: 'An error has occured'
        })
    }
}
exports.loginUser = async (req, res, next) => {
    try{
        const { username, password } = req.body;
        console.log(username)
    let user = await User.findOne({ username: username}).select("+password")
    if(user){
        let isCorrectPassword = await bcrypt.compare(password, user.password)
        if(isCorrectPassword){
            //IMPORTANT [[[[[[[[[[[[[[[[[[[USER]]]]]]]]]]]]]]]]]]]
            const token = jwt.sign({_id: user._id},"fghfghw132414as@!")
            const options = {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            secure: true, // Ensure this is true in production
            sameSite: "None", // This allows cross-site requests
            maxAge: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 day
            path: "/",
            }
            user = await User.findOne({ username: username})
            res.status(200).cookie('token',token, options).json({
                success: true,
                token,
                message: 'Logged in successfully!',
                user
            })
        }
    }else {
        res.status(401).json({
            success: false,
            message: "Username & Passwords don't match"
        })
    }
    }catch(err){
        res.status(500).json({
            success: false,
            message: "An error has ocurred"
        })
    }
    
}

exports.getUserDetails = async (req, res, next) => {
    try{
        console.log(req._id)
    let user = await User.findOne({ _id: req.user._id})
    if(user){
        const token = jwt.sign({_id: user._id},"fghfghw132414as@!")
        const options = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        console.log(user)
        res.status(200).cookie('token',token, options).json({
            success: true,
            token,
            message: 'Logged in successfully!',
            user
        })
    }else {
        res.status(404).json({
            success: false,
            message: "No user logged in"
        })
    }
    }catch(err){
        res.status(500).json({
            success: false,
            message: "An error has ocurred"
        })
    }
    
}



exports.logoutUser = async (req, res, next) => {
    const userObj = await User.findById(req.user._id)
    if (!userObj) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    }else {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            message: "Logged out Successfully!"
        })
    }

}


//Forgot Password       =>    /api/v1/password/forgot

exports.forgotPassword = async (req, res, next) => {
    console.log(req.body.phoneNo)
    console.log({ phoneNo: '+201553786175' })
    const { phoneNo } = req.body;
    const user = await User.findOne({ phoneNo: phoneNo});
    console.log(user)
    if(!user){
         return res.status(404).json({
            success: false,
            message: 'لا يوجد مستخدم بهذا الرقم!',
        })
    }
    //Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    //Create reset password URL
    const resetURL = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`
    // const resetURL = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
    const message = `Your password reset URL is:\n\n${resetURL}\n\nif you haven't requested a password reset please ignore this message!`;
    try {
        // client.messages
        //     .create({
        //         body: message,
        //         from: '+19723626780',
        //         to: user.phoneNo

        //     })
        //     .then(message => {
        //         console.log(message.sid)
            
        //     });
        res.status(200).json({
            success: true,
            message: `Password Reset Link Successfully Sent To ${user.phoneNo}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return res.status(500).json({
            success: false,
            message: 'حدث خطأ ما!',
        })
    }

}

//Reset Password       =>    /api/v1/password/reset/:token

exports.resetPassword = async (req, res, next) => {
    //HASH URL Token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    let user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if(!user){
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    }
    if(req.body.password !== req.body.confirmPassword){
        return res.status(401).json({
            success: false,
            message: "PhoneNo & Passwords don't match"
        })
    }
    //Setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    const token = jwt.sign({_id: user._id},"fghfghw132414as@!")
            const options = {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            user = await User.findById(user._id)
            res.status(200).cookie('token',token, options).json({
                success: true,
                token,
                message: 'Logged in successfully!',
                user
            })
}

exports.editUserDetails = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    }else {
        console.log(req.body.password, req.body.confirmPassword, user.role)
        if(req.body.password === req.body.confirmPassword){
            // const user = await User.findById(req.params.id);
            user.name = req.body.name
            user.username = req.body.username
            user.email = req.body.email
            user.password = req.body.password
            await user.save();
            res.status(200).json({
                success: true,
                message: 'User Details Updated Successfully!',
                user
            })
        }else {
            res.status(401).json({
                success: false,
                message: "Password and Confirm Password Don't Match!"
            })
        }
    }  
    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'An error has occured'
        })
    }
}
