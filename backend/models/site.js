const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please Enter Site Name!'],
        maxlength: [150, 'Site Name cannot exceed 150 characters']
    },
    location: {
        type: String,
        trim: true,
        required: [true, 'Please Enter Site Location!'],
        maxlength: [250, 'Site Location cannot exceed 250 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

module.exports = mongoose.model('Site', siteSchema)