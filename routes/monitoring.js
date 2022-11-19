const express = require('express');
const router = express.Router();

const monitoringController = require('../controllers/monitoring');

router.route('/')
    .get( monitoringController.index)

router.route('/filter')
    .post( monitoringController.indexFilter)

router.route('/search')
    .post( monitoringController.indexSearch)

router.route('/:id')
    .get( monitoringController.detailSpby);


module.exports = router;