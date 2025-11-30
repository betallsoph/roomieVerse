# roomieVerse - Application Flow & Screen Documentation

## 📱 Tổng Quan Ứng Dụng

**roomieVerse** là một nền tảng kết nối roommate, giúp người dùng tìm kiếm và đăng tin tìm bạn ở ghép. Ứng dụng được xây dựng với Next.js, sử dụng Tailwind CSS và Framer Motion.

---

## 🗺️ Sơ Đồ Flow Tổng Thể

### Flow Người Dùng Chưa Đăng Nhập

```
┌─────────────────────────────────────────────────────────────┐
│                    LANDING PAGE (/)                          │
│  "Không chỉ là tìm phòng. Tìm người đồng hành."            │
│                                                              │
│  [Tìm phòng ngay]  [Đăng tin miễn phí]                     │
└──────────┬────────────────┬─────────────────┬───────────────┘
           │                │                 │
           v                v                 v
    ┌──────────┐     ┌───────────┐    ┌──────────┐
    │  SHARE   │     │   AUTH    │    │  ABOUT   │
    │  PAGE    │     │   PAGE    │    │  PAGE    │
    │(/share)  │     │  (/auth)  │    │ (/about) │
    └────┬─────┘     └─────┬─────┘    └────┬─────┘
         │                 │                │
         v                 v                │
    ┌──────────┐     ┌─────────┐           │
    │ LISTING  │     │  HOME   │◄──────────┘
    │ DETAIL   │     │  PAGE   │
    │(/listing │     │(/home)  │
    │  /[id])  │     └─────────┘
    └──────────┘
```

### Flow Người Dùng Đã Đăng Nhập

```
┌─────────────────────────────────────────────────────────────┐
│                    HOME PAGE (/home)                         │
│         "Chào mừng trở lại! Tìm roommate ngay thôi."        │
│                                                              │
│     [Xem tin đăng]  [Cập nhật hồ sơ]                       │
└──────────┬────────────────┬─────────────────┬───────────────┘
           │                │                 │
           v                v                 v
    ┌──────────┐     ┌───────────┐    ┌──────────┐
    │  SHARE   │     │  PROFILE  │    │ WELCOME  │
    │  PAGE    │     │   PAGE    │    │  TOUR    │
    │(/share)  │     │(/profile) │    │(/welcome)│
    └────┬─────┘     └─────┬─────┘    └──────────┘
         │                 │
         v                 │
    ┌──────────┐           │
    │ LISTING  │           │
    │ DETAIL   │           │
    │(/listing │◄──────────┘
    │  /[id])  │  (Xem chi tiết bài đăng)
    └──────────┘
```

---

## 📄 Chi Tiết Từng Màn Hình

### 1. 🏠 LANDING PAGE (`/`)

**Mục đích:** Trang chủ giới thiệu cho người dùng mới

**Trạng thái:** Public (chưa đăng nhập)

**Các phần chính:**

#### Header (Sticky)
- Logo roomieVerse với animation sparkles
- 2 buttons:
  - "Tìm phòng" → `/share`
  - "Bắt đầu" → `/auth`

#### Hero Section
- Tiêu đề chính: "Không chỉ là tìm phòng. **Tìm người đồng hành.**"
  - Chữ "Tìm người đồng hành" có sparkles animation
- Mô tả: "Thuật toán thông minh. Cộng đồng chất lượng. Miễn phí mãi mãi."
- 2 CTA buttons:
  - "Tìm phòng ngay" → `/share`
  - "Đăng tin miễn phí" → `/auth`

#### CTA Section (Blue Gradient Box)
- Tiêu đề: "SẴN SÀNG TÌM ROOMMATE?"
- Mô tả: "Đăng tin hoàn toàn miễn phí. Kết nối ngay hôm nay!"
- Button: "Bắt đầu ngay" → `/share`

#### Footer
- Logo trắng
- Links: Tìm phòng | Đăng ký | Trang chủ | Hồ sơ

**Tương tác:**
- Click vào bất kỳ CTA nào → chuyển đến trang tương ứng
- Logo có sparkle effect khi hover

