const mongoose = require('mongoose');
const interviewSchema = mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'candidate'
    },
    interviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'interviewer'
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job'
    },
    status: {
        type: Number,
        require: true,
        default: -1
    },
    date: String,
    time: String
});
mongoose.model('interview', interviewSchema);