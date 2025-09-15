const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    pc: {
        type: mongoose.Schema.ObjectId,
        ref: 'PC',
        // required: true
    },
    printer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Printer',
        // required: true
    },
    camera: {
        type: mongoose.Schema.ObjectId,
        ref: 'Camera',
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

module.exports = mongoose.model('Ticket', assetSchema)