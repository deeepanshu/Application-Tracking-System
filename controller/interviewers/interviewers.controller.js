const passwordGenerator = require('generate-password');
const sendgrid = require('../../services/sendgrid');
const template = require('../../services/sendgrid/templates/');
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
            plainPassword = passwordGenerator.generate({
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
                let sendgridConfig = template.registration(savedInterviewer.email,plainPassword,'Registration Details');
                sendgrid(sendgridConfig);
                res.json(savedLogin);
            })
        })
    }
}