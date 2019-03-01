const mongoose = require('mongoose');
const interviewerModel = mongoose.Schema({
    name: String,
    email: String,
    contact: String,
    department: String,
    profile: String,
});

module.exports = mongoose.model('interviewer', interviewerModel);