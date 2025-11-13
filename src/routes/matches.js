const express = require('express');
const router = express.Router();
const {
  findMatches,
  getCompatibility,
  expressInterest,
  getMyMatches
} = require('../controllers/matchController');
const { protect } = require('../middleware/auth');

router.get('/find', protect, findMatches);
router.get('/compatibility/:userId', protect, getCompatibility);
router.post('/interest/:userId', protect, expressInterest);
router.get('/', protect, getMyMatches);

module.exports = router;
