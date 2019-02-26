let express = require('express');
let router = express.Router();
let authController = require('./auth.controller');
let Login = require('./../../models/login.model');
let passport = require('passport');
let jwt = require('jsonwebtoken');

let keys = require('./../../config/keys');
router.get('/current_user', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json(req.user);
});

router.post('/register', (req, res) => {
    if(!req.body.email || !req.body.password) {
        res.json({success: false, message: 'Please enter email and password'});
    } else {
        let newLogin = new Login({
            email: req.body.email,
            password: req.body.password,
        });
        newLogin.save((err, saved) => {
            if(err){
                console.log(err);return res.json({success: false, message: "Email exists"})
            }
            res.json({success: true, saved});
        })
    }
});


router.post('/login',(req, res) => {
    Login.findOne({
        email: req.body.email
    }, (err, login) => {
        if(err) throw err;
        if(!login) res.send({success: false, message: 'Auth failed'})
        else {
            login.comparePassword(req.body.password, (err, isMatch)=>{
                if(isMatch && !err) {
                    let token = jwt.sign(login.toObject(), keys.JWT_SECRET, {
                        expiresIn: 10080
                    });
                    res.json({success: true, token: `JWT ${token}`});
                } else {
                    res.json({success: false, message: 'Auth failed, password'});
                }
            });
        }
    });
});
router.get('/logout',authController.logout);

module.exports = router;