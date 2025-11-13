const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  // Two users in the potential match
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Related listing if applicable
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing'
  },
  
  // Compatibility score (0-100)
  compatibilityScore: {
    type: Number,
    min: 0,
    max: 100
  },
  
  // Breakdown of compatibility factors
  compatibilityFactors: {
    lifestyle: Number,
    budget: Number,
    location: Number,
    timing: Number
  },
  
  // Match status
  status: {
    type: String,
    enum: ['suggested', 'contacted', 'interested', 'not-interested', 'matched'],
    default: 'suggested'
  },
  
  // Interaction tracking
  user1Interested: {
    type: Boolean,
    default: false
  },
  user2Interested: {
    type: Boolean,
    default: false
  },
  
  // When both users show interest
  mutualMatch: {
    type: Boolean,
    default: false
  },
  mutualMatchDate: Date,
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Automatically set mutualMatch when both users are interested
matchSchema.pre('save', function(next) {
  if (this.user1Interested && this.user2Interested && !this.mutualMatch) {
    this.mutualMatch = true;
    this.mutualMatchDate = new Date();
    this.status = 'matched';
  }
  next();
});

// Ensure unique matches (prevent duplicates)
matchSchema.index({ user1: 1, user2: 1 }, { unique: true });

module.exports = mongoose.model('Match', matchSchema);
