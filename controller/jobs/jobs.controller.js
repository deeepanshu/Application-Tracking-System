let mongoose = require('mongoose');
let Job = require('./../../models/job.model');
let Interview = require('./../../models/interview.model');
module.exports = {
    addJob: (req, res) => {
        console.log(req.body);
        let job = new Job(req.body);
        job.jobCreater = req.user.userId;
        job.jobHandler = req.user.userId;
        job.save((err, saved) => {
            if (err) throw err;
            res.json({
                status: true,
                job: saved
            });
        })
    },
    listJobs: (req, res) => {
        Job.find({}, (err, jobs) => {
            if (err) throw err;
            res.status(200).json(jobs);
        })
    },
    getJobById: (req, res) => {
        if (!req.params.id) {
            return res.json({});
        }
        Job.findOne({
            _id: req.params.id
        }, (err, jobs) => {
            res.json(jobs);
        })
    },
    applyJob: (req, res) => {
        let userId = req.user.userId;
        let jobId = req.params.id;
        if (!userId && !jobId) {
            return res.json({
                success: false,
                message: "Neccesaary Information not provided"
            });
        }
        Interview.findOne({
            job: jobId,
            candidate: userId
        }, (err, application) => {
            if (err) throw err;
            if (application) {
                return res.json({
                    success: false,
                    message: "Already Applied"
                });
            }
            let interview = new Interview();
            interview.candidate = userId;
            interview.job = jobId;
            interview.save((err, saved) => {
                if (err) throw err;
                return res.json({
                    success: true,
                    saved
                });
            })
        });
    },
    isAlreadyApplied: (req, res) => {
        let userId = req.user.userId;
        let jobId = req.params.jobId;
        if (!userId && !jobId) {
            return res.json({
                success: false,
                message: "Neccesaary Information not provided"
            });
        }
        Interview.findOne({
            job: jobId,
            candidate: userId
        }, (err, application) => {
            if (err) throw err;
            return res.json({
                success: application ? true : false
            });
        });
    },
    getApplications: (req, res) => {
        Interview.find({job: mongoose.Types.ObjectId(req.params.jobId),finalStatus: 'Not Assigned' }).populate('candidate').exec((err, applications) => {
            if(err) throw err;
            console.log(applications);
            res.json(applications);
        })
    },
    assignInterviewer: (req, res) => {
        console.log(req.params);
        console.log(req.body);
        let interview = {
            interviewName: req.body.interviewName,
            interviewType: req.body.interviewType,
            interviewer: req.body.interviewer,
            date: req.body.date,
            time: req.body.time
        };
        Interview.findOneAndUpdate({job: req.params.jobId, candidate: req.body.candidate}, {
            $push: {
                interviews: interview
            },
            $set: {
                finalStatus: 'In Process'
            }
        }, {new: true}, (err, savedInterview) => {
            if(err) throw err;
            res.json({success: true,interview: savedInterview});
        })
    }
}