---

### 2. 🔐 AUTH PAGE (`/auth`)

**Mục đích:** Đăng ký / Đăng nhập

**Trạng thái:** Public

**Layout:** 2 cột (Desktop), stacked (Mobile)

#### Left Card - Thông Tin
- Animated logo (xoay + sparkle khi hover)
- Text giới thiệu: "Nền tảng kết nối roommate đáng tin cậy. Không môi giới, không tin rác - chỉ có người thật tìm phòng thật."
- 2 buttons:
  - "Tìm hiểu thêm về roomieVerse" → `/about`
  - "Trang chủ" → `/`

#### Right Card - Auth Form
- Toggle mode: **Login** ↔ **Register**
- Form fields (thay đổi theo mode):
  - Email
  - Phone
  - Password
- Bounce animation khi chuyển mode
- Submit button

**Background:** InteractiveGrid component (grid squares sáng lên khi hover)

**Tương tác:**
- Toggle Login/Register
- Submit form → redirect to `/home`
- Click links → navigate

---

### 3. 🏡 HOME PAGE (`/home`)

**Mục đích:** Dashboard cho người đã đăng nhập

**Trạng thái:** Protected (logged in only)

**Các phần chính:**

#### Header (Sticky)
- Logo
- Navigation:
  - "Welcome tour" → `/welcome`
  - "Hồ sơ" → `/profile`
  - "Đăng xuất" → `/auth`

#### Hero Section
- Tiêu đề: "Chào mừng trở lại! **Tìm roommate ngay thôi.**"
  - Chữ "Tìm roommate ngay thôi" có sparkles
- Mô tả: "Khám phá những tin đăng mới nhất phù hợp với bạn."
- 2 buttons:
  - "Xem tin đăng" → `/share`
  - "Cập nhật hồ sơ" → `/profile`

#### CTA Section
- Giống Landing page
- "Sẵn sàng tìm roommate?"
- Button: "Bắt đầu ngay" → `/share`

#### Footer
- Giống các trang khác

**Đặc điểm:**
- Personalized cho user đã login
- Quick access đến các tính năng chính
- Design giống Landing nhưng có header navigation khác

---

### 4. 👋 WELCOME TOUR PAGE (`/welcome`)

**Mục đích:** Hướng dẫn onboarding cho người dùng mới

**Trạng thái:** Public

**Các phần chính:**

#### Header
- Logo + badge "WELCOME TOUR"
- Navigation:
  - "Landing" → `/`
  - "Trang chủ" → `/home`
  - "Đăng ký" → `/auth`

#### Hero Section (Gradient)
- Tiêu đề: "Chào mừng đến với"
- Animated logo với **22 sparkles** xung quanh
- Mô tả: "Tour hướng dẫn nhanh giúp bạn biết chính xác các bước cần hoàn thành..."
- 2 buttons:
  - "Bắt đầu ngay" → `/auth`
  - "Xem thử trang chủ" → `/home`

#### Hướng Dẫn 3 Bước

**Card 1: Đăng ký tài khoản**
- Icon: 👤
- Badge: "1 phút"
- Mô tả: "Tạo tài khoản miễn phí chỉ với email và số điện thoại."

**Card 2: Đăng bài tìm roommate**
- Icon: 📝
- Badge: "5 phút"
- Mô tả: "Điền thông tin phòng, giá, khu vực và ngày dọn vào mong muốn."

**Card 3: Nhận liên hệ**
- Icon: 📞
- Badge: "Ngay lập tức"
- Mô tả: "Người khác xem bài của bạn và gọi điện trực tiếp để trao đổi."

#### CTA Section (Pink Gradient)
- "Sẵn sàng tìm roommate?"
- "Đăng bài MIỄN PHÍ ngay hôm nay..."
- 2 buttons:
  - "Đăng bài ngay" → `/share`
  - "Xem bài đăng" → `/home`

**Đặc điểm:**
- Educational flow
- Step-by-step guide
- Nhiều animations (sparkles, bounces)
- Responsive 3-column grid

---

### 5. 📋 SHARE/LISTINGS PAGE (`/share`)

