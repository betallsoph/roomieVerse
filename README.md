# 🏠 roomieVerse

**A specialized platform built for one core purpose: connecting people who truly want to share housing.**

roomieVerse is not another traditional rental site. We filter out the noise of 'full-unit' or 'single-room' listings to focus exclusively on the community of users seeking roommates. Our mission is to provide a clean, broker-free ecosystem, ensuring you only connect with real people. By matching based on lifestyle, roomieVerse helps you find not just a space, but a compatible home and community.

## ✨ Core Features

### 🎯 Roommate-Seeking Only
- **No full-unit rentals** - Only roommate-seeking listings allowed
- Two listing types: "Seeking Roommate" or "Seeking Room"
- Filters automatically exclude non-roommate listings

### 🚫 Broker-Free Ecosystem
- **Zero tolerance for brokers/agents** - System automatically filters them out
- Direct user-to-user connections only
- All listings must be marked as "direct listings"
- User verification required

### 🤝 Lifestyle-Based Matching
Our sophisticated matching algorithm considers:
- **Sleep schedules** (early bird, night owl, flexible)
- **Cleanliness preferences** (very clean, moderate, relaxed)
- **Social levels** (very social, moderate, private)
- **Guest frequency** preferences
- **Smoking and pet** compatibility
- **Budget alignment**
- **Location proximity**
- **Move-in date timing**

### ✓ Real People Only
- User verification system
- No broker accounts allowed
- Profile completeness required for matching
- Community-focused approach

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/betallsoph/roomieVerse.git
cd roomieVerse
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/roomieverse
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to:
```
http://localhost:3000
```

## 📚 API Documentation

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "555-0100",
  "isBroker": false
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}
```

### User/Profile Endpoints

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "profile": {
    "age": 25,
    "gender": "male",
    "occupation": "Software Engineer",
    "bio": "Looking for a clean, quiet roommate",
    "lifestyle": {
      "sleepSchedule": "early-bird",
      "cleanliness": "very-clean",
      "socialLevel": "moderately-social",
      "guests": "occasionally",
      "smoking": false,
      "pets": false
    },
    "housingPreferences": {
      "lookingFor": "seeking-room",
      "location": {
        "city": "San Francisco",
        "state": "CA",
        "zipCode": "94102"
      },
      "budgetRange": {
        "min": 1000,
        "max": 1500
      },
      "moveInDate": "2025-12-01",
      "leaseDuration": "6-12-months"
    }
  }
}
```

### Listing Endpoints

#### Create Listing
```http
POST /api/listings
Authorization: Bearer {token}
Content-Type: application/json

{
  "listingType": "seeking-roommate",
  "title": "Looking for roommate in downtown SF",
  "description": "Clean, quiet 2BR apartment with one room available",
  "location": {
    "city": "San Francisco",
    "state": "CA",
    "zipCode": "94102",
    "neighborhood": "Mission District"
  },
  "spaceDetails": {
    "roomType": "private-room",
    "furnished": true,
    "bathrooms": "shared",
    "amenities": ["wifi", "parking", "laundry", "kitchen"]
  },
  "rent": 1200,
  "utilities": "split",
  "deposit": 1200,
  "availableFrom": "2025-12-01",
  "leaseDuration": "6-12-months",
  "preferences": {
    "gender": "any",
    "ageRange": { "min": 21, "max": 35 },
    "lifestyle": {
      "cleanliness": "very-clean",
      "socialLevel": "any",
      "smokingOk": false,
      "petsOk": false
    }
  }
}
```

#### Get All Listings (with filters)
```http
GET /api/listings?city=San Francisco&minRent=1000&maxRent=1500&listingType=seeking-roommate
Authorization: Bearer {token}
```

### Matching Endpoints

#### Find Compatible Matches
```http
GET /api/matches/find?minScore=60&city=San Francisco
Authorization: Bearer {token}
```

#### Get Compatibility with Specific User
```http
GET /api/matches/compatibility/{userId}
Authorization: Bearer {token}
```

#### Express Interest in a Match
```http
POST /api/matches/interest/{userId}
Authorization: Bearer {token}
```

