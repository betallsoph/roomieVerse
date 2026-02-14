# 🚀 Features Reminder — roomieVerse

> Tài liệu ghi nhận các tính năng đã lên kế hoạch, role system, và ý tưởng phát triển.
> Cập nhật lần cuối: 14/02/2026

---

## 📌 Roles System

### Roles hiện tại

| Role | Mô tả | Cách xác định |
|------|--------|---------------|
| **User** | Người dùng thường | Mặc định khi đăng ký |
| **Moderator** | Kiểm duyệt nội dung | Được admin assign |
| **Admin** | Toàn quyền hệ thống | Email trong `ADMIN_EMAILS` env |

### Roles đề xuất thêm

#### 1. 🏠 Landlord (Chủ nhà xác minh)
Dành cho chủ nhà/chủ trọ chuyên nghiệp thường xuyên đăng tin.

**Quyền hạn:**
- Đăng tin không giới hạn (user thường limit 3-5 tin)
- Badge "Chủ nhà xác minh" ✅ hiển thị trên listing card
- Ưu tiên hiển thị tin đăng lên đầu feed
- Dashboard riêng: xem thống kê lượt xem, lượt liên hệ
- Bypass moderation (tin đăng auto-approve vì đã xác minh)

**Cách xác minh:** Upload giấy tờ sở hữu/hợp đồng thuê → Admin duyệt

---

#### 2. ⭐ Verified User (Người dùng xác minh)
User đã xác minh danh tính qua CCCD/CMND.

**Quyền hạn:**
- Badge "Đã xác minh" 🛡️ trên profile & listing
- Xem thông tin liên hệ đầy đủ (user thường chỉ xem được SĐT)
- Ưu tiên trong smart matching (khi có)
- Tin đăng được duyệt nhanh hơn (priority queue)

**Cách xác minh:** Upload ảnh CCCD/CMND → Admin hoặc hệ thống tự động verify

---

#### 3. ✍️ Blogger / Content Creator
Người được phép viết blog/bài viết trên nền tảng.

**Quyền hạn:**
- Tạo & chỉnh sửa bài blog (hiện chỉ admin mới vào được `/admin/blog`)
- Quản lý bài viết của mình qua dashboard blog riêng
- Auto-publish bài blog (không cần duyệt)

**Cách assign:** Admin chọn từ danh sách users

---

#### 4. 🤝 Ambassador (Đại sứ cộng đồng)
User tích cực, được chọn làm đại diện community.

**Quyền hạn:**
- Pin/highlight bài đăng trong community
- Badge "Đại sứ" 🏅 trên profile
- Tạo events/meetup (khi có feature community events)
- Report priority — báo cáo được xử lý nhanh hơn

**Cách assign:** Admin chọn dựa trên mức độ hoạt động

---

### Ma trận quyền tổng hợp

| Quyền | User | Verified | Landlord | Blogger | Ambassador | Mod | Admin |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Đăng tin | ✅ | ✅ | ✅✅ | ✅ | ✅ | ✅ | ✅ |
| Xem liên hệ đầy đủ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Badge đặc biệt | ❌ | 🛡️ | 🏠 | ✍️ | 🏅 | 🔧 | 👑 |
| Bypass moderation | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ |
| Viết blog | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ |
| Pin bài community | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Duyệt tin đăng | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Duyệt bài community | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Quản lý users | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Cài đặt hệ thống | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 📌 Upcoming Features (theo timeline)

### Q1 2026 — Đang phát triển
- [x] Hệ thống đăng tin roommate & roomshare
- [x] Admin moderation system
- [x] Community (bài viết, bình luận)
- [x] Blog system
- [ ] **In-App Messaging** — Chat trực tiếp giữa users trong app

### Q2 2026 — Kế hoạch
- [ ] **Smart Matching Algorithm** — AI matching dựa trên lifestyle & personality
- [ ] **Verified Profiles** — Xác minh CCCD/CMND (→ role Verified User)
- [ ] **Mobile App iOS & Android** — Push notifications, offline mode, smart filters
- [ ] **Landlord Dashboard** — Thống kê & quản lý cho chủ nhà

### Q3 2026 — Dự kiến
- [ ] **Community Events** — Meetup, networking events offline
- [ ] **Premium Features** — Verified badges, priority support, advanced filters
- [ ] **Ambassador Program** — Chương trình đại sứ cộng đồng
- [ ] **Video Tours 360°** — Upload video phòng, VR-ready

### Backlog — Ý tưởng
- [ ] **Payment Integration** — Thanh toán tiền thuê qua app
- [ ] **Review System** — Đánh giá roommate/landlord sau khi ở
- [ ] **Map Integration** — Bản đồ hiển thị listings theo vị trí
- [ ] **Notification System** — Email/push khi có tin mới phù hợp
- [ ] **Saved Searches** — Lưu bộ lọc tìm kiếm yêu thích
- [ ] **Comparison Tool** — So sánh nhiều phòng cùng lúc
- [ ] **Contract Templates** — Mẫu hợp đồng thuê nhà tích hợp
- [ ] **Roommate Compatibility Quiz** — Bài quiz tính cách để matching

---

## 📌 Implementation Notes

### Thêm role mới — Checklist
Khi implement role mới, cần sửa các file sau:

1. **`app/contexts/AuthContext.tsx`**
   - Thêm role vào type `UserRole`
   - Cập nhật logic check role trong `onAuthStateChanged`
   - Export helper: `canModerate`, `canManage`, `isVerified`, etc.

2. **`app/api/auth/promote/`**
   - Thêm logic assign role mới
   - Thêm env variable cho email lists nếu cần

3. **`app/data/users.ts`**
   - Cập nhật `role` field type
   - Thêm functions: `assignRole()`, `removeRole()`

4. **`app/components/MainHeader.tsx`**
   - Thêm header variant cho role mới (nếu cần)
   - Hoặc điều chỉnh nav items dựa trên permissions

5. **Route guards (các trang admin/restricted)**
   - Cập nhật permission checks
   - Ví dụ: `/admin/blog` cho phép Blogger truy cập

6. **`.env.local`**
   - Thêm biến: `MODERATOR_EMAILS`, `BLOGGER_EMAILS`, etc.

7. **UI Components**
   - Badge components cho từng role
   - Permission-based rendering (show/hide elements)

### Code Pattern đề xuất
```tsx
// AuthContext
type UserRole = "user" | "verified" | "landlord" | "blogger" | "ambassador" | "moderator" | "admin";

// Permission helpers
const canModerate = role === "moderator" || role === "admin";
const canManage = role === "admin";
const canWriteBlog = role === "blogger" || role === "admin";
const canPinCommunity = role === "ambassador" || role === "moderator" || role === "admin";
const isVerified = role !== "user"; // All roles above "user" are verified
const canBypassModeration = role === "landlord" || role === "admin";
```