**Mục đích:** Xem danh sách phòng & đăng tin mới

**Trạng thái:** Public

**Các phần chính:**

#### Header (Blue Background)
- Logo
- Navigation:
  - "Trang chủ" → `/`
  - "Khám phá" → `/home`

#### Hero Section (Blue Gradient)
- Tiêu đề: "Tìm bạn Share phòng 🏠"
- Mô tả: "Đăng tin MIỄN PHÍ - Kết nối TRỰC TIẾP - Không môi giới!"
- Button: "Đăng tin ngay" → toggle form

#### Form Đăng Tin (Conditional)
Form xuất hiện khi click button "Đăng tin ngay"

**Form fields:**
- Tiêu đề (required)
- Giá thuê/tháng (required)
- Khu vực (required)
- Ngày dọn vào (required)
- Số điện thoại (required)
- Mô tả (required, textarea)

**Buttons:**
- "Đăng tin" (submit)
- "Hủy" (close form)

#### Danh Sách Phòng

**Header:**
- Label: "Cộng đồng"
- Tiêu đề: "Tin mới nhất"

**Grid Layout:** 3 cột (desktop), 1 cột (mobile)

**Mỗi Card Hiển Thị:**
- Hình ảnh placeholder (blue với icon 🏡)
- Badge giá (góc trên phải)
- Ngày đăng (góc trên phải)
- Tiêu đề bài đăng
- 📍 Địa điểm
- 📅 Ngày dọn vào
- Mô tả ngắn (2 dòng)
- ✍️ Tên người đăng
- Button "Gọi" → `tel:` link

**Mock Data (3 listings):**
1. "Tìm bạn nữ share căn 2PN ở Bình Thạnh" - 4.5 triệu
2. "Share studio Thảo Điền - cần 1 bạn nam" - 6 triệu
3. "Ghép căn 3PN ở Q1 - còn 1 slot" - 5.5 triệu

#### Secondary CTA (Blue Gradient)
- "Chưa tìm được phòng phù hợp?"
- "Đăng tin của bạn ngay - MIỄN PHÍ mãi mãi!"
- Button: "Đăng tin ngay" → scroll to top + show form

#### Footer (Dark)
- Links: Về chúng tôi | Điều khoản | Liên hệ

**Tương tác:**
- Click "Đăng tin ngay" → Show/hide form + scroll to top
- Fill form → Submit → Close form, reset fields
- Click card → Navigate to `/listing/[id]`
- Click "Gọi" → Trigger phone call

---

### 6. 👤 PROFILE PAGE (`/profile`)

**Mục đích:** Quản lý bài đăng của user

**Trạng thái:** Protected (logged in)

**Các phần chính:**

#### Header (Sticky)
- Giống Home page
- Logo + navigation

#### Profile Header Card
- Avatar: Circle màu blue với icon 👤
  - Hover: rotate + scale effect
- Thông tin user:
  - Tên: "Nguyễn Văn A"
  - Username: "@nguyenvana"
  - Member since: "Thành viên từ tháng 11/2024"
  - Phone: "📞 0901 234 567"
- CTA Button: "Đăng bài mới" → `/share`

#### Section Bài Đăng

**Header:**
- Tiêu đề: "Bài đăng của tôi"
- Badge: Số lượng bài (vd: "2 bài đăng")

**Listing Cards (Full-width):**
Mỗi card hiển thị:
- Tiêu đề + Status badge ("Đang hiển thị" - green)
- 📍 Địa điểm | 📅 Ngày dọn vào | ⏰ Đăng cách đây
- Badge giá (góc phải)
- Mô tả chi tiết
- 3 action buttons:
  - **"Chỉnh sửa"** (Primary blue button)
  - **"Tạm ẩn"** / **"Hiển thị"** (Secondary button)
  - **"Xóa"** (Red danger button)

**Mock Data (2 bài đăng):**
1. "Tìm bạn ở ghép loft Quận 3" - 11.5 triệu
2. "Cần người share căn studio Q.2" - 9 triệu

