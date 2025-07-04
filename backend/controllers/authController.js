const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

exports.loginUser = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const user = await User.findOne({ email, role });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compate(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials"} );

        const token = generateToken(user._id, user.role);
        res.json({ 
            token, 
            role: user.role,
            approved: user.approved,
            name: user.name
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

exports.registerUser = async (req, res) => {
    const { name, email, password, role, institution, organizerRole, organization } = req.body;

    try {
        const existingUser = await User.findOne({ email, role });
        if (existingUser) return res.status(400).json({ message: "Email already in use" });

        const hashedPassword = await bcrypt.hash(password, 10);

        let approved = false;

        if (role === 'organizer') {
            approved = false;
        } 

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            institution,
            organizerRole: role === 'organizer' ? organizerRole : null,
            organization: role === 'organizer' ? organization : null,
            approved
        })

        await newUser.save();
        return res.status(201).json({ message: approved ? 'Registered successfully' : 'Account pending approval' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

exports.approveUser = async (req, res) => {
    const approver = req.user;
    const { id } = req.params;

    try {
        const userToApprove = await User.findById(id);
        if (!userToApprove) return res.status(404).json({ message: 'User not found'} );

        //Admin approving Head of Organization
        if (approver.role === 'admin') {
            if (userToApprove.role === 'organizer' && userToApprove.organizerRole === 'head') {
                userToApprove.approved = true;
                await userToApprove.save();
                return res.status(200).json({ message: 'Head organizer approved by admin.' });
            } else {
                return res.status(403).json({ message: 'Admin can only approve head of organization' });
            }
        }

        //Head of organization approving Members
        if (
            approver.role === 'organizer' &&
            approver.organizerRole === 'head'
        ) {
            if (
                userToApprove.role === 'organizer' &&
                userToApprove.organizerRole === 'member' &&
                String(userToApprove.organization) === String(approver.organization)
            ) {
                userToApprove.approved = true;
                await userToApprove.save();
                return res.status(200).json({ message: 'Member approved by head' });
            } else {
                return res.status(403).json({ message: 'Head can only approve members' });
            }

        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error.' });
    }
}
