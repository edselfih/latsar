const express = require('express');
const router = express.Router();

const spjController = require('../controllers/spj');

router.route('/')
    .get( spjController.index)
    .post( spjController.createSPJ)
    
router.route('/download')
    .get( spjController.downloadSPJ)

module.exports = router;