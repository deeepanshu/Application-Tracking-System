let Login = require('./../../models/login.model');
let Candidate = require('./../../models/candidate.model');
const sendgrid = require('../../services/sendgrid');
let jwt = require('jsonwebtoken');
let keys = require('./../../config/keys');
let template = require('../../services/sendgrid/templates');
var randomstring = require("randomstring");
module.exports = {
    getCurrentUser: (req, res) => {
        res.json(req.user);
    },
    register: (req, res) => {
        if (!req.body.email || !req.body.password) {
            res.json({
                success: false,
                message: 'Please enter email and password'
            });
        } else {
            Candidate.findOne({
                email: req.body.email
            }, (err, doc) => {
                if (err || doc) {
                    console.log("err", err, doc);
                    return res.json({
                        success: false,
                        message: "Email exists"
                    });
                } else {
                    let user = new Candidate({
                        name: req.body.name,
                        email: req.body.email
                    });
                    user.save((err, savedUser) => {
                        if (err) {
                            console.log(err);
                            return res.json({
                                success: false,
                                message: "Email exists",
                                err
                            })
                        }
                        if (savedUser) {
                            let newLogin = new Login({
                                email: req.body.email,
                                password: req.body.password,
                                userId: savedUser._id,
                                isLoginAllowed: false
                            });
                            newLogin.save((err, saved) => {
                                if (err) {
                                    console.log(err);
                                    return res.json({
                                        success: false,
                                        message: "Email exists"
                                    });
                                }

                                let token = randomstring.generate();
                                let sendgridConfig = template.candidateSignUp(newLogin.email, token, "SignUp Verification");
                                sendgrid(sendgridConfig);
                                res.json({
                                    success: true,
                                    saved
                                });
                            });
                        }
                    });
                }
            });

        }
    },
    login: (req, res) => {
        Login.findOne({
            email: req.body.email
        }, (err, login) => {
            if (err) throw err;
            if (!login) return res.send({
                success: false,
                message: 'Auth failed'
            })
            if (!login.isLoginAllowed) return res.send({
                success: false,
                message: 'Auth failed'
            })
            else {
                login.comparePassword(req.body.password, (err, isMatch) => {
                    if (isMatch && !err) {
                        let token = jwt.sign({
                            userId: login.userId,
                            email: login.email,
                            role: login.role
                        }, keys.JWT_SECRET, {
                            expiresIn: 100800
                        });
                        res.json({
                            success: true,
                            token: `${token}`,
                            expiresIn: 100800
                        });
                    } else {
                        res.json({
                            success: false,
                            message: 'Auth failed, password'
                        });
                    }
                });
            }
        });
    },
    logout: (req, res) => {

    }
}