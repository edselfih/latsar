const express = require('express');
const router = express.Router();

const inputController = require('../controllers/input');

router.route('/')
    .get( inputController.index);

    router.route('/daftar-ppk')
    .get( inputController.daftarPpk)
    .post( inputController.createDaftarPpk)

    router.route('/daftar-ppk/:ppkId')
    .delete( inputController.deleteDaftarPpk )

    router.route('/jenis-spby')
    .get( inputController.jenisSpby)
    .post(inputController.createJenisSpby)

    router.route('/jenis-spby/lainlain')
    .post(inputController.createJenisSpbyLainlain)

    router.route('/gup-tunai')
    .get( inputController.gup)
    .post( inputController.createGup);

    router.route('/gup-tunai/:id')
    .get( inputController.gupInputed)
    

module.exports = router;