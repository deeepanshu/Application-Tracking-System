const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

mongoose.model('login', loginSchema);