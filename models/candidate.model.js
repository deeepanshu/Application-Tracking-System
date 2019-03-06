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
    isVerified: {
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
        type: String
    },
    address: {
        houseAndFlat: String,
        locality: String,
        city: String,
        state: String,
        country: String
    },
    education: [{
        institution: {
            type: String,
            required: true
        },
        degree: String,
        yearStarted: Number,    
        yearEnded: Number,
        stillPursuing: {
            type: Boolean,
            deafult: false
        }
    }],
    employment: [{
        companyName: String,
        profile: String,
        timeSpent: Number,
    }],
    uploads: [{
        link: {
            type: String,
        },
        docType: {
            type: String,
            enum: ['Resume', 'Cover Letter', 'Introduction Video', 'Certifications', 'Others']
        }
    }],
    references: [{
        name: String,
        organisationName: String,
        position: String,
        email: String,
        mobile: String
    }],
    skills: Array,
    isSignUpComplete: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('candidate', candidateSchema);