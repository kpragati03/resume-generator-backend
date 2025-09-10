const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    // ✅ ADDED: Profession field
    profession: {
        type: String,
        default: ''
    },
    education: [{
        degree: String,
        institution: String,
        year: String
    }],
    experience: [{
        company: String,
        role: String,
        duration: String,
        description: String
    }],
    skills: {
        type: [String]
    },
    score: {
        type: Number,
        default: 0
    },
    selectedTemplate: {
        type: String,
        default: 'classic'
    },
    color: {
        type: String,
        default: '#007bff'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Resume', ResumeSchema);