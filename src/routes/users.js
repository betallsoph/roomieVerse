const express = require('express');
const router = express.Router();
const { updateProfile, getUserProfile, verifyAccount } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.put('/profile', protect, updateProfile);
router.post('/verify', protect, verifyAccount);
router.get('/:id', protect, getUserProfile);

module.exports = router;
