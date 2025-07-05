const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
    name: { 
        type : String, 
        required: true, 
        unique: true 
    },
    description: {
        type: String,
        default: ''
    },
    institution: {
        type: String,
        default: null
    },
    organizationHead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    approved: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Organization', organizationSchema);