const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    departmentName: {
        type: String,
        required: true
    },
    profiles: [
        {
            profile: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('department', departmentSchema);