let express = require('express');
let router = express.Router();
let candidateController = require('./candidates.controller');
let fileSystemUpload = require("./../../middlewares/multer/multer.middleware");
let s3FileUpload = require("./../../middlewares/multers3/multers3.middleware");
let checkAuth = require("./../../middlewares/checkauth/checkauth.middleware");
router.get('/', candidateController.getCandidates);
router.get('/finalize', checkAuth, candidateController.finalize);
router.get('/:id', candidateController.getCandidateByID);

router.post('/add', candidateController.addCandidate);
router.post('/add/education', checkAuth, candidateController.addCandidateEducation);
router.post('/add/employment', checkAuth, candidateController.addCandidateEmployment);
router.post('/add/reference',checkAuth ,candidateController.addCandidateReferences);
router.post('/add/address',checkAuth ,candidateController.addCandidateAddress);
router.post('/add/uploads', checkAuth, fileSystemUpload.candidateUploads, candidateController.addCandidateFiles);

router.post('/apply/:candidateId/:jobId', candidateController.applyForJob);

router.get('/list/:object',checkAuth, candidateController.getObjectList);

router.get('/file/:filename',candidateController.getUploads);

module.exports = router;