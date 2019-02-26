let express = require('express');
let router = express.Router();
let interviewerController = require('./interviewers.controller');

router.get('/', interviewerController.getInterviewers);
router.get('/:id', interviewerController.getInterviewerById);

router.post('/add', interviewerController.addInterviewer);

module.exports = router;