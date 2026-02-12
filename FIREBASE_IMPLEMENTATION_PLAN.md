# Firebase Implementation Plan - roomieVerse

> **STATUS: CODE IMPLEMENTED** - Tất cả code đã được viết. Cần điền credentials vào `.env.local` để kích hoạt.

## Tổng quan chiến lược

### 1 Firebase Project + Toggle

| Setting | Dev Mode | Prod Mode |
|---|---|---|
| `FIREBASE_ENABLED` | `true` | `true` |
| `MODERATION_ENABLED` | `false` | `true` |
| **Listing flow** | Đăng → Active ngay | Đăng → Pending → Admin duyệt → Active |
| **Auth** | Google Auth | Google Auth |
| **Firestore** | Cùng cấu trúc | Cùng cấu trúc + moderation fields |
| **URL** | localhost / dev domain | roomieverse.vn |

**Ý tưởng**: Cùng codebase, chỉ khác `.env` file. Dùng 1 biến `NEXT_PUBLIC_MODERATION_ENABLED=true/false` để toggle admin flow.

### Storage Strategy
- **Firestore** → Data (listings, users, reports, admin actions)
- **Cloudflare R2** → Hình ảnh (upload qua Next.js API route)
- **Firebase Auth** → Authentication (Google Sign-In)

---

## 1. Firestore Collections Structure

### `listings` collection
```
listings/{listingId}
├── id: string                    // "rm-1738291000" or "rs-1738291000"
├── title: string
├── category: "roommate" | "roomshare"
├── roommateType: "have-room" | "find-partner"
├── propertyTypes: string[]       // ["house", "apartment"]
│
├── // Content
├── introduction: string          // Self intro / room intro
├── description: string
├── othersIntro?: string          // Giới thiệu người đang ở
│
├── // Address
├── city: string
├── district: string
├── specificAddress?: string
├── buildingName?: string
├── addressOther?: string
├── locationNegotiable?: boolean
│
├── // Room details
├── roomSize?: string
├── currentOccupants?: string
├── totalRooms?: string
├── minContractDuration?: string
│
├── // Pricing
├── costs: {
│   ├── rent?: string
│   ├── deposit?: string
│   ├── electricity?: string
│   ├── water?: string
│   ├── internet?: string
│   ├── service?: string
│   ├── parking?: string
│   ├── management?: string
│   └── other?: string
│ }
├── budget?: string               // For find-partner type
│
├── // Media
├── images: string[]              // R2 URLs (not base64!)
├── amenities: string[]
├── amenitiesOther?: string
│
├── // Preferences
├── preferences: {
│   ├── gender?: string[]
│   ├── status?: string[]
│   ├── schedule?: string[]
│   ├── cleanliness?: string[]
│   ├── habits?: string[]
│   ├── pets?: string[]
│   ├── moveInTime?: string[]
│   └── other?: string
│ }
│
├── // Contact
├── contact: {
│   ├── phone: string
│   ├── zalo?: string
│   ├── facebook?: string
│   └── instagram?: string
│ }
│
├── // Move-in
├── moveInDate: string
├── timeNegotiable?: boolean
│
├── // Author & Metadata
├── userId: string                // Firebase Auth UID
├── authorName: string            // Denormalized for display
├── authorPhotoURL?: string
├── status: "pending" | "active" | "hidden" | "rejected" | "deleted"
├── createdAt: Timestamp
├── updatedAt: Timestamp
│
├── // Moderation (chỉ dùng khi MODERATION_ENABLED=true)
├── moderatedBy?: string          // Admin UID
├── moderatedAt?: Timestamp
├── rejectionReason?: string
├── moderationNote?: string       // Internal admin note
│
└── // Stats
    ├── viewCount: number
    └── favoriteCount: number
```

### `users` collection
```
users/{uid}
├── uid: string
├── email: string
├── displayName: string
├── photoURL?: string
├── gender?: string
├── birthYear?: string
├── occupation?: string
├── lifestyle?: {
│   ├── schedule?: string[]
│   ├── cleanliness?: string[]
│   ├── habits?: string[]
│   └── otherHabits?: string
│ }
├── bio?: string                  // Short intro
├── role: "user" | "admin"        // Cho admin flow
├── createdAt: Timestamp
└── updatedAt: Timestamp
```

