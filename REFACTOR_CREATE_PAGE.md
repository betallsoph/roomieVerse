# Refactor Plan: Trang Đăng Tin Tìm Bạn (Create Page)

## 🎨 Design Philosophy

Dựa trên design language của trang listing và detail, trang create sẽ được refactor với những nguyên tắc:

### 1. **Visual Hierarchy & Spacing**
- Hero section với gradient blur transition (như listing page)
- Card spacing: `space-y-8` cho main containers
- Consistent padding: `p-6` cho cards
- Shadow system: `shadow-[var(--shadow-secondary)]`

### 2. **Color Theme**
```css
Primary (Roommate): blue-600, blue-50 backgrounds
Accent: blue-300 cho active states
Success: green-600
Warning: yellow-50, pink-500 cho validation
```

### 3. **Typography Scale**
- Page title: `text-3xl font-extrabold sm:text-4xl md:text-5xl`
- Section headings: `text-xl font-bold`
- Labels: `text-sm font-bold text-blue-600`
- Body: `text-base text-zinc-700`

---

## 🔄 Key Changes

### A. Hero Section Enhancement

**BEFORE:**
```tsx
<section className="py-12 bg-blue-50">
  <div className="mx-auto max-w-7xl px-6">
    <h1 className="text-3xl font-bold">...</h1>
  </div>
</section>
```

**AFTER:**
```tsx
<section className="py-12 sm:py-16 bg-blue-50 relative">
  <div className="mx-auto max-w-7xl px-6">
    {/* Breadcrumb */}
    <div className="mb-6 flex items-center gap-2 text-sm text-zinc-600">
      <Link href="/" className="hover:text-black">Trang chủ</Link>
      <span>/</span>
      <Link href="/roommate" className="hover:text-black">Tìm Roommate</Link>
      <span>/</span>
      <span className="text-black font-medium">Đăng tin</span>
    </div>

    <h1 className="text-3xl font-extrabold mb-3 sm:text-4xl md:text-5xl">
      {isHaveRoom ? "Đăng tin tìm người ở ghép cùng" : "Đăng tin tìm bạn cùng thuê"}
    </h1>
    
    <p className="text-base text-zinc-600 mb-2">
      {isHaveRoom
        ? "Bạn có phòng/căn hộ sẵn và muốn tìm người ở ghép"
        : "Bạn muốn tìm bạn trước, rồi cùng nhau đi thuê phòng"}
    </p>

    {/* Type Badge */}
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black bg-blue-300 font-bold text-sm">
      <Sparkles className="w-4 h-4" />
      {isHaveRoom ? "Có phòng sẵn" : "Tìm bạn cùng thuê"}
    </div>
  </div>
  
  {/* Blur gradient transition */}
  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white" />
</section>
```

### B. Visual Progress Indicator (Metro Style)

Thay đổi từ horizontal bar thành vertical metro-style timeline:

```tsx
{/* Sidebar Progress - Metro Style */}
<div className="lg:sticky lg:top-24 space-y-6">
  {/* Progress Timeline */}
  <div className="card bg-white">
    <div className="relative">
      {/* Progress Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-zinc-200" />
      <div 
        className="absolute left-6 top-0 w-0.5 bg-blue-600 transition-all duration-500"
        style={{ height: `${progressPercentage}%` }}
      />
      
      {/* Steps */}
      <div className="space-y-8 relative">
        {/* Step 1 */}
        <div className="flex items-start gap-4">
          <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
            currentStep === 1 
              ? 'border-blue-600 bg-blue-50 scale-110 shadow-lg' 
              : progressPercentage > 33 
                ? 'border-blue-600 bg-blue-600' 
                : 'border-zinc-200 bg-white'
          }`}>
            {progressPercentage > 33 ? (
              <Check className="w-5 h-5 text-white" />
            ) : (
              <span className="text-lg font-bold">1</span>
            )}
          </div>
          <div>
            <p className="font-bold text-sm">Thông tin cơ bản</p>
            <p className="text-xs text-zinc-500">Tiêu đề & Địa chỉ</p>
          </div>
        </div>
        
        {/* Step 2 - only for have-room */}
        {isHaveRoom && (
          <div className="flex items-start gap-4">
            <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
              currentStep === 2 
                ? 'border-blue-600 bg-blue-50 scale-110' 
                : progressPercentage > 66 
                  ? 'border-blue-600 bg-blue-600' 
                  : 'border-zinc-200 bg-white'
            }`}>
              {progressPercentage > 66 ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <span className="text-lg font-bold">2</span>
              )}
            </div>
            <div>
              <p className="font-bold text-sm">Chi tiết & Tiện nghi</p>
              <p className="text-xs text-zinc-500">Hình ảnh & Mô tả</p>
            </div>
          </div>
        )}
        
        {/* Step 3 */}
        <div className="flex items-start gap-4">
          <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
            currentStep === 3 ? 'border-blue-600 bg-blue-50 scale-110' : 'border-zinc-200 bg-white'
          }`}>
            <span className="text-lg font-bold">{isHaveRoom ? '3' : '2'}</span>
          </div>
          <div>
            <p className="font-bold text-sm">Mong muốn</p>
            <p className="text-xs text-zinc-500">Về bạn ở cùng</p>
          </div>
        </div>
        
        {/* Step 4 */}
        <div className="flex items-start gap-4">
          <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 border-zinc-200 bg-white">
            <span className="text-lg font-bold">{isHaveRoom ? '4' : '3'}</span>
          </div>
          <div className="opacity-50">
            <p className="font-bold text-sm">Hoàn tất</p>
            <p className="text-xs text-zinc-500">Đăng tin</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  {/* Tips Card */}
  <div className="card bg-yellow-50">
    <div className="flex items-center gap-2 mb-3">
      <Lightbulb className="w-5 h-5 text-yellow-600" />
      <h3 className="font-bold">Mẹo để được duyệt nhanh</h3>
    </div>
    <ul className="space-y-2 text-sm text-zinc-700">
      <li className="flex items-start gap-2">
        <span className="text-blue-600">•</span>
        <span>Viết tiêu đề rõ ràng, đầy đủ thông tin</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-blue-600">•</span>
        <span>Mô tả chi tiết về phòng và yêu cầu</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-blue-600">•</span>
        <span>Đăng giá hợp lý với thị trường</span>
      </li>
    </ul>
  </div>
