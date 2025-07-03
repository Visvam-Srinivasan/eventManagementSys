const mongoose = require("mongoose");

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MONGODB");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;