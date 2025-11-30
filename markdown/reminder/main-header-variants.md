# Main Header Variants Documentation

> **Purpose:** Document tách MainHeader thành 2 variants riêng biệt cho authenticated và non-authenticated users.
>
> **Created:** 2025-12-01
>
> **Status:** ✅ Completed - Cần review và customize thêm

---

## 📋 Overview

MainHeader được tách thành 2 components riêng biệt để dễ customize và maintain:

1. **MainHeaderGuest** - Cho users chưa đăng nhập
2. **MainHeaderAuth** - Cho users đã đăng nhập
3. **MainHeader** (original) - Vẫn giữ lại, auto-switch giữa 2 variants

---

## 🎨 Design Style

Tất cả headers follow **neobrutalism design system**:
- Sticky header với `backdrop-blur-md`
- Border đen 2px
- Background trắng
- Logo: HeaderLogo component (height 28)
- Buttons: btn-primary và btn-secondary classes

---

## 📁 Component Details

### 1. MainHeaderGuest

**File:** `app/components/MainHeaderGuest.tsx`

**Use case:** Users chưa đăng nhập (guest/visitor)

**Navigation items:**
- **"Bắt đầu"** (ONLY)
  - Class: `btn-primary`
  - Link: `/auth`
  - Responsive: Always visible
  - Note: Simplified - chỉ có 1 nút duy nhất

**Dependencies:**
- `HeaderLogo` component
- Next.js Link
- No auth context needed (static)

**Code structure:**
```tsx
"use client";
import Link from "next/link";
import HeaderLogo from "./HeaderLogo";

export default function MainHeaderGuest() {
  // Static component - no hooks, no auth logic
  // Just render logo + 2 navigation buttons
}
```

---

### 2. MainHeaderAuth

**File:** `app/components/MainHeaderAuth.tsx`

**Use case:** Users đã đăng nhập (authenticated)

**Navigation items:**
- **"Trang chủ"**
  - Type: Text link
  - Link: `/home`
  - Style: `text-zinc-600 hover:text-black`
  - Responsive: `hidden sm:block` (ẩn trên mobile)

- **"Hồ sơ"**
  - Type: Text link
  - Link: `/profile`
  - Style: `text-zinc-600 hover:text-black`
  - Responsive: `hidden sm:block` (ẩn trên mobile)

- **"Đăng xuất"**
  - Type: Button with onClick handler
  - Class: `btn-primary`
  - Action: Logout → redirect to `/auth`
  - Responsive: Always visible

**Dependencies:**
- `HeaderLogo` component
- `useAuth` hook from `../contexts/AuthContext`
- `useRouter` from Next.js
- Next.js Link

**Code structure:**
```tsx
"use client";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function MainHeaderAuth() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  // Render logo + 3 navigation items
}
```

---

### 3. MainHeader (Original)

**File:** `app/components/MainHeader.tsx`

**Use case:** Backward compatibility - tự động switch giữa 2 variants

**Logic:**
```tsx
const { isAuthenticated } = useAuth();

// If authenticated: render MainHeaderAuth content
// If not: render MainHeaderGuest content
```

**Status:** Vẫn giữ lại để:
- Backward compatibility với existing pages
- Auto-switching nếu không muốn control manually

**Recommendation:**
- Dùng explicit components (MainHeaderGuest/Auth) khi muốn kiểm soát rõ ràng
- Dùng MainHeader khi muốn auto-switch based on auth state

---

## 📄 Current Usage

**Pages đang dùng MainHeader (auto-switch):**

1. `app/page.tsx` - Landing page
2. `app/not-found.tsx` - 404 error page
3. `app/pages/login-required/page.tsx` - Login required page

**Potential updates:**
- Landing page có thể switch sang `MainHeaderGuest` (vì landing luôn là guest view)
- Login-required page nên dùng `MainHeaderGuest` (vì user chưa login)
- 404 page có thể giữ `MainHeader` (auto-switch là ok)

