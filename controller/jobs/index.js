let router = require('express').Router();
let jobController = require('./jobs.controller');

router.post('/add', jobController.addJob);

module.exports = router;