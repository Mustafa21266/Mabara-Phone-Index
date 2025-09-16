const mongoose = require('mongoose');

const floorSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please Enter Floor Name!'],
        maxlength: [150, 'Floor Name cannot exceed 150 characters']
    },
    number: {
        type: String,
        trim: true,
        required: [true, 'Please Enter Floor Number!']
    }
    ,
        site: {
            type: mongoose.Schema.ObjectId,
            ref: 'Site',
            required: true
        },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

module.exports = mongoose.model('Floor', floorSchema)