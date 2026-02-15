# RoomieVerse Project Memory

## Project Stack
- Next.js App Router + TypeScript
- Firebase Auth + Firestore (listings, users)
- Cloudflare R2 for image storage (S3-compatible)
- Neobrutalist design system (border-2 border-black, shadow-[3px_3px_0_0_#000])
- Port: 3005

## Key Architecture
- MODERATION_ENABLED flag: listings start as "pending" → admin approves → "active"
- Admin emails configured via ADMIN_EMAILS env var
- Auth flow: Google login → admin check → redirect to /admin or /home

## Technical Reminders
- **Community → Supabase migration**: Community features (posts, comments, likes, reports) are initially on Firestore for simplicity. When DAU exceeds ~300+ or reads become a bottleneck, consider migrating community data to Supabase (PostgreSQL). Supabase free tier: 500MB, unlimited API requests, built-in real-time. Keep listings + auth on Firebase, only move community. Store Firebase UID as user_id in Supabase tables. Note: will lose Supabase RLS, handle auth in API routes instead.

## User Preferences
- Vietnamese UI text
- Clean, minimal dashboard design (bg-blue-50/60, white cards, no uppercase titles)
- Prefers vertical layouts over grid for admin items
- Items in cards without heavy borders (hover:bg-* + rounded-lg instead of border-2 border-black)
