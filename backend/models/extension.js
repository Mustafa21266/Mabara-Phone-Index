const mongoose = require('mongoose');

const extensionSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please Enter Extension Name!'],
        maxlength: [150, 'Extension Name cannot exceed 150 characters']
    },
    extension: {
        type: String,
        trim: true,
        required: [true, 'Please Enter Extension Number!']
    },
    site: {
        type: mongoose.Schema.ObjectId,
        ref: 'Site',
        required: true
    },
    floor: {
        type: mongoose.Schema.ObjectId,
        ref: 'Floor',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

module.exports = mongoose.model('Extension', extensionSchema)