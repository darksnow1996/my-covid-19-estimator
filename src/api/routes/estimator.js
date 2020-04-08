const express = require('express');
const router = express.Router();
const estimatorController = require('../controllers/estimator');

router.post('/:responseType?',estimatorController.estimates);

module.exports = router;