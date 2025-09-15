const mongoose = require('mongoose');
const ticketImagesSchema = new mongoose.Schema({
    ticket: {
        type: mongoose.Schema.ObjectId,
        ref: 'Ticket'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        // required: true
    },
    url: {
        type: String,
        // required: true
    },
    idForImages: {
        type: String,
        required: true
    }
})



module.exports = mongoose.model('ArticleImages', ticketImagesSchema)