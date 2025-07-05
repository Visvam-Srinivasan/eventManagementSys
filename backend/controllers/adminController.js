const User = require('../models/User');

exports.getOrganizationHeads = async (req, res) => {
    try {
        const heads = await User.find({ role: 'organizer', organizerRole: 'head' }).populate('organization', 'name');
        res.json(head);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getOrganizationMembers = async (req, res) => {
    try {
        const members = await User.find({ role: 'organizer', organizerRole: 'member' }).populate('organization', 'name');
        res.json(members);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getParticipants = async (req, res) => {
    try {
        const participants = await User.find({ role: 'participant'});
        res.json(participants);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}