const router = require('express').Router();
const adminController  = require('./admin.controller');

router.post('/add/department', adminController.addDepartment);
router.get('/get/departments', adminController.getDepartments);
router.post('/add/profile', adminController.addProfile);

module.exports = router;