#### Empty State (Hiển thị khi không có bài đăng)
- Icon: 📝 (bounce animation)
- Text: "Chưa có bài đăng nào"
- Mô tả: "Bắt đầu đăng tin để tìm roommate phù hợp!"
- Button: "Đăng bài đầu tiên" → `/share`

#### Footer
- Giống các trang khác

**Tương tác:**
- Click "Đăng bài mới" → `/share`
- Click "Chỉnh sửa" → (Chưa implement backend)
- Click "Tạm ẩn"/"Hiển thị" → Toggle status (UI only)
- Click "Xóa" → Delete listing (UI only)

**Note:** Hiện tại chỉ là UI, chưa có backend logic cho CRUD operations

---

### 7. 📄 LISTING DETAIL PAGE (`/listing/[id]`)

**Mục đích:** Xem chi tiết một bài đăng

**Trạng thái:** Public

**Route động:** `/listing/[id]` (ví dụ: `/listing/1`)

**Layout:** 2 cột (Left content + Right sidebar sticky)

#### Header
- Logo
- "← Quay lại" → `/home`
- "Đăng bài mới" → `/share`

#### LEFT COLUMN

**Image Gallery:**
- Hình chính (384px height)
- Placeholder: Blue background + 🏠
- Space cho carousel (future feature)

**Title & Info Card:**
- Tiêu đề: "Tìm bạn ở ghép loft Quận 3"
- Badge giá (right): "11.5m / người" (blue)
- Metadata:
  - 📍 Quận 3, TP.HCM
  - 📅 Dọn vào: 15/12/2024
  - ⏰ Đăng 2 ngày trước

**Description Card:**
- Heading: "Mô tả chi tiết"
- Multi-paragraph description với:
  - Thông tin phòng (diện tích, số phòng, WC)
  - Nội thất
  - Vị trí
  - Yêu cầu roommate

**Amenities Card:**
- Heading: "Tiện nghi"
- Tags list:
  - ✓ Máy lạnh
  - ✓ Máy giặt
  - ✓ Tủ lạnh
  - ✓ Wifi
  - ✓ Bếp
  - ✓ Ban công

**Rules Card:**
- Heading: "Quy định"
- Bullet list:
  - Không hút thuốc trong nhà
  - Không nuôi thú cưng
  - Giữ vệ sinh chung

#### RIGHT COLUMN (Sticky Sidebar)

**Contact Card (Blue Gradient):**
- Label: "LIÊN HỆ"
- Poster name: "Minh Anh"
- Phone button: "📞 0901 234 567" → `tel:` link
- Message button: "💬 Nhắn tin" (disabled)
- Warning text: "⚠️ Lưu ý: Hãy cẩn thận với các giao dịch tiền mặt..."

**Share Card:**
- Heading: "Chia sẻ bài đăng"
- 2 buttons:
  - "Facebook" (secondary)
  - "Copy link" (secondary)

**Mock Data:**
- ID "1" hoặc "listing-1" → full detail object
- Nếu không tìm thấy → 404 error

**Tương tác:**
- Click "← Quay lại" → `/home`
- Click "Đăng bài mới" → `/share`
- Click phone button → Open phone dialer
- Click "Nhắn tin" → (Future feature)
- Click Facebook/Copy → (Future feature)

**Đặc điểm:**
- Sidebar sticky trên desktop
- Responsive layout (stack trên mobile)
- 404 handling cho listing không tồn tại

---

### 8. ℹ️ ABOUT PAGE (`/about`)

**Mục đích:** Giới thiệu về công ty, giá trị, sứ mệnh

**Trạng thái:** Public

**Các phần chính:**

#### Header
- Logo + navigation
- "Tìm phòng" → `/share`
- "Bắt đầu" → `/auth`

#### Hero Section
- Tiêu đề: "Về **roomieVerse**"
- Mô tả: Mission statement về việc tìm roommate phù hợp

#### Perks Section (Blue Background)
- Heading: "Quyền lợi khi tham gia"
- 3 cards:
  1. "Được curator kiểm hồ sơ trong 12h"
  2. "Được ghép nhóm chat riêng trước khi thăm nhà"
  3. "Tài liệu hướng dẫn chia chi phí minh bạch"

