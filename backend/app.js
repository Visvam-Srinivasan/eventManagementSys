const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB error: ', err));

app.use('/api/authentication/', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port ${PORT}"));