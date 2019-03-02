let Login = require('./../../models/login.model');
let Candidate = require('./../../models/candidate.model');
let Verification = require('./../../models/verification.model');
const sendgrid = require('../../services/sendgrid');
let jwt = require('jsonwebtoken');
let keys = require('./../../config/keys');
let template = require('../../services/sendgrid/templates');
var randomstring = require("randomstring");
const moment = require('moment');
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
                                let currentTime = moment();
                                let verification = new Verification();
                                verification.userId = savedUser._id;
                                verification.resource.resourceType = 'email';
                                verification.resource.value = saved.email;
                                verification.identifier = token;
                                verification.timeCreated = currentTime;
                                verification.timeOfExpiration = currentTime.add(1, 'd');
                                verification.save((err, savedVerification) => {
                                    if (err) return res.json({
                                        success: false
                                    });
                                    let sendgridConfig = template.candidateSignUp(newLogin.email, token, "SignUp Verification");
                                    sendgrid(sendgridConfig);
                                    res.json({
                                        success: true,
                                        saved
                                    });
                                })
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

    },
    validateEmail: (req, res) => {
        /*
        0- failed
        1- success
        2- already
        */
        console.log(req.params.identifier);
        Verification.findOne({
            identifier: req.params.identifier,
            'resource.resourceType': 'email'
        }).populate('userId', 'name email isVerified', 'candidate').exec((err, found) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    message: "Error Occured",
                    status: 0
                });
            }
            if (!found) {
                return res.json({
                    success: false,
                    message: "Record Not Found",
                    status: 0
                });
            } else {
                if (found.userId.isVerified.email || found.status === "V") {
                    let token = jwt.sign({
                        userId: found.userId._id,
                        email: found.userId.email,
                        role: 'ROLE_CANDIDATE'
                    }, keys.JWT_SECRET, {
                        expiresIn: 100800
                    });
                    return res.json({
                        token: token,
                        expiresIn: 100800,
                        success: true,
                        message: "Already Verified",
                        status: 2,
                        isMobileVerified: found.userId.isVerified.contact ? true : false
                    });
                } else if (found.status === "NH") {
                    found.status = "V";
                    Candidate.findOneAndUpdate({
                            _id: found.userId
                        }, {
                            $set: {
                                'isVerified.email': true
                            }
                        }, {
                            new: true
                        },
                        (err, candidate) => {
                            console.log(err, candidate);
                        });
                    found.save((err, update) => {
                        if (err) {
                            console.log(err);
                            return res.json({
                                success: false,
                                message: "Error Occured",
                                status: 2
                            });
                        } else {
                            let token = jwt.sign({
                                userId: found.userId._id,
                                email: found.userId.email,
                                role: 'ROLE_CANDIDATE'
                            }, keys.JWT_SECRET, {
                                expiresIn: 100800
                            });
                            return res.json({
                                token: token,
                                expiresIn: 100800,
                                success: true,
                                status: 1
                            });
                        }
                    })
                } else if (found.status === "NV") {

                }
            }
        })
    },

    verifyMobile: (req, res) => {
        let header = req.headers.authorization;
        console.log(header);
        if (!header && !req.body.mobile) {
            return res.json({
                success: false,
                message: "Cant Initiate"
            });
        } else {
            try {
                let token = header.split(" ")[1];
                console.log(token);
                if (!token) {
                    return res.json({
                        success: false,
                        message: "Cant Initiate"
                    });
                }
                let decoded = jwt.verify(token, keys.JWT_SECRET);
                let contact = req.body.mobile;
                let otp = Math.floor(100000 + Math.random() * 900000);
                console.log(otp);
                let currentTime = moment();
                let verification = new Verification();
                verification.userId = decoded.userId;
                verification.resource.resourceType = 'mobile';
                verification.resource.value = decoded.email;
                verification.identifier = otp;
                verification.timeCreated = currentTime;
                verification.timeOfExpiration = currentTime.add(3, 'm');
                Candidate.findOneAndUpdate({
                    _id: decoded.userId
                }, {
                    $set: {
                        contact
                    }
                }, {
                    new: true
                }, (err, updated) => {
                    if (err) throw err;
                    if (updated) {
                        verification.save((err, savedVerifcation) => {
                            if (err) throw err;
                            return res.json({
                                success: true
                            });
                        })
                    }
                })
            } catch (err) {
                console.log(err);
                return res.json({
                    success: false,
                    message: "Cant Verify"
                });
            }

        }
        let token
    },
    validateMobile: (req, res) => {
        Verification.findOne({
            identifier: req.params.identifier,
            'resource.resourceType': 'mobile'
        }).populate('userId', 'name email', 'candidate').exec((err, found) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    message: "Error Occured"
                });
            }
            if (!found) {
                return res.json({
                    success: false,
                    message: "Error Occured"
                });
            } else {
                if (found.status === "NH") {
                    found.status = "V";
                    Candidate.findOneAndUpdate({
                        _id: found.userId
                    }, {
                        $set: {
                            'isVerified.contact': true
                        }
                    }, {
                        new: true
                    }, (err, candidate) => {
                        console.log(err, candidate);
                    });
                    found.save((err, update) => {
                        if (err) {
                            console.log(err);
                            return res.json({
                                success: false,
                                message: "Error Occured"
                            });
                        } else {
                            return res.json({
                                success: true,
                                message: "OTP Verified"
                            });
                        }
                    });
                } else if (found.status === "V") {
                    res.json({
                        status: true,
                        message: "already verified"
                    });
                } else if (found.status === "NV") {

                }
            }
        })
    },
    isValidated: (req, res) => {
        let header = req.headers.authorization;
        console.log(header);
        if (!header) {
            return res.status(401);
        } else {
            try {
                let token = header.split(" ")[1];
                console.log(token);
                if (!token) {
                    return res.status(401);
                }
                let decoded = jwt.verify(token, keys.JWT_SECRET);
                Candidate.findOne({
                    _id: decoded.userId
                }, (err, candidate) => {
                    if (err) return res.status(401);
                    if (!candidate) return res.status(401);
                    res.status(200).json(candidate);
                })
            } catch (err) {
                return res.status(401);
            }
        }
    }
}