const Department = require('./../../models/department.model');
const Interview = require('./../../models/interview.model');

module.exports = {
    getDepartments: (req, res) => {
        Department.find({}, (err, departments) => {
            if(err) throw departments;
            res.send(departments);
        })
    },

    addDepartment: (req, res) => {
        let department = new Department(req.body);
        department.save((err, saved) => {
            res.json(department);
        });
    },
    addProfile: (req, res) => {
        if(!req.body){
            res.json({message: "Not Updated"});
        }
        Department.findOneAndUpdate({departmentName:req.body.departmentName}, {
            $push:{
                profiles: req.body.profiles
            }
        },{new : true},(err, department) => {
            if(err) throw err;
            res.json(department);
        })
    },
    getInterviews: (req, res) => {
        Interview.find({}, {interviews: 0}).populate('job').populate('candidate').exec((err, found) => {
            console.log(found);
            res.json(found);
        })
    }
}