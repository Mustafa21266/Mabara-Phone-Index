const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

const ticketHTMLSchema = new mongoose.Schema({
    ticketHTML: {
        type: String,
        required: [true, 'Please enter ticket content!'],
    },
    ticket: {
            type: mongoose.Schema.ObjectId,
            ref: 'Ticket'
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    idForImages: {
        type: String,
        required: true
    }
})

// ticketSchema.plugin(autoIncrement.plugin, { model: 'Ticket', field: 'ticketNumber' }); // Apply the plugin to 'userId'

module.exports = mongoose.model('TicketHTML', ticketHTMLSchema)