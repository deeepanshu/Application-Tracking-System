let express = require('express');
let router = express.Router();
let candidateController = require('./candidates.controller');
let fileSystemUpload = require("./../../middlewares/multer/multer.middleware");
let s3FileUpload = require("./../../middlewares/multers3/multers3.middleware");
router.get('/', candidateController.getCandidates);
router.get('/:id', candidateController.getCandidateByID);

router.post('/add', s3FileUpload.signUpUpload, candidateController.addCandidate);
router.post('/add/education/:id', candidateController.addCandidateEducation);
router.post('/add/employment/:id', candidateController.addCandidateEmployment);
router.post('/add/reference/:id', candidateController.addCandidateReferences);
router.post('/apply/:candidateId/:jobId', candidateController.applyForJob);


router.get('/resume/:filename', candidateController.getCandidateResumeByID);
router.get('/intro/:filename',candidateController.getCandidateIntroByID);

module.exports = router;