### `reports` collection (báo cáo vi phạm)
```
reports/{reportId}
├── listingId: string
├── reportedBy: string            // UID
├── reason: string
├── details?: string
├── status: "pending" | "reviewed" | "resolved"
├── reviewedBy?: string           // Admin UID
├── createdAt: Timestamp
└── reviewedAt?: Timestamp
```

### `favorites` collection (lưu yêu thích)
```
favorites/{odcId}
├── userId: string
├── listingId: string
├── createdAt: Timestamp
```
> Query: `where("userId", "==", uid)` để lấy danh sách yêu thích

---

## 2. Cloudflare R2 - Image Storage

### Tại sao R2 thay vì Firebase Storage?
- **Free tier rộng rãi**: 10GB storage, 10 triệu reads/tháng miễn phí
- **Không tính phí egress** (bandwidth): Firebase Storage tính phí download
- **S3-compatible API**: Dễ integrate
- **Custom domain**: Gắn CDN qua Cloudflare

### Architecture
```
User Upload → Next.js API Route → Cloudflare R2 → Return URL
                                                      ↓
                                              Save URL to Firestore
```

### API Route cần tạo
```
app/api/
├── upload/route.ts          // POST: Upload image to R2, return URL
├── delete-image/route.ts    // DELETE: Remove image from R2
```

### Upload Flow
1. User chọn ảnh trong create form
2. Client gửi file qua `POST /api/upload`
3. API route:
   - Validate file (type, size < 5MB)
   - Resize/compress nếu cần (sharp library)
   - Upload to R2 bucket
   - Return public URL
4. Client lưu URL vào form state (thay vì base64)
5. Khi submit form, URLs đã có sẵn → save to Firestore

### R2 Bucket Structure
```
roomieverse-images/
├── listings/
│   ├── {listingId}/
│   │   ├── 1.webp
│   │   ├── 2.webp
│   │   └── 3.webp
│   └── ...
└── avatars/
    ├── {userId}.webp
    └── ...
```

### Environment Variables cần thêm
```env
# Cloudflare R2
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=roomieverse-images
R2_PUBLIC_URL=https://images.roomieverse.vn  # Custom domain hoặc R2.dev URL
```

---

## 3. Listing Flow - Có và Không có Admin Duyệt

### Flow KHÔNG có admin duyệt (Dev)
```
User tạo listing → status: "active" → Hiển thị ngay trên trang chủ
```

### Flow CÓ admin duyệt (Prod)
```
User tạo listing → status: "pending"
    ↓
Admin thấy trong dashboard → Review
    ↓
├── Approve → status: "active" → Hiển thị trên trang chủ
│                               → Notify user (optional)
└── Reject → status: "rejected" → Notify user với lý do
                                → User có thể sửa và submit lại
```

### Implementation bằng 1 biến env
```typescript
// app/lib/config.ts
export const MODERATION_ENABLED = process.env.NEXT_PUBLIC_MODERATION_ENABLED === "true";
```

```typescript
// Khi user submit listing:
const newListing = {
  ...formData,
  status: MODERATION_ENABLED ? "pending" : "active",
  createdAt: serverTimestamp(),
};
```

```typescript
// Khi query listings để hiển thị:
const q = query(
  collection(db, "listings"),
  where("status", "==", "active"),   // Chỉ show "active" listings
  where("category", "==", category),
  orderBy("createdAt", "desc")
);
```

```typescript
// User xem listing của mình (thấy cả pending):
const q = query(
  collection(db, "listings"),
  where("userId", "==", uid),
  orderBy("createdAt", "desc")
);
```

---

