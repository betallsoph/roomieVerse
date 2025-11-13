const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  phone: {
    type: String,
    trim: true
  },
  
  // Verification (to ensure real people, broker-free)
  isVerified: {
    type: Boolean,
    default: false
  },
  isBroker: {
    type: Boolean,
    default: false,
    // Flag to filter out brokers - users must confirm they're not brokers
  },
  verificationToken: String,
  
  // Roommate Profile - Lifestyle Preferences
  profile: {
    age: {
      type: Number,
      min: [18, 'Must be at least 18 years old']
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'non-binary', 'prefer-not-to-say']
    },
    occupation: String,
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    
    // Lifestyle matching criteria
    lifestyle: {
      sleepSchedule: {
        type: String,
        enum: ['early-bird', 'night-owl', 'flexible']
      },
      cleanliness: {
        type: String,
        enum: ['very-clean', 'moderately-clean', 'relaxed']
      },
      socialLevel: {
        type: String,
        enum: ['very-social', 'moderately-social', 'private']
      },
      guests: {
        type: String,
        enum: ['frequently', 'occasionally', 'rarely', 'never']
      },
      smoking: {
        type: Boolean,
        default: false
      },
      pets: {
        type: Boolean,
        default: false
      },
      petTypes: [String] // if pets: true, specify types
    },
    
    // Housing preferences
    housingPreferences: {
      lookingFor: {
        type: String,
        enum: ['room-in-shared-apartment', 'roommate-for-my-place', 'both'],
        required: true
      },
      location: {
        city: String,
        state: String,
        zipCode: String,
        neighborhood: String
      },
      budgetRange: {
        min: Number,
        max: Number
      },
      moveInDate: Date,
      leaseDuration: {
        type: String,
        enum: ['1-3-months', '3-6-months', '6-12-months', '12+-months', 'flexible']
      }
    }
  },
  
  // Activity tracking
  lastActive: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Ensure brokers are filtered out in queries
userSchema.pre(/^find/, function(next) {
  // Automatically filter out brokers from all find queries
  this.where({ isBroker: false });
  next();
});

module.exports = mongoose.model('User', userSchema);
