# UI Reminder - roomieVerse

## Design System

### Color Themes
| Section | Primary | Light BG | Accent | Text |
|---------|---------|----------|--------|------|
| **Roommate (Tìm bạn)** | `blue-600` | `blue-50` | `blue-100` | `text-blue-700` |
| **Roomshare (Tìm phòng)** | `pink-600` | `pink-50` | `pink-100` | `text-pink-700` |

### Card Styles
- **Standard card**: `rounded-xl border-2 border-black bg-white shadow-[var(--shadow-secondary)]`
- **Accent card**: Same + themed `bg-blue-50` or `bg-pink-50`
- **Warning card**: `rounded-xl border-2 border-black bg-red-50`
- **Ad placeholder**: `p-4 rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50`
- **Similar listing items**: Individual cards with shadow, NO outer wrapper card

### Typography
- **Page title**: `text-3xl font-extrabold sm:text-4xl md:text-5xl`
- **Section heading**: `text-xl font-bold`
- **Small label**: `text-sm font-bold text-zinc-500` or `text-xs font-bold text-zinc-500`
- **Data value**: `font-semibold text-blue-700` (roommate) / `text-pink-700` (roomshare)
- **Body text**: `text-base leading-relaxed text-zinc-700`

### Buttons
- **Primary**: `btn-primary` (dark, full-width)
- **Secondary**: `btn-secondary` (outline)
- **Pink**: `btn-pink` (for roomshare)
- **Interactive bounce**: `card-bounce` class on listing cards
- **Hover effect**: `hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none`

### Amenity/Preference Tags
- **Amenity**: `rounded-lg border-2 border-black bg-blue-100 px-3 py-1.5 text-sm font-medium`
- **Custom amenity**: Same but `bg-yellow-100`
- **Roomshare amenity**: `bg-pink-100` instead of blue

## Page Layouts

### Listing Detail Page (Have-Room / Roomshare)
```
┌─────────────────────────────────────────────────┐
│ Hero: Breadcrumb + Back + Date + Title          │
│ (blue-50 for roommate, pink-50 for roomshare)   │
├───────────────────────────┬─────────────────────┤
│ Image Gallery             │ Contact Card        │
│                           │ (no "Liên hệ ngay") │
│ Main Info Card:           │ - Author name       │
│ - Price Header (themed)   │ - Phone / Zalo      │
│ - Address Section         │ - FB / Instagram    │
│ - Room Info Grid          │ - Disclaimer        │
│ - Amenities               │ - View profile btn  │
│                           │                     │
│ Costs Card (with icons)   │ Lưu / Chia sẻ      │
│                           │                     │
│ Introduction Card         │ Ad Placeholder      │
│ - Về người đăng           │ ─────────────────── │
│ - Về người ở khác         │ Tin tương tự        │
│                           │ (flat, no wrapper)  │
│ Preferences Card          │                     │
│                           │                     │
│ Tips Card (red-50)        │                     │
└───────────────────────────┴─────────────────────┘
```

### Listing Detail Page (Find-Partner)
```
┌─────────────────────────────────────────────────┐
│ Hero: Same as above                             │
├───────────────────────────┬─────────────────────┤
│ Introduction Card         │ Profile Avatar      │
│ (description + lifestyle) │ + Name              │
│                           │                     │
│ "Mong muốn của mình"     │ Contact              │
│ - Budget / Location       │ (Phone, Zalo, etc.) │
│ - Property type / Time    │                     │
│                           │ Actions (Lưu...)    │
│ "Mong muốn bạn thuê"     │                     │
│ - Gender, schedule, etc.  │ Ad + Tin tương tự   │
│                           │                     │
│ Tips Card                 │                     │
└───────────────────────────┴─────────────────────┘
```

### Listing Card (List View - Find-Partner)
```
┌──────┬──────────────────────────────┬──┬──────────────────┐
│      │ Title                        │  │ Giới thiệu       │
│ 🔵   │ Địa điểm & thời gian        │  │ Content text      │
│Avatar│ 📍 Location (blue)           │| │ (font-medium,     │
│      │ 📅 Date (blue)               │  │  text-zinc-700)   │
│      │                    Ngân sách │  │                   │
│      │ 👤 Author · Date  X triệu   │  │                   │
│      │                    / tháng   │  │                   │
└──────┴──────────────────────────────┴──┴──────────────────┘
```

## Sidebar Rules
- **Sticky**: `lg:sticky lg:top-24 space-y-4`
- **Contact card**: No "Liên hệ ngay" title — just author name directly
- **Disabled social links**: `border-zinc-300 bg-zinc-100 text-zinc-400 cursor-not-allowed`
- **Divider between Ad & Similar Listings**: `pt-4 border-t border-zinc-200`

## Listing Sort
- Default sort: **Newest first** (based on `postedDate` parsing)
- Parse logic handles: "Hôm nay", "X giờ trước", "Hôm qua", "X ngày trước", "X tuần trước"

## Responsive
- **Mobile**: Single column, description column hidden (`hidden sm:flex`)
- **Desktop**: 2-column grid `lg:grid-cols-[1fr_380px]`
- **Card list view**: Vertical divider hidden on mobile (`hidden sm:block`)

## Key Do's & Don'ts
✅ Use themed colors consistently (blue = roommate, pink = roomshare)
✅ Each similar listing item gets its own shadow
✅ Prices use `font-bold text-blue-700` or `text-pink-700`
✅ Address data split into city/district/street/building fields

❌ Don't wrap "Tin tương tự" in a large outer card
❌ Don't use "Liên hệ ngay" as contact card title
❌ Don't use plain price chips — use bold text directly
❌ Don't put location and move-in date on same line (for find-partner card)
