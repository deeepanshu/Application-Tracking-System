let router = require('express').Router();
let jobRouter = require('./jobs/index');
let candidateRouter = require('./candidates/index');
let interviewRouter = require('./interviews/index');
let interviewerRouter = require('./interviewers/index');


router.use('/job', jobRouter);
router.use('/candidate', candidateRouter);
router.use('/interview', interviewRouter);
router.use('/interviewer', interviewerRouter);

module.exports = router;