---

## 🔧 How to Use

### Option A: Use Auto-Switch (Current)
```tsx
import MainHeader from "./components/MainHeader";

export default function MyPage() {
  return (
    <div>
      <MainHeader />
      {/* Content */}
    </div>
  );
}
```

### Option B: Use Explicit Guest Header
```tsx
import MainHeaderGuest from "./components/MainHeaderGuest";

export default function LandingPage() {
  return (
    <div>
      <MainHeaderGuest />
      {/* Content */}
    </div>
  );
}
```

### Option C: Use Explicit Auth Header
```tsx
import MainHeaderAuth from "./components/MainHeaderAuth";

export default function DashboardPage() {
  return (
    <div>
      <MainHeaderAuth />
      {/* Content */}
    </div>
  );
}
```

---

## ✅ TODO - Customization Tasks

### High Priority
- [ ] **Review MainHeaderGuest navigation items**
  - Có cần thêm links khác không? (Blog, Về chúng tôi, etc.)
  - "Tìm phòng" có phải là best CTA không?
  - "Bắt đầu" có cần đổi text không? (VD: "Đăng nhập", "Đăng ký")

- [ ] **Review MainHeaderAuth navigation items**
  - Có cần thêm "Tin đăng của tôi" không?
  - Có cần "Thông báo" icon không?
  - Text links có cần icons không?

### Medium Priority
- [ ] **Mobile responsiveness**
  - Xem xét thêm hamburger menu cho mobile
  - Hiện tại mobile chỉ hiện button chính, có đủ không?

- [ ] **Replace MainHeader usage**
  - Quyết định pages nào nên dùng explicit components
  - Update imports nếu cần

### Low Priority
- [ ] **Styling improvements**
  - Add hover effects cho text links
  - Add active state cho current page
  - Consider adding dropdown menu cho user avatar

---

## 🎯 Design Decisions & Rationale

**Tại sao tách thành 2 components?**
1. **Easier to customize:** Mỗi variant có thể customize riêng mà không ảnh hưởng nhau
2. **Cleaner code:** Không cần if/else logic trong JSX
3. **Better performance:** Guest header không cần auth context/hooks
4. **Explicit control:** Developer biết rõ đang dùng header nào

**Tại sao vẫn giữ MainHeader?**
1. **Backward compatibility:** Không break existing pages
2. **Convenience:** Một số pages auto-switch là tiện hơn
3. **Migration path:** Có thể dần dần migrate sang explicit components

---

## 🚨 Important Notes

1. **Auth Context Dependency:**
   - `MainHeaderGuest`: NO auth context needed ✅
   - `MainHeaderAuth`: REQUIRES auth context ⚠️
   - `MainHeader`: REQUIRES auth context ⚠️

2. **Shared Dependencies:**
   - All 3 use `HeaderLogo` component
   - All 3 use same CSS classes (btn-primary, btn-secondary)
   - All 3 follow same layout structure

3. **Future Considerations:**
   - Nếu thêm features mới (notifications, messages), chỉ cần update `MainHeaderAuth`
   - Guest header có thể thêm promotional banner
   - Consider adding A/B testing cho CTAs

---

## 📞 Questions? Need Help?

If you're a new developer or AI assistant reading this:

1. **Want to change guest navigation?** → Edit `MainHeaderGuest.tsx`
2. **Want to change authenticated navigation?** → Edit `MainHeaderAuth.tsx`
3. **Want auto-switching behavior?** → Use `MainHeader.tsx`
4. **Not sure which to use?** → Check "Current Usage" section above

**Common customization requests:**
- Add blog link → Add to MainHeaderGuest
- Add notifications → Add to MainHeaderAuth
- Change button colors → Edit btn-primary/secondary in global CSS
- Add mobile menu → Need to update all 3 components

---

**Last updated:** 2025-12-01
