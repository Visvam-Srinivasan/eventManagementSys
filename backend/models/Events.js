// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    summary: { 
        type: String, 
        required: true 
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    mode: {
        type: String,
        enum: ['online', 'offline', 'hybrid'],
        required: true
    },
    eventDate: { 
        type: Date, 
        required: true 
    },
    venue: { 
        type: String, 
        default: '' 
    },
    eligibility: {
        year: [{ type: String }], 
        department: [{ type: String }] 
    },
    teamSize: {
        min: { 
            type: Number, 
            default: 1 
        },
        max: { 
            type: Number, 
            default: 1 
        }
    },
    entryFee: { type: Number, default: 0 },
    registrationDeadline: { type: Date, required: true },
    fullEventDescription: { type: String, required: true },
    prizes: [
        {
            place: {type: String},
            amount: {type: Number}
        }
    ], 
    tags: [{ type: String }],
    contactNumber: { type: String, required: true },
    contactName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    posterUrl: { type: String, default: '' },
    isArchived: { type: Boolean, default: false },
    isTeamEvent: { type: Boolean, default: false },
    maxParticipants: { type: Number },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    rules: [{ type: String }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Auto-update `updatedAt`
eventSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Event', eventSchema);