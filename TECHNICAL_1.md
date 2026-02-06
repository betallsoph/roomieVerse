# roomieVerse - Technical Documentation

> **Project Status:** ~50% Complete
> **Target Launch:** 1-2 months (MVP)
> **Last Updated:** January 2025

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Business Model](#business-model)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Database Design](#database-design)
6. [Authentication](#authentication)
7. [Route Architecture](#route-architecture)
8. [Features](#features)
9. [Data Flow](#data-flow)
10. [Design System](#design-system)
11. [SEO Strategy](#seo-strategy)
12. [Deployment](#deployment)
13. [Roadmap](#roadmap)
14. [Environment Variables](#environment-variables)
15. [Development Guide](#development-guide)

---

## Project Overview

### About roomieVerse

**roomieVerse** là nền tảng kết nối người tìm phòng trọ và người tìm bạn ở ghép tại Việt Nam. Platform giúp:
- Người **có phòng** tìm bạn ở ghép phù hợp
- Người **cần phòng** tìm nơi ở và roommate

### Project Info

| Item | Detail |
|------|--------|
| **Project Type** | Solo Project |
| **Target Market** | TP. Hồ Chí Minh (ban đầu) |
| **Target Users** | Sinh viên, người đi làm trẻ (22-30), mọi độ tuổi |
| **Expected Scale** | 1,000 - 10,000 users (năm đầu) |
| **Timeline** | MVP trong 1-2 tháng |

### Core Concepts

| Term | Vietnamese | Description |
|------|-----------|-------------|
| Roommate | Tìm bạn ở ghép | Kết nối người để ở chung |
| Roomshare | Tìm phòng | Tìm phòng trống để thuê |
| Have-room | Đã có phòng | User có phòng, tìm bạn ghép |
| Find-partner | Chưa có phòng | User cần phòng, tìm nơi ở |

---

## Business Model

### Revenue Model: Freemium

Miễn phí cơ bản + tính phí nâng cao

### Free Tier
- Đăng ký tài khoản
- Đăng **2-3 bài** miễn phí
- Tìm kiếm và xem listings
- Lưu favorites
- Liên hệ trực tiếp (redirect Zalo/Messenger)

### Premium Features (Paid)

| Feature | Description | Pricing Model |
|---------|-------------|---------------|
| **Đăng thêm bài** | Vượt quota 2-3 bài miễn phí | Per listing |
| **Hiển thị ưu tiên** | Bài đăng lên đầu danh sách | Subscription/Per listing |
| **Verified Badge** | Xác minh danh tính | One-time fee |
| **Gói combo** | Tất cả tính năng premium | Monthly subscription |

### Communication Model
- **Không có in-app chat** - Redirect ra Zalo/Facebook/Phone
- Giảm chi phí server, tận dụng platforms có sẵn

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.0.7 | React framework với App Router |
| **React** | 19.2.1 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Utility-first CSS |

### Backend & Data
| Technology | Version | Purpose |
|------------|---------|---------|
| **Firebase** | 12.6.0 | BaaS (Auth, Firestore, Storage) |
| **SWR** | 2.3.7 | Data fetching & caching |

### Additional Libraries
| Library | Purpose |
|---------|---------|
| **framer-motion** | Animations |
| **lucide-react** | Icons |
| **fuse.js** | Fuzzy search |
| **clsx** / **tailwind-merge** | Class utilities |

### Infrastructure (Planned)
| Service | Purpose |
|---------|---------|
| **Vercel** | Hosting & deployment |
| **Cloudflare R2** | Image storage |
| **Firebase** | Auth + Database |

---

## Project Structure

```
roomieVerse/
├── app/
│   ├── (routes)/
│   │   ├── page.tsx              # Landing page
│   │   ├── auth/                 # Authentication
│   │   ├── roommate/             # Roommate listings
│   │   │   ├── page.tsx          # Roommate main page
│   │   │   ├── all/              # All roommate listings
│   │   │   ├── create/           # Create listing form (4-step)
│   │   │   └── listing/[id]/     # Listing detail (blue theme)
│   │   ├── roomshare/            # Room share listings
│   │   │   ├── page.tsx          # Roomshare main page
│   │   │   ├── all/              # All roomshare listings
│   │   │   └── listing/[id]/     # Listing detail (pink theme)
│   │   ├── profile/              # User profile
│   │   │   ├── page.tsx          # Profile page
│   │   │   └── lifestyle/        # Lifestyle preferences
│   │   ├── favorites/            # Saved listings
│   │   ├── community/            # Community page
│   │   ├── whats-hot/            # Trending content
│   │   ├── about/                # About page
│   │   ├── user/[userId]/        # Public user profile
│   │   └── admin/                # Admin dashboard
│   │       ├── page.tsx          # Admin home
│   │       ├── moderation/       # Content moderation
│   │       ├── blog/             # Blog management
│   │       ├── management/       # User management
│   │       └── maintenance/      # System maintenance
│   │
│   ├── components/               # Shared components
│   │   ├── MainHeader.tsx        # Main navigation
│   │   ├── ShareFooter.tsx       # Footer
│   │   ├── ListingCard.tsx       # Listing card component
│   │   ├── ReportModal.tsx       # Report functionality
│   │   ├── ProfileReminderModal.tsx
│   │   ├── EditProfileModal.tsx
│   │   └── ...
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx       # Authentication state
│   │
│   ├── data/
│   │   ├── types.ts              # TypeScript interfaces
│   │   ├── listings.ts           # Listing data layer
│   │   ├── users.ts              # User data layer
│   │   ├── mockListings.ts       # Mock data for dev
│   │   └── mockUsers.ts          # Mock user data
│   │
│   ├── hooks/
│   │   ├── useListings.ts        # Listing hooks
│   │   ├── useUserProfile.ts     # Profile hooks
│   │   ├── useSearch.ts          # Search functionality
│   │   └── useProfileReminder.ts # Profile completion reminder
│   │
│   ├── lib/
│   │   ├── firebase.ts           # Firebase initialization
│   │   ├── filters.ts            # Filter logic
│   │   ├── search.ts             # Search utilities
│   │   ├── userProfile.ts        # Profile utilities
│   │   ├── utils.ts              # General utilities
│   │   └── swr-config.tsx        # SWR configuration
│   │
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
│
├── public/
│   └── assets/                   # Static assets
│
└── package.json
```

---

## Database Design

### Firebase Firestore Collections

#### `users` Collection

Stores user profile information.

```typescript
interface UserProfile {
  uid: string;              // Firebase Auth UID (document ID)
  email: string;
  displayName: string;
  photoURL?: string;
  gender?: string;          // "male" | "female" | "other"
  birthYear?: string;       // e.g., "1995"
  occupation?: string;      // "student" | "worker" | "freelancer" | "other"
  lifestyle?: {
    schedule?: string[];     // ["early", "late", "flexible"]
    cleanliness?: string[];  // ["very-clean", "normal", "relaxed"]
    habits?: string[];       // ["no-smoke", "no-alcohol", "flexible"]
    otherHabits?: string;
  };
  isVerified?: boolean;     // Premium: verified badge
  isPremium?: boolean;      // Premium subscription status
  createdAt?: string;       // ISO date string
  updatedAt?: string;       // ISO date string
}
```

#### `listings` Collection

Stores room/roommate listings.

```typescript
interface RoomListing {
  id: string | number;           // Document ID
  title: string;
  author: string;
  price: string;                 // Display price (e.g., "5tr/tháng")
  location: string;
  locationNegotiable?: boolean;
  moveInDate: string;
  timeNegotiable?: boolean;
  description: string;
  phone: string;
  zalo?: string;
  facebook?: string;
  instagram?: string;
  postedDate: string;
  category: "roommate" | "roomshare";
  roommateType?: "have-room" | "find-partner";
  propertyType?: "house" | "apartment";
  propertyTypes?: string[];      // ["house", "apartment"]
  userId?: string;               // Owner's Firebase UID
  status?: "active" | "hidden" | "deleted";
  isPriority?: boolean;          // Premium: priority display

  // Extended fields
  introduction?: string;
  images?: string[];             // Image URLs (R2)
  amenities?: string[];          // ["ac", "wifi", "washing", ...]
  amenitiesOther?: string;
  preferences?: RoommatePreferences;
  costs?: RoomCosts;             // For have-room listings

  // Room details (have-room only)
  roomSize?: string;             // m²
  currentOccupants?: string;
  minContractDuration?: string;

  isDraft?: boolean;
}

interface RoommatePreferences {
  gender?: string[];       // ["male", "female", "any"]
  status?: string[];       // ["student", "worker", "other"]
  statusOther?: string;
  schedule?: string[];     // ["early", "late", "flexible"]
  cleanliness?: string[];  // ["very-clean", "normal", "relaxed"]
  habits?: string[];       // ["no-smoke", "no-alcohol", "flexible"]
  pets?: string[];         // ["no-pets", "cats-ok", "dogs-ok", "any-pets"]
  moveInTime?: string[];   // ["early-month", "end-month", "any", "asap"]
  other?: string;
}

interface RoomCosts {
  rent?: string;
  deposit?: string;
  electricity?: string;
  water?: string;
  internet?: string;
  service?: string;
  parking?: string;
  management?: string;
  other?: string;
}
```

#### `reviews` Collection (Planned)

```typescript
interface Review {
  id: string;
  fromUserId: string;      // Người đánh giá
  toUserId: string;        // Người được đánh giá
  listingId?: string;      // Listing liên quan (optional)
  rating: number;          // 1-5 stars
  comment: string;
  createdAt: string;
}
```

#### `blog_posts` Collection (Planned)

```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;         // Markdown or HTML
  excerpt: string;
  coverImage?: string;
  author: string;
  tags: string[];
  status: "draft" | "published";
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}
```

### ID Prefix System

Listings use ID prefixes to identify category without database lookup:

| Prefix | Category | Example |
|--------|----------|---------|
| `rm-` | Roommate | `rm-1737123456789` |
| `rs-` | Roomshare | `rs-1737123456789` |

### Data Storage Status

| Operation | Storage | Status |
|-----------|---------|--------|
| User Profile - CRUD | Firestore | ✅ Working |
| Listings - Read | Firestore + Mock | ✅ Working |
| Listings - Create | **localStorage** | ⚠️ Temporary |
| Listings - Update/Delete | **localStorage** | ⚠️ Temporary |
| Images - Upload | **Base64** | ⚠️ Need R2 |
| Reviews | Not implemented | 📋 Planned |
| Blog Posts | Not implemented | 📋 Planned |

---

## Authentication

### Firebase Auth Configuration

```typescript
// app/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### Auth Context

```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isProfileComplete: boolean;
  profileChecked: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  checkProfileComplete: () => Promise<boolean>;
}
```

### Auth Flow

```
1. User clicks "Đăng nhập với Google"
2. Firebase Google OAuth popup opens
3. User authenticates
4. AuthContext receives user via onAuthStateChanged
5. System checks if profile exists in Firestore
6. If new user → Show profile completion modal
7. If returning user → Check if profile complete
8. User can access protected features
```

### Profile Requirements

Users are prompted to complete:
- Gender (Giới tính)
- Birth Year (Năm sinh)
- Occupation (Nghề nghiệp)

`ProfileReminderModal` appears for incomplete profiles (dismissible 24h).

---

## Route Architecture

### Public Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/about` | About roomieVerse |
| `/roommate` | Roommate section main |
| `/roommate/all` | All roommate listings |
| `/roommate/listing/[id]` | Detail (blue theme) |
| `/roomshare` | Roomshare section main |
| `/roomshare/all` | All roomshare listings |
| `/roomshare/listing/[id]` | Detail (pink theme) |
| `/community` | Community page |
| `/whats-hot` | Trending content |
| `/auth` | Login/Register |
| `/user/[userId]` | Public user profile |

### Protected Routes

| Route | Description |
|-------|-------------|
| `/profile` | User's own profile |
| `/profile/lifestyle` | Lifestyle preferences |
| `/favorites` | Saved listings |
| `/roommate/create` | Create new listing |

### Admin Routes

| Route | Description |
|-------|-------------|
| `/admin` | Admin dashboard |
| `/admin/moderation` | Content moderation |
| `/admin/blog` | Blog management |
| `/admin/management` | User management |
| `/admin/maintenance` | System maintenance |

### Legacy Redirect

`/listing/[id]` redirects to appropriate category based on ID prefix or data lookup.

---

## Features

### Completed ✅

| Feature | Description |
|---------|-------------|
| Landing Page | Hero, how-it-works, CTA |
| Google OAuth | Login with Google |
| User Profile | View/edit in Firestore |
| Listing Browse | View listings by category |
| Listing Detail | Full view with contact info |
| Listing Create | 4-step form with draft auto-save |
| Draft System | localStorage auto-save |
| Favorites | Save/unsave (localStorage) |
| Report System | Report inappropriate content |
| Responsive Design | Mobile-first |
| Theme Separation | Blue/Pink by category |

### In Progress 🔄

| Feature | Status |
|---------|--------|
| Firestore Listings CRUD | READ done, CUD pending |
| Image Upload | Need R2 integration |
| Search & Filters | Basic done, enhance needed |

### Planned 📋 (MVP)

| Feature | Priority | Notes |
|---------|----------|-------|
| Cloudflare R2 | High | Image storage |
| Listings to Firestore | High | Complete CRUD |
| SEO Optimization | High | Meta, sitemap, SSR |
| Admin Auth | Medium | Role-based access |

---

## Data Flow

### Listing Creation (4 Steps)

```
Step 1: Basic Info
├── Title
├── Location (+ negotiable)
├── Property Type
├── Introduction
└── Costs (rent, deposit, utilities)

Step 2: Images & Amenities
├── Room Photos (max 5)
├── Room Size, Occupants
├── Contract Duration
└── Amenities

Step 3: Roommate Preferences
├── Gender, Status
├── Schedule, Cleanliness
├── Habits, Pets
└── Move-in timing

Step 4: Contact Info
├── Phone (required)
├── Zalo, Facebook, Instagram

→ Save to localStorage with ID "rm-{timestamp}"
→ Redirect to listing detail
```

### Draft Auto-Save

```
User types in form
    ↓
Debounce 2 seconds
    ↓
Save to localStorage key "roommate_draft"
    ↓
On page load: Check for draft → Show restore modal
```

---

## Design System

### Neobrutalism Style

```css
/* Shadows */
--shadow-primary: 4px 4px 0 0 black;
--shadow-secondary: 3px 3px 0 0 black;

/* Card */
.card {
  border: 2px solid black;
  border-radius: 12px;
  box-shadow: var(--shadow-primary);
}

/* Button hover */
.btn:hover {
  transform: translate(3px, 3px);
  box-shadow: none;
}
```

### Color Themes

| Section | Primary | Background |
|---------|---------|------------|
| **Roommate** | blue-300 | blue-50 |
| **Roomshare** | pink-300 | pink-50 |
| **General** | purple-300 | white |

---

## SEO Strategy

### Requirements (High Priority)

1. **Server-Side Rendering**
   - Next.js App Router with SSR for listing pages
   - Dynamic meta tags per listing

2. **Meta Tags**
   ```tsx
   export const metadata = {
     title: "roomieVerse - Tìm phòng & bạn ở ghép tại TP.HCM",
     description: "Nền tảng kết nối người tìm phòng trọ...",
     openGraph: { ... },
     twitter: { ... }
   };
   ```

3. **Sitemap & robots.txt**
   - Dynamic sitemap for all listings
   - Proper robots.txt configuration

4. **Structured Data**
   - JSON-LD for listings (LocalBusiness, RentalListing)

5. **Performance**
   - Image optimization (next/image)
   - Core Web Vitals optimization

---

## Deployment

### Platform: Vercel

```bash
# Connect to Vercel
vercel link

# Deploy preview
vercel

# Deploy production
vercel --prod
```

### Environment Setup

1. Add all env vars in Vercel dashboard
2. Configure custom domain
3. Set up Vercel Analytics (optional)

### CI/CD

- Auto-deploy on push to `main`
- Preview deployments for PRs

---

## Roadmap

### Phase 1: MVP (1-2 months) 🎯

| Task | Priority | Status |
|------|----------|--------|
| Complete Firestore CRUD | High | 🔄 |
| Cloudflare R2 images | High | 📋 |
| SEO optimization | High | 📋 |
| Admin authentication | Medium | 📋 |
| Content moderation | Medium | 📋 |
| Deploy to Vercel | High | 📋 |

### Phase 2: Growth (3-6 months)

| Feature | Description |
|---------|-------------|
| **Premium Features** | Paid listings, priority, verification |
| **Blog System** | Tips, guides, community content |
| **Review System** | User ratings & reviews |
| **Map View** | Xem phòng trên bản đồ (Google Maps/Mapbox) |
| **Advanced Filters** | More filter options |

### Phase 3: Scale (6+ months)

| Feature | Description |
|---------|-------------|
| **AI Matching** | Gợi ý roommate phù hợp dựa trên preferences |
| **Mobile App** | React Native / Flutter app |
| **Expand to Hà Nội** | Mở rộng ra thị trường phía Bắc |
| **Analytics Dashboard** | Usage statistics for admin |
| **Payment Integration** | Online payment cho premium |

---

## Environment Variables

### Required (.env.local)

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Planned

```env
# Cloudflare R2
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=

# Analytics (optional)
NEXT_PUBLIC_GA_ID=
```

---

## Development Guide

### Getting Started

```bash
# Install dependencies
npm install

# Run dev server (port 3005)
npm run dev

# Build
npm run build

# Lint
npm run lint
```

### Code Style

- TypeScript for all files
- Follow existing component patterns
- Tailwind CSS for styling
- Components should be focused & reusable

### Commit Convention

```
feat: Add new feature
fix: Fix bug
refactor: Code refactoring
style: UI/styling changes
docs: Documentation
chore: Maintenance
```

### Branch Strategy

```
main          - Production
├── develop   - Development
└── feature/* - Feature branches
```

---

## Technical Debt

| Issue | Solution | Priority |
|-------|----------|----------|
| Base64 images | Implement R2 | High |
| Listings in localStorage | Firestore CRUD | High |
| No admin auth | Firebase custom claims | Medium |
| Basic validation | Zod schemas + Security Rules | Medium |
| Basic error handling | Error boundaries, toast | Low |

---

## Contact & Support

- **Project Owner:** Solo Developer
- **Issues:** Track in GitHub Issues
- **Documentation:** This file + inline comments

---

*Last updated: January 2025*
