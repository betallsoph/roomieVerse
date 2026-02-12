# Technical Reminder - roomieVerse

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Auth**: Firebase Auth (via `AuthContext`)
- **Data**: Mock data in `app/data/listings.ts` + localStorage for user-created listings

## Project Structure
```
app/
├── components/         # Shared components (MainHeader, ShareFooter, ListingCard, FilterTabs, etc.)
├── contexts/           # AuthContext
├── data/
│   ├── types.ts        # RoomListing, RoommatePreferences, RoomCosts, UserProfile
│   ├── listings.ts     # Mock data + getListingById, getListingsByCategory
│   └── locations.ts    # Cities + districts data
├── roommate/           # "Tìm bạn ở chung" section
│   ├── page.tsx        # Landing page
│   ├── all/page.tsx    # View all listings (have-room & find-partner tabs)
│   ├── create/page.tsx # Multi-step create form (5 steps for have-room, 4 for find-partner)
│   └── listing/[id]/   # Detail page (2 layouts: have-room & find-partner)
├── roomshare/          # "Tìm phòng" section (share phòng dư)
│   ├── page.tsx        # Landing page
│   ├── all/page.tsx    # View all roomshare listings
│   ├── create/page.tsx # Multi-step create form (5 steps)
│   └── listing/[id]/   # Detail page
├── admin/              # Admin dashboard
├── auth/               # Auth page
└── user/[id]/          # User profile page
```

## Key Data Types

### RoomListing
- `category`: `"roommate"` | `"roomshare"`
- `roommateType`: `"have-room"` | `"find-partner"` (only for roommate)
- `propertyType`: `"house"` | `"apartment"`
- Address fields: `city`, `district`, `specificAddress`, `buildingName`, `addressOther`
- Room details: `roomSize`, `totalRooms`, `currentOccupants`, `minContractDuration`
- Content: `introduction`, `othersIntro`, `description`
- Media: `images[]`, `amenities[]`, `amenitiesOther`
- Contact: `phone`, `zalo`, `facebook`, `instagram`
- `costs`: RoomCosts (rent, deposit, electricity, water, internet, service, parking, management, other)
- `preferences`: RoommatePreferences (gender, status, schedule, cleanliness, habits, pets, moveInTime, other)

## Key Conventions
- **Color themes**: Blue for roommate pages, Pink for roomshare pages
- **Card style**: `rounded-xl border-2 border-black shadow-[var(--shadow-secondary)]`
- **Button style**: `btn-primary`, `btn-secondary`, `btn-pink` (defined in globals)
- **Sticky sidebar**: `lg:sticky lg:top-24` on detail pages
- **localStorage keys**:
  - `roommate_listings` — user-created roommate listings
  - `roomshare_listings` — user-created roomshare listings
  - `favorites` — saved listing IDs

## Roomshare Create Form (5 Steps)
1. **Basic Info**: propertyType, title, introduction, othersIntro, city, district, specificAddress, buildingName, totalRooms, roomSize, currentOccupants, rentPrice, deposit, minLeaseDuration
2. **Media & Amenities**: images, amenities, amenitiesOther
3. **Costs**: electricity, water, internet, service, parking, management, other
4. **Preferences**: gender, status, schedule, cleanliness, habits, pets, moveInTime, other
5. **Contact**: phone, zalo, facebook, instagram

## Roommate Create Form
### Have-Room (5 Steps)
1. Basic Info (similar to roomshare)
2. Media & Amenities
3. Costs
4. Preferences for roommate
5. Contact

### Find-Partner (4 Steps)
1. About me + preferred location/budget
2. Lifestyle preferences
3. Roommate preferences
4. Contact

## Important Notes
- Detail pages use **2-column grid layout**: `grid gap-8 lg:grid-cols-[1fr_380px]`
- Listings are sorted by **newest first** (`postedDate` parsing)
- The `getListingById` function checks both mock data and localStorage
- Contact info is hidden behind auth — must login to see phone number
