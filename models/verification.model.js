const mongoose = require('mongoose');
const verificationSchema = mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'candidate'
    },
    email:{
        email: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    },
    contact: {
        contact:{
            type: String,
            required: true
        },
        otp: {
            type: Number,
            required: true
        },
        expiryDate: Date
    }
});
module.exports = mongoose.model('verification', verificationSchema);
