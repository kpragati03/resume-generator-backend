const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Final fix: load dotenv without path

const app = express();
const PORT = process.env.PORT || 5000;

// Check if environment variables are loaded
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.error('Error: MONGO_URI or JWT_SECRET is not defined in the .env file.');
    process.exit(1);
}

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully!');
}).catch(err => {
    console.log(err);
});

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const resumeRoutes = require('./routes/resume');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const shareRoutes = require('./routes/share');

// Use routes
app.use('/api/resume', resumeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/share', shareRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Server is running and connected to MongoDB!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
