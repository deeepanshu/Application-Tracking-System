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
        enum: ['Selected', 'Withdrawn', 'Not Selected', 'In Process']
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
            interviewer: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'interviewer'
                }
            ],
            comments: {
                type: String
            },
            feedback: {
                type: String
            }
            ,
            roundNo: Number,
            status: {
                type: String,
                enum: ['Not Selected', 'Cleared', 'Pending', 'Selected']
            },
            date: String,
            time: String
        }
    ]
    
});
module.exports = mongoose.model('interview', interviewSchema);