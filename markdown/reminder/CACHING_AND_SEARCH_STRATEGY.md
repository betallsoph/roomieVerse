# Chiến lược Caching và Search cho RoomieVerse

> **Tài liệu này giải thích cách hoạt động của hệ thống caching và search hiện tại, cùng với các khuyến nghị khi scale.**

---

## 📦 Kiến trúc hiện tại

### 1. SWR (Stale-While-Revalidate)

**File:** `app/lib/swr-config.tsx`

SWR là thư viện caching phía client từ Vercel, hoạt động theo nguyên tắc:
1. Trả về data từ cache (stale) ngay lập tức
2. Gửi request để fetch data mới
3. Cập nhật UI khi data mới về

```tsx
// Cấu hình mặc định
{
  revalidateOnFocus: false,    // Không fetch lại khi focus tab
  revalidateOnReconnect: true, // Fetch lại khi có mạng
  errorRetryCount: 3,          // Retry 3 lần nếu lỗi
  dedupingInterval: 2000,      // Gộp requests trong 2 giây
  refreshInterval: 0,          // Không auto-refresh
}
```

### 2. Custom Hooks

**Files:**
- `app/hooks/useListings.ts` - Fetch danh sách phòng
- `app/hooks/useUserProfile.ts` - Fetch profile người dùng
- `app/hooks/useSearch.ts` - Search và filter

```tsx
// Ví dụ sử dụng
const { listings, isLoading } = useListings();
const { profile, updateProfile } = useUserProfile(user?.uid);
const { results, setSearchQuery, setFilters } = useListingSearch(listings);
```

### 3. Client-side Filtering

**File:** `app/lib/filters.ts`

Filtering được thực hiện hoàn toàn phía client:
- Parse giá từ string VND sang số
- Filter theo category, location, price, gender, keywords
- Sort theo newest, oldest, price

### 4. Fuzzy Search với Fuse.js

**File:** `app/lib/search.ts`

Fuse.js cung cấp tìm kiếm mờ (fuzzy search):
- Tìm trong title, description, location, author
- Threshold 0.4 (không quá strict, không quá loose)
- Hỗ trợ tiếng Việt

---

## ⚠️ Cảnh báo quan trọng

### 1. Firestore Read Costs

**Vấn đề:** Mỗi lần fetch `getListings()` đọc TẤT CẢ documents trong collection.

**Hiện tại OK vì:**
- SWR cache với `dedupingInterval: 60000` (1 phút)
- `revalidateOnFocus: false` - không fetch khi switch tab
- `revalidateIfStale: false` cho profile

**Khi nào thành vấn đề:**
- > 1000 listings: mỗi lần đọc = 1000 reads
- Nhiều users cùng lúc: cache chỉ hoạt động per-user

### 2. Client-side Filtering Limitations

**Hiện tại OK vì:**
- Số lượng listings nhỏ (< 1000)
- Filter nhanh trên browser

**Khi nào thành vấn đề:**
- > 10,000 listings: chậm, tốn RAM
- Mobile devices với RAM thấp
- Initial load lâu (phải download tất cả)

### 3. Search Index Memory

Fuse.js giữ index trong memory. Với mỗi listing ~1KB index:
- 1,000 listings ≈ 1MB RAM
- 10,000 listings ≈ 10MB RAM
- 100,000 listings ≈ 100MB RAM (quá lớn cho browser)

---

## 🚀 Khi nào cần upgrade?

### Dấu hiệu cần thay đổi

| Metric | Ngưỡng cảnh báo | Hành động |
|--------|-----------------|-----------|
| Số listings | > 1,000 | Implement pagination |
| Số listings | > 10,000 | Server-side filtering |
| Monthly Firestore reads | > 50,000 | Add Redis/CDN cache |
| Search latency | > 500ms | Migrate to Algolia/Meilisearch |
| Concurrent users | > 100 | Server-side caching |

### Roadmap upgrade

