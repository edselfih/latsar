const express = require('express');
const router = express.Router();

const inputController = require('../controllers/input');

router.route('/')
    .get( inputController.index);

    router.route('/daftar-ppk')
    .get( inputController.daftarPpk)
    .post( inputController.createDaftarPpk)

    router.route('/jenis-spby')
    .get( inputController.jenisSpby)
    .post(inputController.createJenisSpby)

    router.route('/gup-tunai')
    .get( inputController.gupTunai);

module.exports = router;