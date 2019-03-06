const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    departmentName: {
        type: String,
        required: true
    },
    profiles: [{
        type: String,
        required: true
    }]
});

module.exports = mongoose.model('department', departmentSchema);