const express = require('express');
const router = express.Router();
const estimatorController = require('../controllers/estimator');

router.post('/:responseType?',estimatorController.estimates);
router.get('/logs',estimatorController.logs);

module.exports = router;