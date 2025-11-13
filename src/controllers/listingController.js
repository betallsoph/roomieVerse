const Listing = require('../models/Listing');

/**
 * Create new listing
 * POST /api/listings
 */
exports.createListing = async (req, res) => {
  try {
    const listingData = {
      ...req.body,
      user: req.user._id,
      isDirectListing: true // Always true - no broker listings
    };
    
    // Validate listing type (roommate-seeking only)
    if (!['seeking-roommate', 'seeking-room'].includes(listingData.listingType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid listing type. Only roommate-seeking listings are allowed (no full-unit rentals).'
      });
    }
    
    const listing = await Listing.create(listingData);
    
    res.status(201).json({
      success: true,
      message: 'Listing created successfully',
      listing
    });
  } catch (error) {
    console.error('Create listing error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating listing',
      error: error.message
    });
  }
};

/**
 * Get all listings with filters
 * GET /api/listings
 */
exports.getListings = async (req, res) => {
  try {
    const {
      city,
      state,
      listingType,
      minRent,
      maxRent,
      availableFrom,
      status = 'active'
    } = req.query;
    
    // Build query - only active, roommate-seeking listings
    const query = {
      status,
      isDirectListing: true // Filter out any non-direct listings
    };
    
    // Escape regex special characters to prevent regex injection
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    if (city) query['location.city'] = new RegExp(escapeRegex(city), 'i');
    if (state) query['location.state'] = new RegExp(escapeRegex(state), 'i');
    if (listingType) query.listingType = listingType;
    
    if (minRent || maxRent) {
      query.rent = {};
      if (minRent) query.rent.$gte = parseInt(minRent);
      if (maxRent) query.rent.$lte = parseInt(maxRent);
    }
    
    if (availableFrom) {
      query.availableFrom = { $lte: new Date(availableFrom) };
    }
    
    const listings = await Listing.find(query)
      .populate('user', 'name profile.age profile.gender profile.occupation')
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.status(200).json({
      success: true,
      count: listings.length,
      listings
    });
  } catch (error) {
    console.error('Get listings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching listings',
      error: error.message
    });
  }
};

/**
 * Get single listing
 * GET /api/listings/:id
 */
exports.getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('user', 'name email phone profile');
    
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }
    
    // Increment view count
    listing.views += 1;
    await listing.save();
    
    res.status(200).json({
      success: true,
      listing
    });
  } catch (error) {
    console.error('Get listing error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching listing',
      error: error.message
    });
  }
};

/**
 * Update listing
 * PUT /api/listings/:id
 */
exports.updateListing = async (req, res) => {
  try {
    let listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }
    
    // Check ownership
    if (listing.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this listing'
      });
    }
    
    // Prevent changing isDirectListing
    if (req.body.isDirectListing === false) {
      return res.status(403).json({
        success: false,
        message: 'Cannot change listing type to non-direct'
      });
    }
    
    listing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Listing updated successfully',
      listing
    });
  } catch (error) {
    console.error('Update listing error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating listing',
      error: error.message
    });
  }
};

/**
 * Delete listing
 * DELETE /api/listings/:id
 */
exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }
    
    // Check ownership
    if (listing.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this listing'
      });
    }
    
    await listing.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Listing deleted successfully'
    });
  } catch (error) {
    console.error('Delete listing error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting listing',
      error: error.message
    });
  }
};

/**
 * Get user's listings
 * GET /api/listings/my-listings
 */
exports.getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: listings.length,
      listings
    });
  } catch (error) {
    console.error('Get my listings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching listings',
      error: error.message
    });
  }
};
