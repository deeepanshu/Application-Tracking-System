const mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let loginSchema = mongoose.Schema({
    userId: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["ROLE_ADMIN", "ROLE_INTERVIEWER", "ROLE_CANDIDATE", "ROLE_MANAGER"],
        default: "ROLE_CANDIDATE"
    },
    attempts: {
        type: Number,
        default: 0
    },
    isLoginAllowed: {
        type: Boolean,
        default: true
    },
    passwordExpiryDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

loginSchema.pre('save', function(next){
    let login = this;
    console.log(this);
    if( this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, function (err, salt){
            if(err){
                return next(err);
            }
            bcrypt.hash(login.password, salt, function(err, hash) {
                if(err) return next(err);
                login.password = hash;
                next();
            })
        })
    } else {
        return next();
    }
});

loginSchema.methods.comparePassword = function(pw, cb){
    bcrypt.compare(pw, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    })
}


module.exports = mongoose.model('login', loginSchema);