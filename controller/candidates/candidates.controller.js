let path = require('path');
let Candidate = require('./../../models/candidate.model');
let Interview = require('./../../models/interview.model');
let Login = require('./../../models/login.model');
let mongoose = require('mongoose');
let fs = require('fs');
const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
};
module.exports = {
    welcomeAPI: (req, res) => {},

    addCandidate: (req, res) => {
        if (!req.body) {
            res.json({
                status: 'empty request'
            });
        }
        let candidate = new Candidate(req.body);
        candidate.save((err, saved) => {
            if (err) throw err;
            res.status(200).json(saved);
        })
    },

    addCandidateEducation: (req, res) => {
        let education = req.body;
        education = education.filter((edu) => !edu._id);

        Candidate.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(req.user.userId)
        }, {
            $push: {
                education
            }
        }, {
            new: true
        }, (err, saved) => {
            if (err) throw err;
            res.json(saved);
        })
    },
    addCandidateEmployment: (req, res) => {
        let employments = req.body;
        employments = employments.filter((employment) => !employment._id);
        Candidate.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(req.user.userId)
        }, {
            $push: {
                employment: employments
            }
        }, {
            new: true
        }, (err, saved) => {
            if (err) throw err;
            res.json(saved);
        })
    },
    addCandidateReferences: (req, res) => {
        let references = req.body;
        references = references.filter((reference) => !reference._id);
        Candidate.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(req.user.userId)
        }, {
            $push: {
                references: references
            }
        }, {
            new: true
        }, (err, saved) => {
            if (err) throw err;
            res.json(saved);
        })
    },
    applyForJob: (req, res) => {

        if (!req.params.candidateId || !req.params.jobId) {
            res.json({
                status: 'empty request',
                missing: 'id'
            });
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
                applied_jobs: application
            }
        }, {
            new: true
        }, (err, saved) => {
            if (err) throw err;
            res.json(saved);
        })
    },
    getCandidates: (req, res) => {
        Candidate.find({}, (err, candidates) => {
            res.json(candidates);
        })
    },

    getCandidateByID: (req, res) => {
        console.log(req.params.id);
        if (!req.params.id) {
            res.json({
                status: 'empty request',
                missing: 'id'
            });
        }
        Candidate.findById(mongoose.Types.ObjectId(req.params.id), (err, found) => {
            if (err) throw err;
            res.json(found);
        })
    },

    getUploads: (req, res) => {
        // // const ext = path.parse(req.params.filename).ext;

        // let filename = path.resolve(`${__dirname}/../../assets/${req.params.filename}`);
        // fs.readFile(filename, function (err, data) {
        //     if (err) {
        //         res.statusCode = 500;
        //         res.end(`Error getting the file: ${err}.`);
        //     } else {
        //         // based on the URL path, extract the file extention. e.g. .js, .doc, ...
        //         const ext = path.parse(filename).ext;
        //         console.log(ext, mimeType[ext]);
        //         // if the file is found, set Content-type and send data
        //         res.setHeader('Content-type', mimeType[ext] || 'text/plain');
        //         res.write(data);
        //         res.end();
        //     }
        // });


        // // res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
        // // res.end(data);
        res.sendFile(path.resolve(`${__dirname}/../../assets/${req.params.filename}`));
    },
    getObjectList: (req, res) => {
        Candidate.findOne({
            _id: req.user.userId
        }, `${req.params.object}`, (err, found) => {
            console.log(found);
            res.json(found);
        })
    },
    addCandidateAddress: (req, res) => {
        Candidate.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(req.user.userId)
        }, {
            $set: {
                address: req.body
            }
        }, {
            new: true
        }, (err, saved) => {
            if (err) throw err;
            res.json(saved);
        })
    },
    addCandidateFiles: (req, res) => {

        console.log(req.body.certificates);
        console.log(req.body);
        console.log(req.user);
        let fileList = [];
        if (req.files.resume) {
            if (req.files.resume.length > 0) {
                fileList.push({
                    link: req.files.resume[0].filename,
                    docType: 'Resume'
                });
            }
        }
        if (req.files.resume) {
            if (req.files.introduction.length > 0) {
                fileList.push({
                    link: req.files.introduction[0].filename,
                    docType: 'Introduction Video'
                });
            }
        }

        if (req.files.coverLetter) {
            if (req.files.coverLetter.length > 0) {
                fileList.push({
                    link: req.files.coverLetter[0].filename,
                    docType: 'Cover Letter'
                });
            }
        }
        Candidate.findOneAndUpdate({
            _id: req.user.userId
        }, {
            $push: {
                uploads: fileList
            }
        }, {
            new: true
        }, (err, saved) => {
            if (err) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                res.json(saved);
            }
        })
        res.json({});
    },
    finalize: (req, res) => {
        Candidate.findOneAndUpdate({
            _id: req.user.userId
        }, {
            $set: {
                isSignUpComplete: true
            }
        }, (err, candidate) => {
            if (err) res.json({
                success: false
            });
            Login.findOneAndUpdate({
                userId: req.user.userId
            }, {
                $set: {
                    isLoginAllowed: true
                }
            }, (err, login) => {
                if (err || !login) {
                    console.log(err);
                    return res.json({
                        success: false
                    })
                };
                if (login) {
                    res.json({
                        success: true
                    })
                }
            })
        })
    },
    profile: (req, res) => {
        Candidate.findOne({
            _id: req.user.userId
        }, (err, candidate) => {
            res.json(candidate);
        })
    },
    profileApplications: (req, res) => {
console.log(req.user.userId)
        Interview.aggregate([{
                $match: {
                    candidate: mongoose.Types.ObjectId(req.user.userId)
                }
            },{
                $lookup:{
                    from: 'jobs',
                    localField: 'job',
                    foreignField: '_id',
                    as: 'job'
                }
            }
            ,
            {
                $unwind: {
                    path: "$interviews"
                }
            }
        ]).exec((err, found) => {
            if (err) throw err;
            console.log(found);
            res.json(found);
        })
    }
}