const Ticket = require('../models/ticket');
const TicketImages = require('../models/ticketImages');
const User = require('../models/user');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const fetch = require('node-fetch')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const streamifier = require('streamifier');


exports.createTicket = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        let ticket = await Ticket.create(req.body)
        ticket = await Ticket.findById(ticket._id).populate('user')
        res.status(200).json({
            success: true,
            message: 'Ticket Created Successfully!',
            ticket
        })
        // const myPromise = new Promise(async (resolve, reject) => {
        //     let response;
        //     let cld_upload_stream = await cloudinary.v2.uploader.upload_stream(
        //         {
        //             folder: `dadswebsite/tickets/${ticket._id}`
        //         },
        //         async function (error, resultObj) {
        //             // console.log(error, result);
        //             response = resultObj
        //             ticket.ticketCover = {
        //                 public_id: response.public_id,
        //                 url: response.secure_url
        //             }
        //             await ticket.save()
        //             resolve(response)
        //         }
        //     );
        //     await streamifier.createReadStream(req.files["ticketCover"].data).pipe(cld_upload_stream);
        // });
        // await myPromise.then(async data => {
        // })
    }
}


exports.editTicket = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        let newData = {
            ticketHeadline: req.body.ticketHeadline,
            ticketIntro: req.body.ticketIntro,
            ticketHTML: req.body.ticketHTML
        }
        let ticket = await Ticket.findByIdAndUpdate(req.params.id, newData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        ticket = await Ticket.findById(req.params.id)
        console.log(ticket)
        console.log(req.body.ticketCover, ticket.ticketCover.url)
        if (req.body.ticketCover === ticket.ticketCover.url) {

        } else {
            await cloudinary.v2.uploader.destroy(ticket.ticketCover.public_id)
            const myPromise = new Promise(async (resolve, reject) => {
                let response;
                let cld_upload_stream = await cloudinary.v2.uploader.upload_stream(
                    {
                        folder: `dadswebsite/tickets/${ticket._id}`
                    },
                    function (error, resultObj) {
                        // console.log(error, result);
                        response = resultObj
                        resolve(response);
                    }
                );
                await streamifier.createReadStream(req.files["ticketCover"].data).pipe(cld_upload_stream);
            });
            myPromise.then(async (result) => {
                // console.log('asdasdasasdasdasdasddasd',result)
                ticket.ticketCover = {
                    public_id: result.public_id,
                    url: result.secure_url
                }
                await ticket.save()
                ticket = await Ticket.findById(req.params.id).populate('user')
                res.status(200).json({
                    success: true,
                    message: 'Ticket Editied Successfully!',
                    ticket
                })
            })
        }

    }
}

exports.deleteTicket = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        let ticket = await Ticket.findById(req.params.id)
        await cloudinary.v2.uploader.destroy(ticket.ticketCover.public_id)
        let ticketImages = await TicketImages.find({ idForImages: ticket.idForImages })
        if (ticketImages) {
            for (let i = 0; i < ticketImages.length; i++) {
                await cloudinary.v2.uploader.destroy(ticketImages[i].public_id)
                await ticketImages[i].remove();
            }
        }
        await Ticket.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: 'Ticket Deleted Successfully!',
            ticket
        })
    }
}


exports.searchTickets = async (req, res, next) => {
    console.log(req.query.searchTerm)
    let searchObj = {
        ticketHeadline: {
            $regex: req.query.searchTerm,
            $options: 'i'
        },
        ticketIntro: {
            $regex: req.query.searchTerm,
            $options: 'i'
        }
    }
    if (req.query.searchTerm !== "") {
        console.log("1")
        let tickets = await Ticket.find(searchObj).sort({ 'createdAt': req.query.orderBy })
        res.status(200).json({
            success: true,
            tickets
        })
    } else {
        console.log("2")
        let tickets = await Ticket.find().sort({ 'createdAt': req.query.orderBy })
        res.status(200).json({
            success: true,
            tickets
        })
    }

}



exports.addTicketImage = async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    }
    let ticketImage = await TicketImages.create(req.body)
    const myPromise = new Promise(async (resolve, reject) => {
        let response;
        let cld_upload_stream = await cloudinary.v2.uploader.upload_stream(
            {
                folder: `dadswebsite/tickets/images`
            },
            function (error, resultObj) {
                // console.log(error, result);
                response = resultObj
                resolve(response);
            }
        );
        await streamifier.createReadStream(req.files.ticketImage.data).pipe(cld_upload_stream);
    });
    myPromise.then(async (result) => {
        // console.log('asdasdasasdasdasdasddasd',result)
        ticketImage.public_id = result.public_id
        ticketImage.url = result.secure_url
        ticketImage.user = req.params.id
        await ticketImage.save();
        return result.secure_url
    }).then(async (url) => {
        console.log("finaly")
        ticketImage = await TicketImages.findById(ticketImage._id)
        return res.status(200).json({
            "link": url
        })
    })


}

exports.deleteTicketImage = async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    }
    console.log(req.body)
    let ticketImage = await TicketImages.findOne({ url: req.body.src })
    if (ticketImage) {
        console.log(ticketImage)
        await cloudinary.v2.uploader.destroy(ticketImage.public_id)
        await ticketImage.remove();
        return res.status(200).json({
            success: true
        })
    }
}


exports.getAllTickets = async (req, res, next) => {
    const tickets = await Ticket.find().populate('user').sort({ 'createdAt': -1 })
    if(tickets){
        res.status(200).json({
            success: true,
            tickets
        })
    }else {
        res.status(200).json({
            success: true,
            tickets: []
        })
    }
}
