const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    nameArabic: {
        type: String,
        trim: true,
        required: [true, 'Please Enter Department Name!'],
        maxlength: [150, 'Department Name cannot exceed 150 characters']
    },
    nameEnglish: {
        type: String,
        trim: true,
        required: [true, 'Please Enter Department Name!'],
        maxlength: [150, 'Department Name cannot exceed 150 characters']
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

module.exports = mongoose.model('Department', departmentSchema)