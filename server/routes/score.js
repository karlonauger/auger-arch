const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

router.get('/top-scores', scoreController.getTopScores);
router.post('/add-score', scoreController.addScore);
router.get('/user-scores/:userId', scoreController.getUserScores);

module.exports = router;
