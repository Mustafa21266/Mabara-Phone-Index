const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

const ticketSchema = new mongoose.Schema({
    ticketNumber: {
        type: Number,
        required: true,
        unique: true
    },
    ticketTitle: {
        type: String,
        trim: true,
        required: [true, 'Please Enter ticket title!'],
        maxlength: [150, 'Name cannot exceed 150 characters']
    },
    category: {
        type: String,
        trim: true,
        required: [true, 'Please Enter ticket category!'],
        enum: {
            values: ['Infrastructure', 'Application', 'Others'],
            message: 'Please select correct category'
        }
    },
    subcategory: {
        type: String,
        trim: true,
        required: [true, 'Please Enter ticket subcategory!'],
        enum: {
            values: ['Hardware', 'Software', 'Networking', 'System', 'Others', 'PrimeCare'],
            message: 'Please select correct subcategory'
        }
    },
    ticketHTML: {
        type: String,
        required: [true, 'Please enter ticket content!'],
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
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        // required: true
    },
    assignedTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        // required: true
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: String,
        trim: true,
        required: [true, 'Please Enter ticket status!'],
        default: 'Open',
        enum: {
            values: ['Open', 'In Progress', 'Solved', 'Closed', 'Escalated'],
            message: 'Please select correct status'
        }
    },
    idForImages: {
        type: String,
        required: true
    }
})

// ticketSchema.plugin(autoIncrement.plugin, { model: 'Ticket', field: 'ticketNumber' }); // Apply the plugin to 'userId'

module.exports = mongoose.model('Ticket', ticketSchema)