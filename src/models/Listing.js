const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  // User who created the listing
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Listing Type - ONLY roommate-seeking listings allowed
  listingType: {
    type: String,
    enum: ['seeking-roommate', 'seeking-room'],
    required: [true, 'Please specify listing type'],
    // 'seeking-roommate': I have a place and looking for roommate(s)
    // 'seeking-room': I'm looking for a room in shared housing
  },
  
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  
  // Location details
  location: {
    city: {
      type: String,
      required: [true, 'Please provide city']
    },
    state: {
      type: String,
      required: [true, 'Please provide state']
    },
    zipCode: String,
    neighborhood: String,
    address: String // Optional, can be shared later in conversation
  },
  
  // Room/Space details (only for 'seeking-roommate' type)
  spaceDetails: {
    roomType: {
      type: String,
      enum: ['private-room', 'shared-room']
    },
    furnished: Boolean,
    bathrooms: String, // e.g., 'shared', 'private', 'semi-private'
    amenities: [String] // e.g., 'wifi', 'parking', 'laundry', 'kitchen'
  },
  
  // Financial details
  rent: {
    type: Number,
    required: [true, 'Please provide rent amount']
  },
  utilities: {
    type: String,
    enum: ['included', 'split', 'separate'],
    default: 'split'
  },
  deposit: Number,
  
  // Availability
  availableFrom: {
    type: Date,
    required: [true, 'Please provide availability date']
  },
  leaseDuration: {
    type: String,
    enum: ['1-3-months', '3-6-months', '6-12-months', '12+-months', 'flexible'],
    required: true
  },
  
  // Roommate preferences (for compatibility matching)
  preferences: {
    gender: {
      type: String,
      enum: ['male', 'female', 'non-binary', 'any']
    },
    ageRange: {
      min: Number,
      max: Number
    },
    occupation: [String], // e.g., 'student', 'professional', 'any'
    lifestyle: {
      cleanliness: {
        type: String,
        enum: ['very-clean', 'moderately-clean', 'relaxed', 'any']
      },
      socialLevel: {
        type: String,
        enum: ['very-social', 'moderately-social', 'private', 'any']
      },
      smokingOk: {
        type: Boolean,
        default: false
      },
      petsOk: {
        type: Boolean,
        default: false
      }
    }
  },
  
  // Status tracking
  status: {
    type: String,
    enum: ['active', 'inactive', 'filled'],
    default: 'active'
  },
  
  // Contact preferences
  contactMethod: {
    type: String,
    enum: ['email', 'phone', 'both'],
    default: 'email'
  },
  
  // Images
  images: [String],
  
  // Engagement metrics
  views: {
    type: Number,
    default: 0
  },
  
  // Verification - ensure no broker listings
  isDirectListing: {
    type: Boolean,
    default: true,
    required: true
    // Must be true - only direct user-to-user listings allowed
  },
  
  expiresAt: {
    type: Date,
    default: () => new Date(+new Date() + 90*24*60*60*1000) // 90 days
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp
listingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Ensure only roommate-seeking listings (no full-unit rentals)
listingSchema.pre('save', function(next) {
  if (!['seeking-roommate', 'seeking-room'].includes(this.listingType)) {
    return next(new Error('Invalid listing type. Only roommate-seeking listings allowed.'));
  }
  if (!this.isDirectListing) {
    return next(new Error('Only direct user listings allowed. No broker/agent listings.'));
  }
  next();
});

// Index for efficient querying
listingSchema.index({ 'location.city': 1, status: 1 });
listingSchema.index({ listingType: 1, status: 1 });
listingSchema.index({ user: 1 });

module.exports = mongoose.model('Listing', listingSchema);
