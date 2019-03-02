let Job = require('./../../models/job.model');
module.exports = {
    addJob: (req, res) => {
        console.log(req.body);
        let job = new Job(req.body);
        job.save( (err, saved) => {
            if(err) throw err;
            res.json({status: true, job: saved});
        })
    },
    listJobs: (req, res) => {
        Job.find({}, (err, jobs)=> {
            if(err) throw err;
            res.status(200).json(jobs);
        })
    },
    getJobById: (req, res) => {
        if(!req.params.id){
            return res.json({}); 
        }
        Job.findOne({_id: req.params.id}, (err, jobs) => {
            res.json(jobs);
        })
    }
}