</div>
```

### C. Form Cards Enhancement

**Tags/Pills cho Property Type:**

```tsx
<div className="space-y-2">
  <label className="block text-sm font-bold text-blue-600">
    Loại hình hiện tại
  </label>
  <div className="flex flex-wrap gap-3">
    {[
      { value: "apartment", label: "Chung cư", icon: "🏢" },
      { value: "room", label: "Trọ", icon: "🏠" },
      { value: "service-apartment", label: "Căn hộ DV", icon: "🏨" },
      { value: "house", label: "Nhà riêng", icon: "🏘️" },
    ].map((option) => (
      <motion.label
        key={option.value}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={`
          flex items-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer
          transition-all duration-200
          ${propertyTypes.includes(option.value)
            ? 'border-blue-600 bg-blue-50 shadow-md'
            : 'border-black bg-white hover:bg-zinc-50 hover:border-blue-400'}
        `}
      >
        <input
          type="radio"
          name="propertyType"
          value={option.value}
          checked={propertyTypes.includes(option.value)}
          onChange={(e) => setPropertyTypes([e.target.value])}
          className="sr-only"
        />
        <span className="text-xl">{option.icon}</span>
        <span className="text-sm font-medium">{option.label}</span>
        {propertyTypes.includes(option.value) && (
          <Check className="w-4 h-4 text-blue-600 ml-auto" />
        )}
      </motion.label>
    ))}
  </div>
</div>
```

### D. Image Upload Enhancement

```tsx
<div className="space-y-3">
  <label className="block text-sm font-bold mb-2 text-blue-600 flex items-center gap-2">
    <Camera className="w-5 h-5" />
    Hình ảnh phòng/nhà
    <span className="text-xs font-normal text-zinc-500">(Tối đa 5 ảnh)</span>
  </label>
  
  {/* Image Grid */}
  {images.length > 0 && (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <AnimatePresence>
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative group aspect-square"
          >
            <img
              src={img}
              alt={`Preview ${idx + 1}`}
              className="w-full h-full object-cover rounded-xl border-2 border-black"
            />
            <button
              type="button"
              onClick={() => setImages(images.filter((_, i) => i !== idx))}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border-2 border-black shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
            {/* Image number badge */}
            <div className="absolute bottom-2 left-2 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold border-2 border-white">
              {idx + 1}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )}
  
  {/* Upload Button */}
  {images.length < 5 && (
    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-blue-400 rounded-xl cursor-pointer bg-blue-50/50 hover:bg-blue-50 transition-all group">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Plus className="w-6 h-6 text-blue-600" />
        </div>
        <p className="text-sm font-bold text-blue-600">
          Thêm hình ảnh ({images.length}/5)
        </p>
        <p className="text-xs text-zinc-500">
          PNG, JPG tối đa 10MB
        </p>
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </label>
  )}
  
  {showImagesValidation && images.length === 0 && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 text-sm text-pink-600 bg-pink-50 border-2 border-pink-300 rounded-lg p-3"
    >
      <AlertTriangle className="w-4 h-4" />
      <span>Vui lòng tải lên ít nhất 1 hình ảnh</span>
    </motion.div>
  )}