#### Why Choose Us Section
- Heading: "Tại sao chọn chúng tôi?"
- 6 feature cards với emoji:
  1. 🎯 "Match chính xác. Nhanh chóng."
  2. 💎 "Cộng đồng được chọn lọc."
  3. 🚀 "Đơn giản. Miễn phí."
  4. 🤝 "Kết nối trực tiếp"
  5. ✅ "Tin đăng thật"
  6. ⚡ "Nhanh chóng"

#### Values Section (Blue Background)
- Heading: "Giá trị cốt lõi"
- 2 cards:
  1. 💎 "Chất lượng"
  2. 🤝 "Kết nối thật"

#### Mission Section (Blue Gradient)
- Quote about mission
- "Giúp mọi người tìm được roommate phù hợp một cách dễ dàng, an toàn và minh bạch..."

#### Final CTA
- "Sẵn sàng tìm roommate?"
- 2 buttons:
  - "Đăng ký miễn phí" → `/auth`
  - "Xem tin đăng" → `/share`

#### Footer
- Links including `/about`

**Đặc điểm:**
- Information-heavy page
- Multiple sections với colored backgrounds
- Emoji-enhanced cards
- Responsive grid layouts

---

## 🔄 Navigation Map

### Global Navigation (Available từ mọi page)

```
Header Links:
├─ Logo → /home (if logged in) hoặc / (if logged out)
├─ Tìm phòng → /share
├─ Bắt đầu / Đăng ký → /auth
├─ Trang chủ → /home
├─ Welcome tour → /welcome
├─ Hồ sơ → /profile
└─ Đăng xuất → /auth

Footer Links:
├─ Tìm phòng → /share
├─ Đăng ký → /auth
├─ Trang chủ → /home
├─ Hồ sơ → /profile
└─ Về chúng tôi → /about
```

### Page-Specific Navigation

**Landing (`/`):**
- Tìm phòng ngay → `/share`
- Đăng tin miễn phí → `/auth`
- Bắt đầu ngay → `/share`

**Auth (`/auth`):**
- Tìm hiểu thêm → `/about`
- Trang chủ → `/`
- After login → `/home`

**Home (`/home`):**
- Xem tin đăng → `/share`
- Cập nhật hồ sơ → `/profile`
- Bắt đầu ngay → `/share`

**Welcome (`/welcome`):**
- Bắt đầu ngay → `/auth`
- Xem thử trang chủ → `/home`
- Đăng bài ngay → `/share`
- Xem bài đăng → `/home`

**Share (`/share`):**
- Click listing card → `/listing/[id]`
- Gọi button → `tel:` link

**Profile (`/profile`):**
- Đăng bài mới → `/share`
- Đăng bài đầu tiên → `/share`

**Listing Detail (`/listing/[id]`):**
- Quay lại → `/home`
- Đăng bài mới → `/share`
- Phone → `tel:` link

**About (`/about`):**
- Đăng ký miễn phí → `/auth`
- Xem tin đăng → `/share`

---

## 🎨 Design System Summary

### Components Chính
- **HeaderLogo**: Logo với sparkle animation
- **SparklesText**: Text với sparkles floating
- **AuthForm**: Form login/register với toggle
- **InteractiveGrid**: Background grid interactive
- **AnimatedLogo**: Logo với rotation + sparkles
- **Card**: Base card component với neobrutalism style

### Button Styles
- **btn-primary**: Blue-300, shadow, hover shift
- **btn-secondary**: White, shadow, hover shift
- **Danger**: Red-50 background, red text

### Color Palette
- Primary: Blue (blue-300, blue-400)
- Accent: Pink, Purple
- Base: White
- Border: Black (2px solid)
- Shadows: Hard black shadows

### Typography
- Font: Google Sans (400, 500, 700)
- Headings: Bold, responsive sizes
- Body: 14px, medium weight

---

## 📊 Data Structure

