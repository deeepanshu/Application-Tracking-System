const passowordGenerator = require('generate-password');
const sendgrid = require('./../../services/sendgrid/sendgrid.service');
let Interviewer = require('./../../models/interviewer.model');
let Login = require('./../../models/login.model');

module.exports = {
    getInterviewers: (req, res) => {
        Interviewer.find({}, (err, interviewers) => {
            res.json(interviewers);
        })
    },

    getInterviewerById: (req, res) => {
        Interviewer.findOne({_id: req.params.id}, (err, interviewers) => {
            res.json(interviewers);
        })
    },
    
    addInterviewer: (req, res) => {
        let interviewer = new Interviewer(req.body);
        interviewer.save((err, savedInterviewer) => {
            if(err) throw err;
            plainPassword = passowordGenerator.generate({
                length: 10,
                numbers: true
            });
            let login = new Login({
                email: savedInterviewer.email,
                userId: savedInterviewer._id,
                password: plainPassword,
                role: "ROLE_INTERVIEWER"
            });
            login.save((err, savedLogin) => {
                if(err) throw err;
                sendgrid(savedInterviewer.email, 'Registration Details',plainPassword);
                res.json(savedLogin);
            })
        })
    }
}