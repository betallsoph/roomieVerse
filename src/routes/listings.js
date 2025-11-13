const express = require('express');
const router = express.Router();
const {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing,
  getMyListings
} = require('../controllers/listingController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createListing);
router.get('/', protect, getListings);
router.get('/my-listings', protect, getMyListings);
router.get('/:id', protect, getListing);
router.put('/:id', protect, updateListing);
router.delete('/:id', protect, deleteListing);

module.exports = router;
