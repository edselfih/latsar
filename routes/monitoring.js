const express = require('express');
const router = express.Router();

const monitoringController = require('../controllers/monitoring');

router.route('/')
    .get( monitoringController.index);


module.exports = router;