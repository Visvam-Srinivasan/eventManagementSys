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
        res.json({ token, role: user.role });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}