let JWTStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
let jwt = require('jsonwebtoken');
let Login = require('./../models/login.model');
let keys = require('./../config/keys');

module.exports = function (passport) {
    let opts = {} ;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = keys.JWT_SECRET;
    passport.use(new JWTStrategy(opts, (jwt_payload, done)=>{
        console.log(jwt_payload);
        Login.findOne({id: jwt_payload.id}, (err, login) => {
            if(err) return done(err, false);
            if(login) done(null, login);
            else done(null, false);
        });
    }));  
};