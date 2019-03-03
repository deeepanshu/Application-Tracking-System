let express = require('express');
let router = express.Router();
let interviewerController = require('./interviewers.controller');

let checkAuth = require("./../../middlewares/checkauth/checkauth.middleware");

router.get('/', interviewerController.getInterviewers);
router.get('/interviews',checkAuth, interviewerController.getInterviews);
router.get('/interview/:candidateid/:jobid', checkAuth, interviewerController.getInterviewRecord);
router.get('/:id', interviewerController.getInterviewerById);

router.post('/add', checkAuth, interviewerController.addInterviewer);

module.exports = router;