let router = require('express').Router();
let authRouter = require('./auth/index');
let jobRouter = require('./jobs/index');
let candidateRouter = require('./candidates/index');
let interviewRouter = require('./interviews/index');
let interviewerRouter = require('./interviewers/index');

router.use('/auth', authRouter);
router.use('/job', jobRouter);
router.use('/candidate', candidateRouter);
router.use('/interview', interviewRouter);
router.use('/interviewer', interviewerRouter);

module.exports = router;