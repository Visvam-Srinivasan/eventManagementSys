const getPagination = require('../utils/pagination');
const User = require('../models/User');

exports.getOrganizationHeads = async (req, res) => {
    try {
        const heads = await User.find({ role: 'organizer', organizerRole: 'head' })
            .select('_id name email approved organization')
            .populate('organization', 'name')
            .skip(skip)
            .limit(limit);

        const total = await User.countDocuments({ role: 'organizer', organizerRole: 'head'});

        res.json({ total, page, limit, data: heads});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getOrganizationMembers = async (req, res) => {
    try {
        const members = await User.find({ role: 'organizer', organizerRole: 'member' })
            .select('_id name email approved organization')
            .populate('organization', 'name')
            .skip(skip)
            .limit(limit);

        const total = await User.countDocuments({ role: 'organizer', organizerRole: 'member'});

        res.json({ total, page, limit, data: members});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getParticipants = async (req, res) => {
    try {
        const participants = await User.find({ role: 'participant'})
            .select('_id name email approved')
            .skip(skip)
            .limit(limit);

        const total = await User.countDocuments({ role: 'participant'});
        
        res.json({ total, page, limit, data: participants});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('organization', 'name');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}