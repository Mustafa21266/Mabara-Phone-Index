const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    extension: {
        type: mongoose.Schema.ObjectId,
        ref: 'Extension',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

module.exports = mongoose.model('Pin', pinSchema)