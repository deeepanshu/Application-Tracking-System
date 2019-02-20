
let path = require('path');
module.exports = {
    welcomeAPI: (req, res) => {

        // dbUtility.dbAppender('candidates', a);
        
    },

    addCandidate: (req, res) => {
        res.status(200).json(req.body);
    },

    getCandidates: (req, res) => {
        res.json({
            "server": "up and about"
        });
    },

    getCandidateByID: (req, res) => {
        
    },
    getCandidateResumeByID: (req, res) => {
        res.sendFile(path.resolve(`${__dirname}/../../assets/resumes/${req.params.filename}`));
    },
    getCandidateIntroByID: (req, res) => {
        res.sendFile(path.resolve(`${__dirname}/../../assets/intros/${req.params.filename}`));
    }
}