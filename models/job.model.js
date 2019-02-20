const mongoose = require('mongoose');
const jobsSchema = new mongoose.Schema({
    type: String,
    profile: String,
    description: String,
    educationalRequirements:[
        {type: String}
    ],
    locations: [
        {type: String}
    ],
    experience: String,
    keywords: [
        {type: String}
    ],
    numberOfVacancies: Number
});
mongoose.model('job', jobsSchema);