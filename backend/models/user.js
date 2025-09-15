const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please Enter your name!'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    username: {
        type: String,
        required: [true, 'Please enter a username!'],
        minLength: [3, 'Username cannot be less than 3 characters!']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email!'],
        validate: [ validator.isEmail, 'invalid email' ]
    },
    password: {
        type: String,
        required: [true, 'Please enter a password!'],
        minLength: [6, 'Password cannot be less than 6 characters!'],
        select: false
    },
    role: {
        type: String,
        // required: [true, 'Please enter a role!'],
        // enum: {
        //     values: ['it-manager','it-support','application-support','network-admin','system-admin','team-leader','it-manager'],
        //     message: 'Please select correct role'
        // },
        default: 'it-support'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})


//Password Encryption before saving
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})
//Compare user password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//Geenerate password reset token
userSchema.methods.getResetPasswordToken = function(){
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
    //Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    //set token expiry time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    return resetToken
}

module.exports = mongoose.model('User', userSchema)