let express = require('express');
let router = express.Router();
let authController = require('./auth.controller');
let passport = require('passport');

router.get('/current_user', passport.authenticate('jwt', {session: false}), authController.getCurrentUser);
router.post('/register', authController.register);
router.post('/login',authController.login);
router.get('/logout',authController.logout);

module.exports = router;