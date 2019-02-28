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
        currentSalary: String,
        timeSpent: Number,
    }],
    uploads: [{
        link: {
            type: String,
        },
        default: {
            type: Boolean
        },
        doc_type: {
            type: String,
            enum: ['Resume', 'Cover Letter', 'Introduction Video', 'Certifications', 'Others']
        }
    }],
    applied_jobs: [{
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'job'
        },
        isRefered: {
            type: Boolean,
            default: false
        },
        reference: {
            name: String,
            email: String
        }
    }],
    references: [{
        name: String,
        organisationName: String,
        position: String,
        email: String,
        mobile: String
    }],
    skills: Array

});
module.exports = mongoose.model('candidate', candidateSchema);