### Room Listing Object
```typescript
interface RoomListing {
  id: number | string
  title: string
  author: string
  price: string
  location: string
  moveInDate: string
  description: string
  phone: string
  postedDate: string
  image?: string
  fullDescription?: string
  amenities?: string[]
  rules?: string[]
}
```

### User Profile Data
```typescript
interface UserProfile {
  name: string
  username: string
  joinDate: string
  phone: string
  listings: RoomListing[]
}
```

---

## 🔧 Technical Notes

### Framework & Tools
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion 12
- **Language**: TypeScript 5+
- **UI Language**: Vietnamese

### Current Limitations
- **No backend**: Tất cả data là mock/hardcoded
- **No authentication**: Login chỉ redirect, không có real auth
- **No database**: Không lưu trữ data
- **No phone integration**: tel: links chỉ mở dialer
- **No messaging**: Message button disabled
- **No sharing**: Facebook/Copy link chưa implement

### Mock Data
- 3 sample listings trên Share page
- 2 user listings trên Profile page
- 1-2 listing details cho dynamic routes
- 1 mock user profile

---

## 🚀 User Journeys

### Journey 1: Tìm Phòng (Người Mới)
```
Landing (/)
  → Click "Tìm phòng ngay"
  → Share Page (/share)
  → Click listing card
  → Listing Detail (/listing/[id])
  → Click "📞 0901 234 567"
  → Phone call
```

### Journey 2: Đăng Tin (Người Mới)
```
Landing (/)
  → Click "Đăng tin miễn phí"
  → Auth Page (/auth)
  → Fill form & submit
  → Home Page (/home)
  → Click "Xem tin đăng"
  → Share Page (/share)
  → Click "Đăng tin ngay"
  → Fill form & submit
  → Success (listing added to feed)
```

### Journey 3: Quản Lý Bài Đăng (User Đã Login)
```
Home (/home)
  → Click "Cập nhật hồ sơ"
  → Profile Page (/profile)
  → View listings
  → Click "Chỉnh sửa" / "Tạm ẩn" / "Xóa"
  → (Future: Edit listing)
```

### Journey 4: Onboarding (User Mới)
```
Landing (/)
  → Click "Welcome tour" (from header)
  → Welcome Page (/welcome)
  → Read step-by-step guide
  → Click "Bắt đầu ngay"
  → Auth Page (/auth)
  → Sign up
  → Home Page (/home)
```

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl)

**Responsive Behaviors:**
- Navigation collapses to minimal on mobile
- Grid layouts stack (3 cols → 1 col)
- Text sizes scale down
- Sidebar becomes bottom section
- Images resize proportionally

---

## ✨ Key Features by Page

| Page | Sparkles | Forms | Listings | User Actions |
|------|----------|-------|----------|--------------|
| Landing | ✅ | ❌ | ❌ | Browse, Sign up |
| Auth | ✅ | ✅ | ❌ | Login, Register |
| Home | ✅ | ❌ | ❌ | Navigate |
| Welcome | ✅ | ❌ | ❌ | Learn, Sign up |
| Share | ❌ | ✅ | ✅ | Post, Browse, Call |
| Profile | ❌ | ❌ | ✅ | Manage posts |
| Listing Detail | ❌ | ❌ | ✅ (1) | View, Call |
| About | ❌ | ❌ | ❌ | Learn, Sign up |

---

## 🎯 Call-to-Action Hierarchy

### Primary CTAs (Xuất hiện nhiều nhất)
1. **"Đăng tin ngay"** → Share page (post listing)
2. **"Tìm phòng ngay"** → Share page (browse)
3. **"Bắt đầu ngay"** → Auth page (sign up)

### Secondary CTAs
1. **"Xem tin đăng"** → Share page
2. **"Cập nhật hồ sơ"** → Profile page
3. **"Gọi"** → Phone dialer

### Tertiary CTAs
1. **"Tìm hiểu thêm"** → About page
2. **"Welcome tour"** → Welcome page
3. **"Quay lại"** → Previous page

---

Tài liệu này mô tả toàn bộ flow và màn hình của ứng dụng roomieVerse. Mọi thông tin đều dựa trên codebase hiện tại (chưa có backend).
