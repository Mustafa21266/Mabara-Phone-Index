const mongoose = require('mongoose');
const ticketHTMLImagesSchema = new mongoose.Schema({
    ticket: {
        type: mongoose.Schema.ObjectId,
        ref: 'Ticket'
    },
    ticketHTML: {
        type: mongoose.Schema.ObjectId,
        ref: 'TicketHTML'
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



module.exports = mongoose.model('TicketHTMLImages', ticketHTMLImagesSchema)