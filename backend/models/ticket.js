const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const ticketSchema = new mongoose.Schema({
    ticketNumber: {
        type: Number,
        unique: true
    },
    ticketHeadline: {
        type: String,
        trim: true,
        required: [true, 'Please Enter ticket headline!'],
        maxlength: [150, 'Name cannot exceed 150 characters']
    },
    ticketIntro: {
        type: String,
        trim: true,
        required: [true, 'Please Enter ticket Intro!'],
        maxlength: [250, 'Name cannot exceed 250 characters']
    },
    ticketHTML: {
        type: String,
        required: [true, 'Please enter ticket content!'],
    },
    ticketCover: {
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    },
    user: {
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

userSchema.plugin(autoIncrement.plugin, { model: 'Ticket', field: 'ticketNumber' }); // Apply the plugin to 'userId'

module.exports = mongoose.model('Ticket', ticketSchema)