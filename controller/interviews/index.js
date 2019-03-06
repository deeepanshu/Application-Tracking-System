let express = require('express');
let router = express.Router();
let interviewsController = require('./interviews.controller');
router.get("/", interviewsController.getInterviews);
router.post("/add", interviewsController.addInterview);
router.get("/candidate/:id", interviewsController.getInterviewsByCandidateId);
router.get("/interviewer/:id", interviewsController.getInterviewsByInterviewerId);
router.get("/interviewer/:id/:date", interviewsController.getInterviewsByInterviewerIdAndDate);

module.exports = router;