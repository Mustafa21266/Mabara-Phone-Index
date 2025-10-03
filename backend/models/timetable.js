const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please Enter TimeTable Name!'],
        maxlength: [150, 'TimeTable Name cannot exceed 150 characters']
    },
    department: {
        type: mongoose.Schema.ObjectId,
        ref: 'Department',
        required: true
    },
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

module.exports = mongoose.model('TimeTable', timetableSchema)