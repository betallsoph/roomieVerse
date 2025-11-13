const User = require('../models/User');
const Match = require('../models/Match');
const { calculateCompatibility, findCompatibleUsers } = require('../utils/matching');

/**
 * Find compatible roommates
 * GET /api/matches/find
 */
exports.findMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    
    if (!currentUser.profile?.lifestyle) {
      return res.status(400).json({
        success: false,
        message: 'Please complete your lifestyle profile to find matches'
      });
    }
    
    const { minScore = 60, city, lookingFor } = req.query;
    
    // Build query for potential matches
    const query = {
      _id: { $ne: currentUser._id },
      'profile.lifestyle': { $exists: true }
    };
    
    // Escape regex special characters to prevent regex injection
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    if (city) {
      query['profile.housingPreferences.location.city'] = new RegExp(escapeRegex(city), 'i');
    }
    
    if (lookingFor) {
      query['profile.housingPreferences.lookingFor'] = lookingFor;
    }
    
    // Get all potential users
    const potentialMatches = await User.find(query);
    
    // Calculate compatibility for each
    const matches = findCompatibleUsers(potentialMatches, currentUser, parseInt(minScore));
    
    res.status(200).json({
      success: true,
      count: matches.length,
      matches: matches.slice(0, 20) // Return top 20 matches
    });
  } catch (error) {
    console.error('Find matches error:', error);
    res.status(500).json({
      success: false,
      message: 'Error finding matches',
      error: error.message
    });
  }
};

/**
 * Get compatibility score with specific user
 * GET /api/matches/compatibility/:userId
 */
exports.getCompatibility = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const targetUser = await User.findById(req.params.userId);
    
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    if (!currentUser.profile?.lifestyle || !targetUser.profile?.lifestyle) {
      return res.status(400).json({
        success: false,
        message: 'Both users must have completed lifestyle profiles'
      });
    }
    
    const compatibility = calculateCompatibility(currentUser, targetUser);
    
    res.status(200).json({
      success: true,
      compatibility,
      user: {
        id: targetUser._id,
        name: targetUser.name,
        profile: targetUser.profile
      }
    });
  } catch (error) {
    console.error('Get compatibility error:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating compatibility',
      error: error.message
    });
  }
};

/**
 * Express interest in a match
 * POST /api/matches/interest/:userId
 */
exports.expressInterest = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const targetUserId = req.params.userId;
    
    if (currentUserId.toString() === targetUserId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot express interest in yourself'
      });
    }
    
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if match already exists
    let match = await Match.findOne({
      $or: [
        { user1: currentUserId, user2: targetUserId },
        { user1: targetUserId, user2: currentUserId }
      ]
    });
    
    if (match) {
      // Update existing match
      if (match.user1.toString() === currentUserId.toString()) {
        match.user1Interested = true;
      } else {
        match.user2Interested = true;
      }
      
      await match.save();
    } else {
      // Create new match
      const currentUser = await User.findById(currentUserId);
      const compatibility = calculateCompatibility(currentUser, targetUser);
      
      match = await Match.create({
        user1: currentUserId,
        user2: targetUserId,
        user1Interested: true,
        ...compatibility
      });
    }
    
    res.status(200).json({
      success: true,
      message: match.mutualMatch 
        ? 'Mutual match! You can now connect with this user.'
        : 'Interest expressed successfully',
      match,
      mutualMatch: match.mutualMatch
    });
  } catch (error) {
    console.error('Express interest error:', error);
    res.status(500).json({
      success: false,
      message: 'Error expressing interest',
      error: error.message
    });
  }
};

/**
 * Get all matches for current user
 * GET /api/matches
 */
exports.getMyMatches = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status = 'all' } = req.query;
    
    const query = {
      $or: [{ user1: userId }, { user2: userId }]
    };
    
    if (status === 'mutual') {
      query.mutualMatch = true;
    } else if (status === 'pending') {
      query.mutualMatch = false;
    }
    
    const matches = await Match.find(query)
      .populate('user1', 'name profile.age profile.gender profile.occupation')
      .populate('user2', 'name profile.age profile.gender profile.occupation')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: matches.length,
      matches
    });
  } catch (error) {
    console.error('Get matches error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching matches',
      error: error.message
    });
  }
};
