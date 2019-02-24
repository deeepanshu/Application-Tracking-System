const mongoose = require('mongoose');
const jobsSchema = new mongoose.Schema({
    jobType: {
        type: String,
        enum: ['Full Time', 'Part Time', 'Intern']
    },
    isHotJob: {
        type: Boolean,
        default: false
    },
    targetDate: {
        type: String,
    },
    profile: String,
    package: String,
    description: String,
    educationalRequirements:[
        {type: String}
    ],
    location:{
        type: String
    },
    experience: String,
    keywords: [
        {type: String}
    ],
    attachments: [
        {
            link: {
                type: String,
                required: true
            },
            attachmentType: {
                type: String,
                enum: ['Job Description', 'Other']
            }
        }
    ],
    createdAt: Date,
    isActive: {
        type: Boolean,
        default: true
    },
    numberOfVacancies: Number,
    jobCreater: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    jobHandler: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});
module.exports = mongoose.model('job', jobsSchema);