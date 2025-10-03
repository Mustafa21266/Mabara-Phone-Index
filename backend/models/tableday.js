const mongoose = require('mongoose');

const tabledaySchema = new mongoose.Schema({
    startDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    startTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    endTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    timetable: {
        type: mongoose.Schema.ObjectId,
        ref: 'TimeTable',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

module.exports = mongoose.model('TableDay', tabledaySchema)