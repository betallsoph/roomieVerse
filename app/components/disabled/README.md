# Disabled Components

This folder contains components that have been temporarily disabled but may be used again in the future.

## Components

### PostTypeModal.tsx
**Date Disabled:** 2026-02-06
**Reason:** User requested to disable this modal during UI development phase. The modal was used to select post type (roommate vs roomshare) but is not needed currently.

**Usage Before Disabling:**
- Used in `/roommate` page to show post type selection
- Used in `/profile` page for creating new posts

**To Re-enable:**
1. Move `PostTypeModal.tsx` back to `app/components/`
2. Uncomment the imports in:
   - `app/roommate/page.tsx`
   - `app/profile/page.tsx`
3. Uncomment the state declarations and onClick handlers
4. Uncomment the `<PostTypeModal>` component usage

**Dependencies:**
- Uses Lucide React icons (Home, Users, ArrowLeft)
- Requires `next/navigation` for routing
