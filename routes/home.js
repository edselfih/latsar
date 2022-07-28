const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home');

router.route('/')
    .get( homeController.index);

module.exports = router;