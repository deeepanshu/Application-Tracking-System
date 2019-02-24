const mongoose = require('mongoose');
const interviewerModel = mongoose.Schema({
    name: String,
    email: String,
    contact: String,
    role: {
        type: String,
        enum: ['HR', 'Technical', 'Others']
    }
});

module.exports = mongoose.model('interviewer', interviewerModel);