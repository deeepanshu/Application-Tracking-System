const mongoose = require('mongoose');
const candidateSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isVerified:{
        email: {
            type: Boolean,
            default: false
        },
        contact: {
            type: Boolean,
            default: false
        }
    },
    contact: {
        type: String,
        required: true
    },
    address:{
        houseAndFlat: String,
        locality: String,
        city: String,
        state: String,
        country: String
    },
    education: [
        {
            institution: String,
            degree: String,
            yearStarted: Number,
            yearEnded: Number
        }
    ],
    employment: [
        {
            companyName: String,
            profile: String,
            timeSpent: Number,
        }
    ],
    uploads: {
        resume: String,
        introduction: String
    },
    interviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'interview'
        }
    ]
});
mongoose.model('candidate', candidateSchema);