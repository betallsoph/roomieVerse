require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api/auth', require('./routes/auth'));
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
    // Connect to database
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`\n🏠 roomieVerse server is running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API: http://localhost:${PORT}/api`);
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
