const mongoose = require('mongoose');
let sessionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sessionToken: {
        type: String,
        required: true
    },
    loginTime: {
        type: Date,
        required: true
    },
    inactiveTime: {
        type: Date,
        required: true
    },
    sessionClosed: {
        type: Boolean,
        default: false
    },
    location: {
        type: String,
    },
    browserData: {
        platform: {
            type: String
        },
        browserType: {
            type: String
        },
        ip: {
            type: String
        }
    }
});
module.exports = mongoose.model('session', sessionSchema);