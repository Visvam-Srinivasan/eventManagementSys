const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type : String, required: true },
    email: { type: String, required: true, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'organizer', 'participant'],
        required: true
    },
    organizerRole: {
        type: String,
        required: true
    },
    organizerRole: {
        type: String,
        enum: ['head', 'member', null],
        default: null
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
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

module.exports = mongoose.model('User', userSchmea);