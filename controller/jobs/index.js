const router = require('express').Router();
const jobController = require('./jobs.controller');
const checkAuth = require('./../../middlewares/checkauth/checkauth.middleware');
router.get('/', jobController.listJobs);
router.get('/:id', jobController.getJobById);

router.post('/add', checkAuth, jobController.addJob);

module.exports = router;