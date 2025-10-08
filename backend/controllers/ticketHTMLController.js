const TicketHTML = require('../models/ticketHTML');
const TicketHTMLImages = require('../models/ticketHTMLImages');
const User = require('../models/user');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const fetch = require('node-fetch')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const streamifier = require('streamifier');


exports.createTicketHTML = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        let ticketHTML = await TicketHTML.create(req.body)
        ticketHTML = await TicketHTML.findById(ticketHTML._id).populate('createdBy').populate('assignedTo').populate('site').populate('department')
        res.status(200).json({
            success: true,
            message: 'TicketHTML Created Successfully!',
            ticketHTML
        })
    }
}


exports.editTicketHTML = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        let newData = {
            ticketHTML: req.body.ticketHTML
        }
        let ticketHTML = await TicketHTML.findByIdAndUpdate(req.params.id, newData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        ticketHTML = await TicketHTML.findById(req.params.id).populate('createdBy').populate('assignedTo').populate('site').populate('department')
        res.status(200).json({
                    success: true,
                    message: 'TicketHTML Editied Successfully!',
                    ticketHTML
        })

    }
}

exports.changeTicketHTMLStatus = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        console.log("asdasdasdasdasd")
        let newData = {
            status: req.body.status
        }
        let ticketHTML = await TicketHTML.findByIdAndUpdate(req.params.id, newData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        ticketHTML = await TicketHTML.findById(req.params.id).populate('createdBy').populate('assignedTo').populate('site').populate('department')
        res.status(200).json({
            success: true,
            message: 'TicketHTML Status Changed Successfully!',
            ticketHTML
        })
        

    }
}


exports.deleteTicketHTML = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        let ticketHTML = await TicketHTML.findById(req.params.id)
        // let ticketHTMLImages = await TicketHTMLImages.find({ idForImages: ticketHTML.idForImages })
        // if (ticketHTMLImages) {
        //     for (let i = 0; i < ticketHTMLImages.length; i++) {
        //         await cloudinary.v2.uploader.destroy(ticketHTMLImages[i].public_id)
        //         await ticketHTMLImages[i].remove();
        //     }
        // }
        await TicketHTML.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: 'TicketHTML Deleted Successfully!',
            ticketHTML
        })
    }
}


exports.searchTicketHTMLs = async (req, res, next) => {
    console.log(req.query.searchTerm)
    let searchObj = {
        ticketHTMLHeadline: {
            $regex: req.query.searchTerm,
            $options: 'i'
        },
        ticketHTMLIntro: {
            $regex: req.query.searchTerm,
            $options: 'i'
        }
    }
    if (req.query.searchTerm !== "") {
        console.log("1")
        let ticketHTMLs = await TicketHTML.find(searchObj).sort({ 'createdAt': req.query.orderBy })
        res.status(200).json({
            success: true,
            ticketHTMLs
        })
    } else {
        console.log("2")
        let ticketHTMLs = await TicketHTML.find().sort({ 'createdAt': req.query.orderBy })
        res.status(200).json({
            success: true,
            ticketHTMLs
        })
    }

}



exports.addTicketHTMLImage = async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    }
    let ticketHTMLImage = await TicketHTMLImages.create(req.body)
    const myPromise = new Promise(async (resolve, reject) => {
        let response;
        let cld_upload_stream = await cloudinary.v2.uploader.upload_stream(
            {
                folder: `dadswebsite/ticketHTMLs/images`
            },
            function (error, resultObj) {
                // console.log(error, result);
                response = resultObj
                resolve(response);
            }
        );
        await streamifier.createReadStream(req.files.ticketHTMLImage.data).pipe(cld_upload_stream);
    });
    myPromise.then(async (result) => {
        // console.log('asdasdasasdasdasdasddasd',result)
        ticketHTMLImage.public_id = result.public_id
        ticketHTMLImage.url = result.secure_url
        ticketHTMLImage.user = req.params.id
        await ticketHTMLImage.save();
        return result.secure_url
    }).then(async (url) => {
        console.log("finaly")
        ticketHTMLImage = await TicketHTMLImages.findById(ticketHTMLImage._id)
        return res.status(200).json({
            "link": url
        })
    })


}

exports.deleteTicketHTMLImage = async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    }
    console.log(req.body)
    let ticketHTMLImage = await TicketHTMLImages.findOne({ url: req.body.src })
    if (ticketHTMLImage) {
        console.log(ticketHTMLImage)
        await cloudinary.v2.uploader.destroy(ticketHTMLImage.public_id)
        await ticketHTMLImage.remove();
        return res.status(200).json({
            success: true
        })
    }
}


exports.getAllTicketHTMLs = async (req, res, next) => {
    const ticketHTMLs = await TicketHTML.find().populate('createdBy').populate('ticket').sort({ 'createdAt': 1 })
    if(ticketHTMLs){
        res.status(200).json({
            success: true,
            ticketHTMLs
        })
    }else {
        res.status(200).json({
            success: true,
            ticketHTMLs: []
        })
    }
}
