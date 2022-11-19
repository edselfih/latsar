const express = require('express');
const router = express.Router();

const monitoringController = require('../controllers/monitoring');

router.route('/')
    .get( monitoringController.index)

router.route('/filterPpk')
    .post( monitoringController.indexFilterPpk)

router.route('/filterKelengkapan')
    .post( monitoringController.indexFilterKelengkan)

router.route('/filterNomorSpby')
    .post( monitoringController.indexFilterNomorSpby)

router.route('/:id')
    .get( monitoringController.detailSpby);


module.exports = router;