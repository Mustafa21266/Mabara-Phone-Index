const PC = require('../models/pc');
const User = require('../models/user');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const fetch = require('node-fetch')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const streamifier = require('streamifier');


exports.createPC = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        try {
                let pc = await PC.create(req.body)
                    res.status(200).json({
                        success: true,
                        message: 'PC Created successfully!',
                        pc
                })
            }catch(err){
                res.status(500).json({
                    success: false,
                    message: 'An error has occured'
                })
            }
    }
}


exports.editPC = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        let newData = {
            pcHeadline: req.body.pcHeadline,
            pcIntro: req.body.pcIntro,
            pcHTML: req.body.pcHTML
        }
        let pc = await PC.findByIdAndUpdate(req.params.id, newData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        pc = await PC.findById(req.params.id)
        console.log(pc)
        console.log(req.body.pcCover, pc.pcCover.url)
        if (req.body.pcCover === pc.pcCover.url) {

        } else {
            await cloudinary.v2.uploader.destroy(pc.pcCover.public_id)
            const myPromise = new Promise(async (resolve, reject) => {
                let response;
                let cld_upload_stream = await cloudinary.v2.uploader.upload_stream(
                    {
                        folder: `dadswebsite/pcs/${pc._id}`
                    },
                    function (error, resultObj) {
                        // console.log(error, result);
                        response = resultObj
                        resolve(response);
                    }
                );
                await streamifier.createReadStream(req.files["pcCover"].data).pipe(cld_upload_stream);
            });
            myPromise.then(async (result) => {
                // console.log('asdasdasasdasdasdasddasd',result)
                pc.pcCover = {
                    public_id: result.public_id,
                    url: result.secure_url
                }
                await pc.save()
                pc = await PC.findById(req.params.id).populate('user')
                res.status(200).json({
                    success: true,
                    message: 'PC Editied Successfully!',
                    pc
                })
            })
        }

    }
}

exports.deletePC = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        let pc = await PC.findById(req.params.id)
        await cloudinary.v2.uploader.destroy(pc.pcCover.public_id)
        let pcImages = await PCImages.find({ idForImages: pc.idForImages })
        if (pcImages) {
            for (let i = 0; i < pcImages.length; i++) {
                await cloudinary.v2.uploader.destroy(pcImages[i].public_id)
                await pcImages[i].remove();
            }
        }
        await PC.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: 'PC Deleted Successfully!',
            pc
        })
    }
}


exports.searchPCs = async (req, res, next) => {
    console.log(req.query.searchTerm)
    let searchObj = {
        pcHeadline: {
            $regex: req.query.searchTerm,
            $options: 'i'
        },
        pcIntro: {
            $regex: req.query.searchTerm,
            $options: 'i'
        }
    }
    if (req.query.searchTerm !== "") {
        console.log("1")
        let pcs = await PC.find(searchObj).sort({ 'createdAt': req.query.orderBy })
        res.status(200).json({
            success: true,
            pcs
        })
    } else {
        console.log("2")
        let pcs = await PC.find().sort({ 'createdAt': req.query.orderBy })
        res.status(200).json({
            success: true,
            pcs
        })
    }

}



exports.addPCImage = async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    }
    let pcImage = await PCImages.create(req.body)
    const myPromise = new Promise(async (resolve, reject) => {
        let response;
        let cld_upload_stream = await cloudinary.v2.uploader.upload_stream(
            {
                folder: `dadswebsite/pcs/images`
            },
            function (error, resultObj) {
                // console.log(error, result);
                response = resultObj
                resolve(response);
            }
        );
        await streamifier.createReadStream(req.files.pcImage.data).pipe(cld_upload_stream);
    });
    myPromise.then(async (result) => {
        // console.log('asdasdasasdasdasdasddasd',result)
        pcImage.public_id = result.public_id
        pcImage.url = result.secure_url
        pcImage.user = req.params.id
        await pcImage.save();
        return result.secure_url
    }).then(async (url) => {
        console.log("finaly")
        pcImage = await PCImages.findById(pcImage._id)
        return res.status(200).json({
            "link": url
        })
    })


}

exports.deletePCImage = async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    }
    console.log(req.body)
    let pcImage = await PCImages.findOne({ url: req.body.src })
    if (pcImage) {
        console.log(pcImage)
        await cloudinary.v2.uploader.destroy(pcImage.public_id)
        await pcImage.remove();
        return res.status(200).json({
            success: true
        })
    }
}


exports.getAllPCs = async (req, res, next) => {
    const pcs = await PC.find().populate('user').sort({ 'createdAt': -1 })
    if(pcs){
        res.status(200).json({
            success: true,
            pcs
        })
    }else {
        res.status(200).json({
            success: true,
            pcs: []
        })
    }
}