## 4. Firestore Security Rules

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // === LISTINGS ===
    match /listings/{listingId} {
      // Anyone can read active listings
      allow read: if resource.data.status == "active";

      // Authors can read their own listings (any status)
      allow read: if request.auth != null
                  && resource.data.userId == request.auth.uid;

      // Admins can read all
      allow read: if isAdmin();

      // Authenticated users can create
      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid;

      // Authors can update their own (but not status to "active" if moderation on)
      allow update: if request.auth != null
                    && resource.data.userId == request.auth.uid
                    && request.resource.data.status != "active"; // Can't self-approve

      // Admins can update any listing (for moderation)
      allow update: if isAdmin();

      // Only admins can delete
      allow delete: if isAdmin();
    }

    // === USERS ===
    match /users/{userId} {
      // Anyone can read user profiles (public info)
      allow read: if true;

      // Users can only write their own profile
      allow write: if request.auth != null
                   && request.auth.uid == userId;
    }

    // === REPORTS ===
    match /reports/{reportId} {
      // Authenticated users can create reports
      allow create: if request.auth != null;

      // Admins can read and update reports
      allow read, update: if isAdmin();
    }

    // === FAVORITES ===
    match /favorites/{favId} {
      allow read, write: if request.auth != null
                         && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid;
    }

    // Helper: Check if user is admin
    function isAdmin() {
      return request.auth != null
             && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }
  }
}
```

---

## 5. Implementation Steps (Thứ tự thực hiện)

### Phase 1: Firebase Setup (Không admin duyệt)
Dùng **roomieverse-dev** project.

1. **Tạo Firebase project** `roomieverse-dev` trên console
2. **Enable services**: Auth (Google), Firestore, deploy security rules
3. **Cập nhật `.env.local`** với Firebase config
4. **Bật Firebase** trong `app/lib/firebase.ts` (`FIREBASE_ENABLED = true`)
5. **Cập nhật `listings.ts`**:
   - Thêm `createListing()`, `updateListing()`, `deleteListing()`
   - Sửa `getListings()` để query Firestore thay mock data
   - Bỏ `USE_MOCK_DATA` flag
6. **Cập nhật `users.ts`**: Đã có sẵn Firestore logic, chỉ cần bật Firebase
7. **Cập nhật create forms**: Submit → Firestore thay localStorage
8. **Cập nhật AuthContext**: Bỏ mock auth

### Phase 2: Cloudflare R2 Integration
1. **Tạo R2 bucket** trên Cloudflare dashboard
2. **Tạo API token** (R2 read/write)
3. **Install `@aws-sdk/client-s3`** (S3-compatible SDK)
4. **Tạo `app/api/upload/route.ts`**: Upload handler
5. **Cập nhật create forms**: Upload ảnh → R2 → lưu URL
6. **Cập nhật detail pages**: Hiển thị ảnh từ URL thay base64

### Phase 3: Admin Moderation (Production)
1. **Tạo Firebase project** `roomieverse-prod`
2. **Set `NEXT_PUBLIC_MODERATION_ENABLED=true`**
3. **Cập nhật admin dashboard** (`/admin`):
   - List pending listings
   - Approve/Reject UI
   - View reports
4. **Thêm status badge** cho user's listings (pending/active/rejected)
5. **Deploy security rules** với moderation logic
6. **Optional**: Email/notification khi listing được duyệt/từ chối

---

## 6. Files cần tạo/sửa

### Files mới cần tạo
```
app/lib/config.ts                  # MODERATION_ENABLED flag
app/api/upload/route.ts            # R2 image upload
app/api/delete-image/route.ts      # R2 image delete
app/lib/r2.ts                      # R2 client setup
firestore.rules                    # Security rules file
.env.local                         # Environment variables (dev)
.env.production                    # Environment variables (prod)
```

### Files cần sửa
```
app/lib/firebase.ts                # FIREBASE_ENABLED = true
app/data/listings.ts               # Thêm CRUD, bỏ mock data toggle
app/data/users.ts                  # Đã OK, chỉ cần Firebase bật
app/data/types.ts                  # Thêm moderation fields cho ListingStatus
app/contexts/AuthContext.tsx        # Bỏ mock auth
app/roommate/create/page.tsx       # Submit → Firestore + R2
app/roomshare/create/page.tsx      # Submit → Firestore + R2
app/roommate/page.tsx              # Query Firestore
app/roomshare/page.tsx             # Query Firestore
app/roommate/listing/[id]/page.tsx # Fetch from Firestore
app/roomshare/listing/[id]/page.tsx# Fetch from Firestore
app/admin/page.tsx                 # Admin moderation UI
app/profile/page.tsx               # Save profile to Firestore
```

---

## 7. Packages cần install

```bash
# R2 (S3-compatible)
npm install @aws-sdk/client-s3

