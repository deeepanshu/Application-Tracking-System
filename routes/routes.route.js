const express = require('express');
const router = express.Router();
let api = require('../controller/index');


router.use("/api", api);

module.exports = router;