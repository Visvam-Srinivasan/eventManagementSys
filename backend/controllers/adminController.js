const getPagination = require('../utils/pagination');
const User = require('../models/User');
const Organization = require('../models/Organization');

exports.getUnapprovedOrganizationHeads = async (req, res) => {
    try {
        const unapprovedHeads = await User.find({ role: 'organizer', organizerRole: 'head', approved: false})
            .select('_id name email approved organization')
            .populate('organization', 'name')
            .skip(skip)
            .limit(limit);

        const total = await User.countDocuments({ role: 'organizer', organizerRole: 'head', approved: false});

        res.json({ total, page, limit, data: unapprovedHeads});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getUnapprovedOrganizations = async (req, res) => {
    try {
        const unapprovedOrganizations = await Organization.find({ approved: false })
            .select('_id name institution approved')
            .skip(skip)
            .limit(limit);

        const total = await Organization.countDocuments({ approved: false })

        res.json({ total, page, limit, data: unapprovedOrganizations});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find()
            .select('_id name institution')
            .populate('organization', 'name')
            .skip(skip)
            .limit(limit);

        const total = await organizations.countDocuments();

        res.json({ total, page, limit, data: heads});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

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

exports.getOrganizationById = async (req, res) => {
    try {
        const organization = await Organization.findById(req.params.id)
            .populate('organization', 'name email contactNumber');
        if(!organization) return res.status(404),json({ message: 'Organization not found' });

        res.json(organization);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const allowedFields = ['name', 'email', 'role', 'organizerRole', 'organization', 'approved'];
        
        const update = {};
        for (let key of allowedFields) {
            if (req.body[key] !== undefined) update[key] = req.body[key];
        }

        const user = await User.findByIdAndUpdate(id, update, { new: true }).populate('organization', 'name');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'User updates successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error' });
    }
}