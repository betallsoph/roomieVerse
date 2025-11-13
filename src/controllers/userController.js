const User = require('../models/User');

/**
 * Update user profile
 * PUT /api/users/profile
 */
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const profileData = req.body;
    
    // Prevent users from marking themselves as brokers
    if (profileData.isBroker === true) {
      return res.status(403).json({
        success: false,
        message: 'Cannot set broker status'
      });
    }
    
    // Validate age if provided
    if (profileData.profile?.age && profileData.profile.age < 18) {
      return res.status(400).json({
        success: false,
        message: 'Must be at least 18 years old'
      });
    }
    
    // Update user
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: profileData },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};

/**
 * Get user profile
 * GET /api/users/:id
 */
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Return public profile (exclude sensitive data)
    const publicProfile = {
      id: user._id,
      name: user.name,
      profile: user.profile,
      lastActive: user.lastActive,
      createdAt: user.createdAt
    };
    
    res.status(200).json({
      success: true,
      user: publicProfile
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message
    });
  }
};

/**
 * Verify user account (placeholder for email verification)
 * POST /api/users/verify
 */
exports.verifyAccount = async (req, res) => {
  try {
    const { verificationToken } = req.body;
    
    // In a real implementation, you would:
    // 1. Send verification email on registration
    // 2. Verify token here
    // 3. Mark user as verified
    
    // For now, simple verification
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    user.isVerified = true;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Account verified successfully',
      user
    });
  } catch (error) {
    console.error('Verify account error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying account',
      error: error.message
    });
  }
};
