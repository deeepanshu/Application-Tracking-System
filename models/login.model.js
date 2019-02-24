const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["ROLE_ADMIN", "ROLE_INTERVIEWER", "ROLE_CANDIDATE", "ROLE_MANAGER"]
    },
    attempts: {
        type: Number,
        default: 0
    },
    isLoginAllowed: {
        type: Boolean,
        default: true
    },
    passwordExpiryDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('login', loginSchema);