#### Phase 1: Pagination (1,000 - 5,000 listings)

```tsx
// Thay vì fetch tất cả
const listings = await getListings();

// Fetch theo page
const listings = await getListings({
  limit: 20,
  startAfter: lastDoc
});
```

#### Phase 2: Server-side Filtering (5,000 - 20,000 listings)

```tsx
// Chuyển filter logic sang Firestore query
const q = query(
  collection(db, 'listings'),
  where('category', '==', 'roommate'),
  where('price', '>=', 3000000),
  where('price', '<=', 5000000),
  orderBy('createdAt', 'desc'),
  limit(20)
);
```

**Lưu ý:** Cần tạo composite indexes trong Firestore.

#### Phase 3: Dedicated Search Service (> 20,000 listings)

**Các options:**

1. **Algolia** (Recommended)
   - Dễ setup, tốt cho tiếng Việt
   - Free tier: 10,000 records, 10,000 searches/month
   - Pricing: ~$1/1,000 records/month

2. **Meilisearch** (Self-hosted)
   - Open source, miễn phí
   - Cần server riêng
   - Hỗ trợ tiếng Việt tốt

3. **Elasticsearch**
   - Powerful nhất
   - Phức tạp để setup
   - Cần DevOps experience

#### Phase 4: CDN + Redis Caching (> 100 concurrent users)

```
User → CDN (Cloudflare) → API Route → Redis → Firestore
         ↓                              ↓
    Cache 5 mins              Cache 1 min
```

**Setup:**
1. Redis trên Upstash (serverless, pay-per-use)
2. Cloudflare CDN cache cho static data
3. Stale-while-revalidate at CDN level

---

## 📁 File Structure

```
app/
├── lib/
│   ├── firebase.ts       # Firebase config
│   ├── swr-config.tsx    # SWR provider
│   ├── filters.ts        # Client-side filtering
│   └── search.ts         # Fuse.js search
├── hooks/
│   ├── useListings.ts    # Listings data hook
│   ├── useUserProfile.ts # Profile data hook
│   └── useSearch.ts      # Combined search hook
└── data/
    ├── listings.ts       # Firestore listings CRUD
    └── users.ts          # Firestore users CRUD
```

---

## 🔧 Hướng dẫn sử dụng

### Basic Usage

```tsx
'use client';

import { useListings } from '@/app/hooks/useListings';
import { useListingSearch } from '@/app/hooks/useSearch';

export default function ListingsPage() {
  const { listings, isLoading } = useListings();
  const {
    results,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters
  } = useListingSearch(listings);

  if (isLoading) return <Loading />;

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Tìm kiếm..."
      />

      <select onChange={(e) => setFilters({ category: e.target.value })}>
        <option value="">Tất cả</option>
        <option value="roommate">Tìm người ở ghép</option>
        <option value="roomshare">Cho thuê phòng</option>
      </select>

      {results.map(listing => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
```

### Manual Cache Refresh

```tsx
const { mutate } = useListings();

// Sau khi tạo listing mới
await createListing(newListing);
mutate(); // Refresh cache
```

### Optimistic Updates

```tsx
const { updateProfile } = useUserProfile(uid);

// UI cập nhật ngay, không cần đợi server
await updateProfile({ ...profile, name: 'New Name' });
```

---

## 📊 Monitoring

### Firestore Usage

1. Vào Firebase Console → Firestore → Usage
2. Monitor "Document reads" daily
3. Set budget alerts

### Client Performance

```tsx
// Đo search performance
console.time('search');
const results = searchListings(listings, query);
console.timeEnd('search');
// Target: < 100ms
```

---

## ✅ Checklist trước khi launch

- [ ] Test với 100 listings
- [ ] Test search tiếng Việt có dấu
- [ ] Kiểm tra Firestore rules
- [ ] Set Firestore budget alerts
- [ ] Test trên mobile (RAM thấp)
- [ ] Monitor initial load time

---

*Cập nhật lần cuối: December 2024*