</div>
```

### E. Amenities Selection Enhancement

```tsx
<div className="space-y-3">
  <label className="block text-sm font-bold text-blue-600">
    Tiện nghi
  </label>
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {[
      { value: 'ac', label: 'Điều hòa', icon: '❄️' },
      { value: 'wifi', label: 'Wifi', icon: '📶' },
      { value: 'washing', label: 'Máy giặt', icon: '🧺' },
      { value: 'fridge', label: 'Tủ lạnh', icon: '🧊' },
      { value: 'kitchen', label: 'Bếp', icon: '🍳' },
      { value: 'parking', label: 'Chỗ đậu xe', icon: '🅿️' },
      { value: 'elevator', label: 'Thang máy', icon: '🛗' },
      { value: 'security', label: 'Bảo vệ 24/7', icon: '🛡️' },
      { value: 'balcony', label: 'Ban công', icon: '🪴' },
      { value: 'furnished', label: 'Nội thất', icon: '🛋️' },
    ].map((amenity) => {
      const isSelected = amenities.includes(amenity.value);
      return (
        <motion.label
          key={amenity.value}
          whileTap={{ scale: 0.95 }}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg border-2 cursor-pointer
            transition-all duration-200
            ${isSelected
              ? 'border-blue-600 bg-blue-50 shadow-md'
              : 'border-black bg-white hover:bg-zinc-50 hover:border-blue-400'}
          `}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              if (e.target.checked) {
                setAmenities([...amenities, amenity.value]);
              } else {
                setAmenities(amenities.filter(a => a !== amenity.value));
              }
            }}
            className="sr-only"
          />
          <span className="text-xl">{amenity.icon}</span>
          <span className="text-sm font-medium flex-1">{amenity.label}</span>
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Check className="w-5 h-5 text-blue-600" />
            </motion.div>
          )}
        </motion.label>
      );
    })}
  </div>
</div>
```

### F. Navigation Buttons Enhancement

```tsx
{/* Navigation Buttons - Sticky on mobile */}
<div className="sticky bottom-0 left-0 right-0 bg-white border-t-2 border-black p-6 -mx-6 -mb-6 mt-8">
  <div className="flex gap-4">
    <button
      type="button"
      onClick={handleBack}
      className="btn-secondary flex-1 flex items-center justify-center gap-2"
    >
      <ArrowLeft className="w-4 h-4" />
      Quay lại
    </button>
    
    <button
      type="button"
      disabled={!canContinue}
      onClick={handleContinue}
      className={`flex-1 flex items-center justify-center gap-2 transition-all ${
        canContinue
          ? 'btn-primary'
          : 'bg-zinc-100 border-zinc-300 text-zinc-400 cursor-not-allowed'
      }`}
    >
      <span>Tiếp tục</span>
      <ArrowRight className="w-4 h-4" />
    </button>
  </div>
  
  {/* Progress indicator */}
  <div className="mt-4 flex items-center justify-center gap-2">
    <span className="text-xs font-medium text-zinc-500">
      Bước {currentStep}/{totalSteps}
    </span>
    <div className="flex-1 max-w-xs h-1.5 bg-zinc-200 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-blue-600"
        initial={{ width: 0 }}
        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  </div>
</div>
```

---

## 🎯 Summary of Improvements

### Visual Enhancements
1. ✅ Metro-style vertical progress indicator
2. ✅ Breadcrumb navigation in hero
3. ✅ Gradient blur transitions
4. ✅ Badge for post type
5. ✅ Icon-enhanced form elements
6. ✅ Animated image grid with badges
7. ✅ Enhanced amenity selection with emoji icons
8. ✅ Sticky navigation footer with mini progress bar

### UX Improvements
1. ✅ Visual feedback on all interactions
2. ✅ Clearer error messaging with icons
3. ✅ Better empty states
4. ✅ Loading states for async operations
5. ✅ Micro-animations on selections
6. ✅ Improved keyboard navigation
7. ✅ Better mobile responsiveness

### Code Quality
1. ✅ Consistent spacing system
2. ✅ Reusable motion components
3. ✅ Better component organization
4. ✅ Typed props and states
5. ✅ Accessibility improvements (sr-only, ARIA labels)

---

## 📦 Dependencies

Make sure these are installed:
```bash
npm install framer-motion lucide-react
```

## 🚀 Next Steps

1. Implement changes incrementally
2. Test on different screen sizes
3. A/B test with users
4. Gather feedback
5. Iterate based on data
