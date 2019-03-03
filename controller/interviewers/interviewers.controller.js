const passwordGenerator = require('generate-password');
const sendgrid = require('../../services/sendgrid');
const template = require('../../services/sendgrid/templates/');
let Interviewer = require('./../../models/interviewer.model');
let Login = require('./../../models/login.model');
let Interview = require('./../../models/interview.model');
let mongoose = require('mongoose');
module.exports = {
    getInterviewers: (req, res) => {
        Interviewer.find({}, (err, interviewers) => {
            res.json(interviewers);
        })
    },

    getInterviewerById: (req, res) => {
        Interviewer.findOne({
            _id: req.params.id
        }, (err, interviewers) => {
            res.json(interviewers);
        })
    },

    addInterviewer: (req, res) => {
        let interviewer = new Interviewer(req.body);
        interviewer.save((err, savedInterviewer) => {
            if (err) throw err;
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
                if (err) throw err;
                let sendgridConfig = template.registration(savedInterviewer.email, plainPassword, 'Registration Details');
                sendgrid(sendgridConfig);
                res.json(savedLogin);
            })
        })
    },

    getInterviews: (req, res) => {
        Interview.find({
            "interviews": {
                $elemMatch: {
                    "interviewer": mongoose.Types.ObjectId(req.user.userId)
                }
            }
        }, {
            job: 1,
            candidate: 1,
            "interviews.$": 1
        }).populate('candidate').populate('job').exec((err, interviews) => {
            if (err) throw err;
            res.json(interviews);
        })

    },
    getInterviewRecord: (req, res) => {
        let candidate = req.params.candidateid;
        let job = req.params.jobid;
        console.log(candidate, job);
        Interview.findOne({
            "candidate": mongoose.Types.ObjectId(candidate),
            "job": mongoose.Types.ObjectId(job),
            "interviews": {
                $elemMatch: {
                    "interviewer": mongoose.Types.ObjectId(req.user.userId)
                }
            }
        }, {
            job: 1,
            candidate: 1,
            "interviews.$": 1
        }).populate('candidate').populate('job').exec((err, interviews) => {
            if (err) throw err;
            res.json(interviews);
        })
    },
    giveInterviewFeedback: (req, res) => {
        console.log(req.body);
        if (!req.body) {
            return res.json({
                success: false,
                message: "Empty Request"
            });
        }
        let currentStatus = req.body.status;
        let finalRecordStatus;
        switch (currentStatus) {
            case "NOT SELECTED":
                finalRecordStatus = currentStatus;
                break;
            case "SELECTED":
                finalRecordStatus = currentStatus;
                break;
            case "NEXT ROUND":
                finalRecordStatus = 'ASSIGN NEXT';
                break;
            case "PENDING":
                finalRecordStatus = 'DECIDING';
                break;
            default:
                return res.json({
                    success: false,
                    message: "Empty Request"
                });
        }


        Interview.findOneAndUpdate({
            candidate: mongoose.Types.ObjectId(req.body.candidate),
            job: mongoose.Types.ObjectId(req.body.job),
            "interviews": {
                $elemMatch: {
                    "_id": mongoose.Types.ObjectId(req.body.recordId)
                }
            }
        },{
            $set:{
                "interviews.$.status": currentStatus,
                finalStatus : finalRecordStatus
            }
        } ,{new: true}, (err, saved) => {
            if (err) throw err;
            if(saved){
                return res.json({saved, success: true});
            }

            return res.json({success: false});
        })
    }
}