const router = require('express').Router();
const adminController  = require('./admin.controller');
let checkAuth = require("./../../middlewares/checkauth/checkauth.middleware");

router.get('/interviews', checkAuth, adminController.getInterviews)
router.post('/add/department', checkAuth, adminController.addDepartment);
router.get('/get/departments', adminController.getDepartments);
router.post('/add/profile', adminController.addProfile);
router.get
module.exports = router;