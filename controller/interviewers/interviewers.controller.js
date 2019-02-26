let Interviewer = require('./../../models/interviewer.model');
module.exports = {
    getInterviewers: (req, res) => {
        
    },

    getInterviewerById: (req, res) => {
    
    },
    
    addInterviewer: (req, res) => {
        let interviewer = new Interviewer(req.body);
        interviewer.save((err, saved) => {
            if(err) throw err;
            res.json(saved);
        })
    }
}