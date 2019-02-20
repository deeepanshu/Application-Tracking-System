const express = require('express');
const router = express.Router();
let auth = require('../controller/auth/index');
let api = require('../controller/index');


router.use("/auth", auth);
router.use("/api", api);

module.exports = router;