# Image processing (optional, cho server-side resize)
npm install sharp

# Firebase Admin SDK (cho API routes - server-side)
npm install firebase-admin
```

> **Note**: `firebase` client SDK đã có rồi (v12.6.0). `firebase-admin` dùng cho API routes (server-side) để verify auth tokens và thực hiện admin operations.

---

## 8. Environment Variables Template

```env
# === Firebase (Dev) ===
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=roomieverse-dev
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# === Firebase Admin (for API routes) ===
FIREBASE_ADMIN_PROJECT_ID=roomieverse-dev
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# === Cloudflare R2 ===
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=roomieverse-images
R2_PUBLIC_URL=

# === App Config ===
NEXT_PUBLIC_MODERATION_ENABLED=false   # true for prod
```

---

## 9. Migration Strategy

### Từ localStorage → Firestore
- Không cần migrate mock data (nó chỉ để dev)
- Listings mới sẽ vào Firestore
- Có thể giữ fallback đọc localStorage trong thời gian chuyển đổi
- Khi xong hết, bỏ hoàn toàn localStorage logic

### Từ base64 images → R2 URLs
- Listings mới sẽ upload ảnh lên R2
- Listings cũ (localStorage) có base64 sẽ không migrate (chỉ test data)
- Detail page nên handle cả 2 format (URL và base64) trong thời gian chuyển đổi

---

## 10. Timeline ước tính

| Phase | Nội dung | Effort |
|-------|---------|--------|
| Phase 1 | Firebase setup + Firestore CRUD | 1-2 sessions |
| Phase 2 | R2 image upload | 1 session |
| Phase 3 | Admin moderation | 1-2 sessions |
| Testing | End-to-end testing | 1 session |

---

## 11. Lưu ý quan trọng

1. **Không bao giờ commit `.env` files** - đã có trong `.gitignore`
2. **Firestore indexes**: Cần tạo composite indexes cho các query phức tạp (category + status + createdAt)
3. **R2 CORS**: Phải config CORS cho R2 bucket để cho phép upload từ client domain
4. **Rate limiting**: Nên thêm rate limit cho API upload route (tránh spam)
5. **Image validation**: Chỉ cho phép jpg/png/webp, max 5MB, max 5 ảnh/listing
6. **Firebase quotas**: Free tier Firestore = 50K reads/day, 20K writes/day - đủ cho MVP
7. **R2 free tier**: 10GB storage, 10M Class B ops/month - rất đủ cho MVP

---

## 12. IMPLEMENTATION STATUS (Done)

### Files đã tạo mới
| File | Mô tả |
|------|-------|
| `app/lib/config.ts` | FIREBASE_ENABLED, MODERATION_ENABLED, R2_PUBLIC_URL |
| `app/lib/r2.ts` | S3Client cho Cloudflare R2 |
| `app/lib/imageUpload.ts` | Helper upload ảnh (R2 hoặc fallback base64) |
| `app/lib/firebase-admin.ts` | Firebase Admin SDK init (server-side) |
| `app/api/upload/route.ts` | API endpoint upload ảnh lên R2 |
| `app/api/auth/promote/route.ts` | API kiểm tra + promote admin (server-side, bảo mật) |
| `.env.local.example` | Template env variables |
| `firestore.rules` | Firestore security rules (lock role field) |

### Files đã sửa
| File | Thay đổi |
|------|----------|
| `app/data/types.ts` | Thêm `pending`, `rejected` vào ListingStatus; thêm UserRole, Report, Favorite types; thêm moderation + stats fields vào RoomListing |
| `app/lib/firebase.ts` | Dùng FIREBASE_ENABLED từ config.ts, check apiKey trước khi init |
| `app/data/listings.ts` | **Rewrite hoàn toàn**: Firestore CRUD + moderation ops (approve/reject/resubmit) + fallback localStorage |
| `app/data/users.ts` | Thêm localStorage fallback, isUserAdmin(), setUserAdmin() |
| `app/contexts/AuthContext.tsx` | Thêm `isAdmin` state, gọi `/api/auth/promote` server-side để check admin |
| `app/roommate/create/page.tsx` | Submit qua `createListing()` + `uploadImages()` thay localStorage |
| `app/roomshare/create/page.tsx` | Submit qua `createListing()` + `uploadImages()` thay localStorage |
| `app/admin/moderation/page.tsx` | Wire real Firestore data: fetch pending, approve, reject (với lý do), hard delete |

### Packages đã install
- `@aws-sdk/client-s3` - S3-compatible SDK cho Cloudflare R2
- `firebase-admin` - Firebase Admin SDK cho server-side operations

### Admin Security Architecture
```
ADMIN_EMAILS (server-only env, KHÔNG có NEXT_PUBLIC_)
       ↓
