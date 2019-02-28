let Job = require('./../../models/job.model');
module.exports = {
    addJob: (req, res) => {
        let job = new Job(req.body);
        job.save( (err, saved) => {
            if(err) throw err;
            res.json({status: true, job: saved});
        })
    },
    listJobs: (req, res) => {
        
        Job.find({}, (err, jobs)=> {
            if(err) throw err;
            setTimeout(()=>{
                res.status(200).json(jobs);    
            }, 2000);
            
        })
    }
}