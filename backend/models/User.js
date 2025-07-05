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
    contactNumber: {
        type: String,
        required: true,
        validate: {
        validator: function (v) {
            return /^[6-9]\d{9}$/.test(v); // basic validation for Indian phone numbers
        },
        message: props => `${props.value} is not a valid phone number!`
        }
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

userSchema.index({ email: 1, role: 1 }, { unique: true });
module.exports = mongoose.model('User', userSchmea);