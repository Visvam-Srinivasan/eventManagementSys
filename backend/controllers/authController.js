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