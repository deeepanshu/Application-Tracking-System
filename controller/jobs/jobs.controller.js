let Job = require('./../../models/job.model');
module.exports = {
    addJob: (req, res) => {
        let job = new Job(req.body);
        job.save( (err, saved) => {
            if(err) throw err;
            res.json(saved);
        })
    }
}