#### Get My Matches
```http
GET /api/matches?status=mutual
Authorization: Bearer {token}
```

## 🏗️ Project Structure

```
roomieVerse/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── userController.js    # User/profile management
│   │   ├── listingController.js # Listing management
│   │   └── matchController.js   # Matching logic
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── models/
│   │   ├── User.js              # User schema with lifestyle preferences
│   │   ├── Listing.js           # Roommate-seeking listing schema
│   │   └── Match.js             # Match tracking schema
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   ├── users.js             # User routes
│   │   ├── listings.js          # Listing routes
│   │   └── matches.js           # Match routes
│   ├── utils/
│   │   └── matching.js          # Compatibility algorithm
│   └── server.js                # Express app setup
├── public/
│   ├── css/
│   │   └── style.css            # Styles
│   ├── js/
│   │   └── app.js               # Frontend JavaScript
│   └── index.html               # Landing page
├── .env.example                 # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Security Features

1. **Broker Detection & Prevention**
   - Users must confirm they're not brokers during registration
   - System rejects any broker registration attempts
   - Automatic filtering in all queries

2. **User Verification**
   - Email verification system (placeholder for full implementation)
   - Only verified users can access matching features

3. **Listing Validation**
   - Only roommate-seeking listings allowed
   - Must be direct listings (no broker/agent listings)
   - Pre-save validation hooks ensure compliance

4. **JWT Authentication**
   - Secure token-based authentication
   - Protected routes require valid tokens
   - Token expiration for security

## 🎨 Frontend Features

The web interface includes:
- **Landing page** with platform overview
- **How It Works** section explaining the process
- **Features showcase** highlighting key differentiators
- **About section** with mission statement
- **Registration/Login forms** with broker verification
- Responsive design for mobile and desktop

## 🧪 Testing the Platform

### Manual Testing Steps

1. **Start the server**:
```bash
npm run dev
```

2. **Register a user** via the web interface or API
3. **Complete the user profile** with lifestyle preferences
4. **Create a listing** (roommate-seeking only)
5. **Find matches** based on compatibility
6. **Express interest** in potential roommates
7. **View mutual matches**

### Example Test Scenarios

**Scenario 1: Broker Prevention**
- Try registering with `isBroker: true` → Should be rejected
- Verify error message confirms broker prohibition

**Scenario 2: Listing Type Validation**
- Try creating a listing with invalid type → Should fail
- Only "seeking-roommate" or "seeking-room" should work

**Scenario 3: Lifestyle Matching**
- Create two users with similar lifestyles
- Find matches → Should show high compatibility score (>80%)
- Create users with opposite lifestyles
- Find matches → Should show low compatibility score (<40%)

## 📊 Matching Algorithm Details

The compatibility score (0-100) is calculated using weighted factors:

- **Lifestyle Compatibility (40%)**
  - Sleep schedule alignment
  - Cleanliness level match
  - Social preference compatibility
  - Guest frequency alignment
  - Smoking compatibility (critical factor)
  - Pet compatibility

- **Budget Compatibility (25%)**
  - Budget range overlap
  - Rent affordability alignment

- **Location Compatibility (20%)**
  - Same city (high weight)
  - Same neighborhood (bonus)
  - Same state (minimal weight)

- **Timing Compatibility (15%)**
  - Move-in date proximity
  - Lease duration alignment

## 🚫 What We Don't Allow

1. **Full-unit rental listings** - This is not a general rental platform
2. **Single-room rentals without roommate aspect** - Must be shared housing
3. **Broker/agent accounts** - Direct connections only
4. **Unverified users accessing matches** - Verification required
5. **Non-direct listings** - All listings must be from actual residents

## 🤝 Contributing

Contributions are welcome! Please ensure:
- Code follows existing patterns
- Security features are maintained
- Broker filtering remains intact
- Lifestyle matching algorithm is preserved

## 📝 License

ISC

## 🙏 Acknowledgments

Built with the mission to create a genuine, community-focused platform where real people can find compatible roommates without the noise of traditional rental sites or broker interference.

---

**Remember**: roomieVerse helps you find not just a space, but a compatible home and community. 🏠✨
