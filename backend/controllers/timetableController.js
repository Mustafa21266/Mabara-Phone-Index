const TimeTable = require('../models/timetable');
const TableDay = require('../models/tableday');
const User = require('../models/user');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const fetch = require('node-fetch')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const streamifier = require('streamifier');


exports.createTimeTable = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        let timetable = await TimeTable.create(req.body)
        // article = await Article.findById(article._id).populate('user')
        res.status(200).json({
            success: true,
            message: 'TimeTable Created Successfully!',
            timetable
        })
    }
}


exports.editTimeTable = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        let newData = {
            name: req.body.name,
            department: req.body.department,
            site: req.body.site
        }
        let timetable = await TimeTable.findByIdAndUpdate(req.params.id, newData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        timetable = await TimeTable.findById(req.params.id)
        res.status(200).json({
                    success: true,
                    message: 'TimeTable Editied Successfully!',
                    timetable
                })
        }

    }

exports.deleteTimeTable = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        let timetable = await TimeTable.findById(req.params.id)
        await TimeTable.findByIdAndDelete(req.params.id)
        await TableDay.deleteMany({timetable: req.params.id })
        res.status(200).json({
            success: true,
            message: 'TimeTable Deleted Successfully!',
            timetable
        })
    }
}


// exports.searchArticles = async (req, res, next) => {
//     console.log(req.query.searchTerm)
//     let searchObj = {
//         articleHeadline: {
//             $regex: req.query.searchTerm,
//             $options: 'i'
//         },
//         articleIntro: {
//             $regex: req.query.searchTerm,
//             $options: 'i'
//         }
//     }
//     if (req.query.searchTerm !== "") {
//         console.log("1")
//         let articles = await Article.find(searchObj).sort({ 'createdAt': req.query.orderBy })
//         res.status(200).json({
//             success: true,
//             articles
//         })
//     } else {
//         console.log("2")
//         let articles = await Article.find().sort({ 'createdAt': req.query.orderBy })
//         res.status(200).json({
//             success: true,
//             articles
//         })
//     }

// }



// exports.addArticleImage = async (req, res, next) => {
//     const user = await User.findById(req.params.id)
//     if (!user || user.role !== 'admin') {
//         res.status(401).json({
//             success: false,
//             message: 'Unauthorized Action!',
//         })
//     }
//     let articleImage = await ArticleImages.create(req.body)
//     const myPromise = new Promise(async (resolve, reject) => {
//         let response;
//         let cld_upload_stream = await cloudinary.v2.uploader.upload_stream(
//             {
//                 folder: `dadswebtimetable/articles/images`
//             },
//             function (error, resultObj) {
//                 // console.log(error, result);
//                 response = resultObj
//                 resolve(response);
//             }
//         );
//         await streamifier.createReadStream(req.files.articleImage.data).pipe(cld_upload_stream);
//     });
//     myPromise.then(async (result) => {
//         // console.log('asdasdasasdasdasdasddasd',result)
//         articleImage.public_id = result.public_id
//         articleImage.url = result.secure_url
//         articleImage.user = req.params.id
//         await articleImage.save();
//         return result.secure_url
//     }).then(async (url) => {
//         console.log("finaly")
//         articleImage = await ArticleImages.findById(articleImage._id)
//         return res.status(200).json({
//             "link": url
//         })
//     })


// }

// exports.deleteArticleImage = async (req, res, next) => {
//     const user = await User.findById(req.params.id)
//     if (!user || user.role !== 'admin') {
//         res.status(401).json({
//             success: false,
//             message: 'Unauthorized Action!',
//         })
//     }
//     console.log(req.body)
//     let articleImage = await ArticleImages.findOne({ url: req.body.src })
//     if (articleImage) {
//         console.log(articleImage)
//         await cloudinary.v2.uploader.destroy(articleImage.public_id)
//         await articleImage.remove();
//         return res.status(200).json({
//             success: true
//         })
//     }
// }


// exports.getAllArticles = async (req, res, next) => {
//     const articles = await Article.find().populate('user').sort({ 'createdAt': -1 })
//     if(articles){
//         res.status(200).json({
//             success: true,
//             articles
//         })
//     }else {
//         res.status(200).json({
//             success: true,
//             articles: []
//         })
//     }
// }
//Get all SITES for ADMIN ONLY
exports.getAllTimeTables = async (req, res, next) => {
    const timetables = await TimeTable.find().populate('department').populate('site')
        if(timetables){
            res.status(200).json({
                success: true,
                timetables
            })
        }else {
            res.status(200).json({
                success: true,
                timetables: []
            })
        }
}


// exports.editUserDetailsAdmin = async (req, res, next) => {
//     try {
//         const userObj = await User.findById(req.user._id)
//         if (!userObj || userObj.role !== 'admin') {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Unauthorized Action!',
//             })
//         } else {
//             const user = await User.findById(req.params.id);
//             user.name = req.body.name
//             user.role = req.body.role
//             user.phoneNo = req.body.phoneNo
//             await user.save();
//             res.status(200).json({
//                 success: true,
//                 message: 'User Details Updated Successfully!',
//                 user
//             })
//         }
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: 'An error has occured'
//         })
//     }
// }



// exports.deleteUserAdmin = async (req, res, next) => {
//     try {
//         const userObj = await User.findById(req.user._id)
//         if (!userObj || userObj.role !== 'admin') {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Unauthorized Action!',
//             })
//         } else {
//             const user = await User.findById(req.params.id);
//             let reservations = await Reservation.find({ user: user._id })
//             if (reservations) {
//                 for (let i = 0; i < reservations.length; i++) {
//                     await reservations[i].remove();
//                 }
//             }
//             let places = await Place.find({ user: user._id })
//             if (places) {
//                 for (let i = 0; i < places.length; i++) {
//                     await places[i].remove();
//                 }
//             }
//             if (user.avatar.public_id) {
//                 await cloudinary.v2.uploader.destroy(user.avatar.public_id)
//             }
//             await user.remove();
//             res.status(200).json({
//                 success: true,
//                 message: 'User Deleted Successfully!',
//                 user
//             })
//         }
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: 'An error has occured'
//         })
//     }
// }
