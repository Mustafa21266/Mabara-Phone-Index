const Extension = require('../models/extension');
const Pin = require('../models/pin');
const User = require('../models/user');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const fetch = require('node-fetch')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const streamifier = require('streamifier');


exports.createPin = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        let pin = await Pin.create(req.body)
        // article = await Article.findById(article._id).populate('user')
        res.status(200).json({
            success: true,
            message: 'Pin Created Successfully!',
            pin
        })
    }
}

exports.deletePin = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        let pin = await Pin.findById(req.params.id)
        await Pin.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: 'Pin Deleted Successfully!',
            pin
        })
    }
}

//Get all SITES for ADMIN ONLY
exports.getAllPins = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        const pins = await Pin.find()
        if(pins){
            res.status(200).json({
                success: true,
                pins
            })
        }else {
            res.status(200).json({
                success: true,
                pins: []
            })
        }
    }
}