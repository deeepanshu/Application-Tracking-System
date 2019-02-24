/*
    ToDo: applyForJob: add files to view
*/

let path = require('path');
let Candidate = require('./../../models/candidate.model');
let mongoose = require('mongoose');
module.exports = {
    welcomeAPI: (req, res) => {
    },

    addCandidate: (req, res) => {
        if(!req.body){
            res.json({status:'empty request'});
        }
        let candidate = new Candidate(req.body);
        candidate.save((err, saved)=>{
            if(err) throw err;
            res.status(200).json(saved);
        })
    },

    addCandidateEducation: (req, res) => {
        if(!req.params.id){
            res.json({status:'empty request',missing:'id'});
        }
        Candidate.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(req.params.id)
        }, {
            $push: {
                education: req.body
            }
        },{new: true}, (err, saved)=>{
            if(err) throw err;
            res.json(saved);
        })
    },
    addCandidateEmployment: (req, res) => {
        if(!req.params.id){
            res.json({status:'empty request',missing:'id'});
        }
        Candidate.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(req.params.id)
        }, {
            $push: {
                employment: req.body
            }
        },{new: true}, (err, saved)=>{
            if(err) throw err;
            res.json(saved);
        })
    },
    addCandidateReferences: (req, res) => {
        if(!req.params.id){
            res.json({status:'empty request',missing:'id'});
        }
        Candidate.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(req.params.id)
        }, {
            $push: {
                references: req.body
            }
        },{new: true}, (err, saved)=>{
            if(err) throw err;
            res.json(saved);
        })
    },
    applyForJob: (req, res)=> {
        if(!req.params.candidateId ||  !req.params.jobId){
            res.json({status:'empty request',missing:'id'});
        }
        let application = {
            jobId: req.params.jobId,
            isRefered: req.body.isRefered,
            reference: req.body.reference,
        }
        Candidate.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(req.params.candidateId)
        }, {
            $push: {
                references: application
            }
        },{new: true}, (err, saved)=>{
            if(err) throw err;
            res.json(saved);
        })
    },
    getCandidates: (req, res) => {
        Candidate.find({}, (err, candidates) => {
            res.json(candidates);
        })
    },

    getCandidateByID: (req, res) => {
        if(!req.params.id){
            res.json({status:'empty request',missing:'id'});
        }
        Candidate.findById(mongoose.Types.ObjectId(req.params.id), (err, found) => {
            if(err) throw err;
            res.json(found);
        })
    },

    getCandidateResumeByID: (req, res) => {
        res.sendFile(path.resolve(`${__dirname}/../../assets/resumes/${req.params.filename}`));
    },
    getCandidateIntroByID: (req, res) => {
        res.sendFile(path.resolve(`${__dirname}/../../assets/intros/${req.params.filename}`));
    }
}