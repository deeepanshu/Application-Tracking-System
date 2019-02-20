let express = require('express');
let router = express.Router();
let candidateController = require('./candidates.controller');
let upload = require("./../../middlewares/multer/multer.middleware");

router.get('/', candidateController.getCandidates);
router.post('/add', upload.type, candidateController.addCandidate);
router.get('/:id', candidateController.getCandidateByID);
router.get('/resume/:filename', candidateController.getCandidateResumeByID);
router.get('/intro/:filename',candidateController.getCandidateIntroByID);

module.exports = router;