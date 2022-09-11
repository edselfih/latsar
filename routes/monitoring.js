const express = require('express');
const router = express.Router();

const monitoringController = require('../controllers/monitoring');

router.route('/')
    .get( monitoringController.index);

router.route('/:id')
    .get( monitoringController.detailSpby);


module.exports = router;