# 🗺️ Routes — roomieVerse

> Danh sách tất cả các route trong ứng dụng.
> Cập nhật lần cuối: 15/02/2026

---

## 🏠 Public Pages

| Route | Mô tả | Auth? |
|---|---|:---:|
| `/` | Trang chủ (landing page) | ❌ |
| `/home` | Trang chủ (alternate) | ❌ |
| `/about` | Giới thiệu về roomieVerse | ❌ |
| `/whats-hot` | Có gì mới — tính năng sắp ra mắt | ❌ |
| `/auth` | Đăng nhập / Đăng ký (Google OAuth) | ❌ |

---

## 🔵 Roommate (Tìm bạn ở chung)

| Route | Mô tả | Auth? |
|---|---|:---:|
| `/roommate` | Feed tin đăng tìm bạn ở chung | ❌ |
| `/roommate/all` | Xem tất cả tin đăng roommate | ❌ |
| `/roommate/create` | Tạo tin đăng tìm bạn ở chung | ✅ |
| `/roommate/listing/[id]` | Chi tiết tin đăng roommate | ❌ |

---

## 🩷 Roomshare (Tìm phòng share)

| Route | Mô tả | Auth? |
|---|---|:---:|
| `/roomshare` | Feed tin đăng tìm phòng share | ❌ |
| `/roomshare/all` | Xem tất cả tin đăng roomshare | ❌ |
| `/roomshare/create` | Tạo tin đăng tìm phòng share | ✅ |
| `/roomshare/listing/[id]` | Chi tiết tin đăng roomshare | ❌ |

---

## ⚡ Short-term (Ngắn hạn)

| Route | Mô tả | Auth? |
|---|---|:---:|
| `/short-term` | Feed tin đăng ngắn hạn | ❌ |
| `/short-term/create` | Tạo tin đăng ngắn hạn | ✅ |
| `/short-term/listing/[id]` | Chi tiết tin đăng ngắn hạn | ❌ |

---

## 🔄 Sublease (Sang nhượng)

| Route | Mô tả | Auth? |
|---|---|:---:|
| `/sublease` | Feed tin đăng sang nhượng | ❌ |
| `/sublease/create` | Tạo tin đăng sang nhượng | ✅ |
| `/sublease/listing/[id]` | Chi tiết tin đăng sang nhượng | ❌ |

---

## 🌐 Community (Cộng đồng)

| Route | Mô tả | Auth? |
|---|---|:---:|
| `/community` | Feed bài viết cộng đồng | ❌ |
| `/community/create` | Tạo bài viết cộng đồng | ✅ |
| `/community/[id]` | Chi tiết bài viết cộng đồng | ❌ |

---

## 👤 User / Profile

| Route | Mô tả | Auth? |
|---|---|:---:|
| `/profile` | Hồ sơ cá nhân | ✅ |
| `/profile/lifestyle` | Chỉnh sửa lifestyle preferences | ✅ |
| `/favorites` | Tin đăng đã lưu / yêu thích | ✅ |
| `/user/[userId]` | Xem profile user khác | ❌ |
| `/listing/[id]` | Redirect chi tiết tin đăng (generic) | ❌ |

---

## 🛡️ Admin Pages (cần role Admin)

| Route | Mô tả | Role |
|---|---|:---:|
| `/admin` | Trang chính admin | Admin |
| `/admin/moderation` | Duyệt tin đăng (pending → active/rejected) | Admin, Mod |
| `/admin/community` | Duyệt bài đăng cộng đồng | Admin, Mod |
| `/admin/blog` | Tạo & quản lý bài blog | Admin |
| `/admin/management` | Quản lý users, thống kê | Admin |
| `/admin/maintenance` | Bảo trì, sao lưu hệ thống | Admin |

---

## 🔌 API Routes

| Route | Method | Mô tả |
|---|---|---|
| `/api/auth/promote` | POST | Check & promote user to admin (server-side email check) |
| `/api/upload` | POST | Upload ảnh lên Cloudflare R2 |
| `/api/seed` | GET/POST | Seed dữ liệu mẫu (dev only) |

---

## 🧪 Utility / Test Pages

| Route | Mô tả |
|---|---|
| `/pages/test-buttons` | Test tất cả button styles & UI components |
| `/pages/login-required` | Trang thông báo cần đăng nhập |
| `/pages/maintenance` | Trang thông báo bảo trì |
| `/pages/unauthorized` | Trang thông báo không có quyền truy cập |

---

## 📊 Tổng kết

| Loại | Số lượng |
|---|---|
| Public pages | 5 |
| Roommate routes | 4 |
| Roomshare routes | 4 |
| Short-term routes | 3 |
| Sublease routes | 3 |
| Community routes | 3 |
| User/Profile routes | 4 |
| Admin routes | 6 |
| API routes | 3 |
| Utility pages | 4 |
| **Tổng cộng** | **39** |
