const Department = require('./../../models/department.model');
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
        if(!req.params.departmentId){
            res.json({message: "Not Updated"});
        }
        Department.findOneAndUpdate({_id:req.params.departmentId}, {
            $push:{
                profiles: req.body.profile
            }
        })
    }
}