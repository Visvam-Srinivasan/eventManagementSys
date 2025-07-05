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