POST /api/auth/promote
  1. Client gửi Firebase ID token
  2. Server verify token (firebase-admin)
  3. Server check email vs ADMIN_EMAILS
  4. Nếu khớp → Admin SDK write role: "admin" to Firestore
  5. Return {isAdmin: true/false}
       ↓
Firestore Rules chặn client tự đổi role field
  - create: role phải là "user" hoặc không có
  - update: role phải giữ nguyên giá trị cũ
  - Chỉ Admin SDK (server) mới bypass rules được
```

---

## 13. SETUP CHECKLIST (Bạn cần làm)

### A. Firebase Setup
1. [ ] Vào Firebase Console → Project Settings → General
2. [ ] Nếu chưa có Web App → click `</>` để tạo
3. [ ] Copy config values (apiKey, authDomain, projectId, etc.)
4. [ ] Paste vào `.env.local` (copy từ `.env.local.example`)
5. [ ] Firebase Console → Authentication → Enable Google sign-in
6. [ ] Firebase Console → Firestore Database → Create database (start in test mode)
7. [ ] Deploy security rules: `firestore.rules` → Firebase Console → Firestore → Rules

### B. Cloudflare R2 Setup
1. [ ] Cloudflare Dashboard → R2 → Create Bucket (tên: `roomieverse-images`)
2. [ ] R2 → Manage R2 API Tokens → Create API Token (read + write)
3. [ ] Copy Account ID, Access Key ID, Secret Access Key → `.env.local`
4. [ ] R2 Bucket Settings → Public Access → Enable (chọn R2.dev subdomain hoặc custom domain)
5. [ ] Copy public URL → `NEXT_PUBLIC_R2_PUBLIC_URL` trong `.env.local`

### C. Firestore Composite Indexes (tạo sau khi có data)
Firestore sẽ auto-suggest indexes khi query lỗi. Hoặc tạo trước:
- `listings`: category (ASC) + status (ASC) + createdAt (DESC)
- `listings`: userId (ASC) + createdAt (DESC)
- `listings`: status (ASC) + createdAt (DESC)

### D. Admin Setup (server-side, bảo mật)
1. [ ] Firebase Console → Project Settings → Service Accounts → Generate New Private Key
2. [ ] Mở file JSON download được, copy 3 giá trị vào `.env.local`:
   ```env
   FIREBASE_ADMIN_PROJECT_ID=your-project-id
   FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
   FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```
3. [ ] Thêm email admin vào `.env.local`:
   ```env
   ADMIN_EMAILS=youremail@gmail.com
   ```
4. [ ] Đăng nhập bằng Google → tự động được promote lên admin
5. [ ] Vào `/admin` để verify quyền admin

### E. Test
1. [ ] `npm run dev` → đăng nhập bằng Google
2. [ ] Tạo 1 listing → check Firestore console xem data có vào không
3. [ ] Upload ảnh → check R2 bucket xem file có lên không
4. [ ] Set `NEXT_PUBLIC_MODERATION_ENABLED=true` → tạo listing → check status = "pending"
5. [ ] Vào `/admin/moderation` → duyệt/từ chối listing
