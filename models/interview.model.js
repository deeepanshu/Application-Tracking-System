const mongoose = require('mongoose');
const interviewSchema = mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'candidate'
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job'
    },
    finalStatus: {
        type: String,
        enum: ['Selected', 'Withdrawn', 'Not Selected', 'In Process', 'Not Assigned', 'Assign Next'],
        default: 'Not Assigned'
    },
    interviews:[
        {
            interviewName: {
                type: String,
                enum: ['HR', 'Technical', 'Screening', 'General', 'Other']
            },
            interviewType: {
                type: String,
                enum: ['Telephonic', 'Face to Face', 'Skype']
            },
            interviewer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'interviewer'
            },
            comments: {
                type: String
            },
            feedback: {
                type: String
            },
            roundNo: Number,
            status: {
                type: String,
                enum: ['NOT SELECTED', 'NEXT ROUND', 'PENDING', 'SELECTED', 'NOT TAKEN YET'],
                default: 'NOT TAKEN YET'
            },
            date: String,
            time: String
        }
    ],
    isRefered: {
        type: Boolean,
        default: false
    },
    reference: {
        name: {
            type: String
        },
        email: {
            type: String
        }
    }
});
module.exports = mongoose.model('interview', interviewSchema);