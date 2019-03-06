const mongoose = require('mongoose');
const verificationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    resource: {
        resourceType: {
            type: String,
            enum: ['email', 'mobile'],
            required: true
        },
        value: {
            type: String,
            required: true
        }
    },
    identifier: {
        type: String,
        required: true
    },
    timeCreated: Date,
    timeOfExpiration: Date,
    status: {
        type: String,
        enum: ['NH', 'V', 'NV'],
        default: 'NH'
    }
});
module.exports = mongoose.model('verification', verificationSchema);
