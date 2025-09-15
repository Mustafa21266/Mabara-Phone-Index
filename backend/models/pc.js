const mongoose = require('mongoose');

const pcSchema = new mongoose.Schema({
    pcName: {
        type: String,
        trim: true,
        required: [true, 'Please Enter PC Name!'],
        maxlength: [150, 'Name cannot exceed 150 characters']
    },
    pcDescription: {
        type: String,
        trim: true,
        required: [true, 'Please Enter PC Description!'],
        maxlength: [250, 'Name cannot exceed 250 characters']
    },
    processorGeneration: {
        type: String,
        trim: true,
        required: [true, 'Please Select Processor Generation!'],
        maxlength: [5, 'Processor Generation cannot exceed 5 characters']
    },
    pcManufacturer: {
        type: String,
        trim: true,
        required: [true, 'Please Select PC Manufacturer!'],
        maxlength: [150, 'Manufacturer cannot exceed 5 characters']
    },
    pcOS: {
        type: String,
        trim: true,
        required: [true, 'Please Select PC OS!'],
        maxlength: [150, 'OS cannot exceed 5 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

module.exports = mongoose.model('PC', pcSchema)