const mongoose = require('mongoose');
const interviewerModel = mongoose.Schema({
    name: String,
    email: String,
    contact: String,
    role: String
});

mongoose.model('interviewer', interviewerModel);