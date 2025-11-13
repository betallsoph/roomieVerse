require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');

// Initialize express app
const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs for auth endpoints
  message: 'Too many authentication attempts, please try again later.'
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Apply rate limiting to all routes
app.use('/api/', limiter);

// Routes with specific rate limiting
app.use('/api/auth', authLimiter, require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/listings', require('./routes/listings'));
app.use('/api/matches', require('./routes/matches'));

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to roomieVerse API',
    description: 'A specialized platform for roommate connections - broker-free, real people only',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      listings: '/api/listings',
      matches: '/api/matches'
    }
  });
});

// API info route
app.get('/api', (req, res) => {
  res.json({
    message: 'roomieVerse API',
    features: [
      'Roommate-seeking listings only (no full-unit rentals)',
      'Broker-free ecosystem with real, verified people',
      'Lifestyle-based matching algorithm',
      'Direct user-to-user connections',
      'Community-focused platform'
    ],
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me'
      },
      users: {
        updateProfile: 'PUT /api/users/profile',
        getUserProfile: 'GET /api/users/:id',
        verify: 'POST /api/users/verify'
      },
      listings: {
        create: 'POST /api/listings',
        getAll: 'GET /api/listings',
        getOne: 'GET /api/listings/:id',
        update: 'PUT /api/listings/:id',
        delete: 'DELETE /api/listings/:id',
        myListings: 'GET /api/listings/my-listings'
      },
      matches: {
        find: 'GET /api/matches/find',
        compatibility: 'GET /api/matches/compatibility/:userId',
        expressInterest: 'POST /api/matches/interest/:userId',
        myMatches: 'GET /api/matches'
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Try to connect to database (but don't fail if unavailable)
    const dbConnected = await connectDB();
    
    if (!dbConnected) {
      console.log('\n⚠️  NOTE: Database not available - API will return demo responses');
      console.log('📝 To enable full functionality:');
      console.log('   1. Install MongoDB: https://www.mongodb.com/try/download/community');
      console.log('   2. Start MongoDB: mongod');
      console.log('   3. Restart this server\n');
    }
    
    app.listen(PORT, () => {
      console.log(`\n🏠 roomieVerse server is running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API: http://localhost:${PORT}/api`);
      console.log(`🌐 Web: http://localhost:${PORT}`);
      console.log(`\n✨ Features:`);
      console.log(`   - Roommate-seeking listings only (no full-unit rentals)`);
      console.log(`   - Broker-free ecosystem`);
      console.log(`   - Lifestyle-based matching`);
      console.log(`   - Real, verified people only\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
