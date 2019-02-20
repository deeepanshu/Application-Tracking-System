let express = require('express');
let router = express.Router();
let authController = require('./auth.controller');

router.get('/current_user',authController.getCurrentUser);
router.post('/login',authController.login);
router.get('/logout',authController.logout);

module.exports = router;