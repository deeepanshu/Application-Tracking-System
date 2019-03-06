const router = require('express').Router();
const jobController = require('./jobs.controller');
const checkAuth = require('./../../middlewares/checkauth/checkauth.middleware');
router.get('/', jobController.listJobs);
router.get('/:id', jobController.getJobById);

router.post('/add', checkAuth, jobController.addJob);

router.get('/applications/:jobId', jobController.getApplications);

router.get('/apply/:id', checkAuth, jobController.applyJob);
router.post('/assign/:jobId', jobController.assignInterviewer);

router.get('/alreadyapplied/:jobId', checkAuth, jobController.isAlreadyApplied);
module.exports = router;