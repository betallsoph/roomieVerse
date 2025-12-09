# 🎨 Button Style Guide - Get Started & Watch Demo

## 🔵 Get Started Button

### Tailwind CSS
```html
<button class="inline-flex items-center justify-center gap-2 h-10 px-4 py-2 text-sm font-medium text-black bg-blue-300 border-2 border-black rounded-[6px] cursor-pointer transition-all duration-500 hover:bg-blue-400 disabled:opacity-50 disabled:pointer-events-none">
  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
  Get Started
</button>
```

### CSS Thuần
```css
.btn-get-started {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  background-color: #93c5fd;
  border: 2px solid #000000;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.5s ease;
  white-space: nowrap;
}

.btn-get-started:hover {
  background-color: #60a5fa;
}

.btn-get-started:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.btn-get-started svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
```

---

## ⚪ Watch Demo Button

### Tailwind CSS
```html
<button class="inline-flex items-center justify-center gap-2 h-10 px-4 py-2 text-sm font-medium text-blue-400 bg-white border-2 border-blue-400 rounded-[6px] cursor-pointer transition-all duration-500 hover:bg-blue-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="6 3 20 12 6 21 6 3"/>
  </svg>
  Watch Demo
</button>
```

### CSS Thuần
```css
.btn-watch-demo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #60a5fa;
  background-color: #ffffff;
  border: 2px solid #60a5fa;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.5s ease;
  white-space: nowrap;
}

.btn-watch-demo:hover {
  background-color: #60a5fa;
  color: #ffffff;
}

.btn-watch-demo:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-watch-demo svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
```

---

## 🎯 HTML Complete Example

```html
<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Outfit', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      background: #f0f9ff;
    }

    .btn-get-started {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 40px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      font-family: inherit;
      color: #000000;
      background-color: #93c5fd;
      border: 2px solid #000000;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.5s ease;
    }
    .btn-get-started:hover { background-color: #60a5fa; }
    .btn-get-started svg { width: 16px; height: 16px; }

    .btn-watch-demo {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 40px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      font-family: inherit;
      color: #60a5fa;
      background-color: #ffffff;
      border: 2px solid #60a5fa;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.5s ease;
    }
    .btn-watch-demo:hover { background-color: #60a5fa; color: #ffffff; }
    .btn-watch-demo svg { width: 16px; height: 16px; }
  </style>
</head>
<body>
  <button class="btn-get-started">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
    Get Started
  </button>

  <button class="btn-watch-demo">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="6 3 20 12 6 21 6 3"/>
    </svg>
    Watch Demo
  </button>
</body>
</html>
```

---

## 📐 Specs

| Property | Get Started | Watch Demo |
|----------|-------------|------------|
| Background | `#93c5fd` (blue-300) | `#ffffff` (white) |
| Background Hover | `#60a5fa` (blue-400) | `#60a5fa` (blue-400) |
| Text | `#000000` (black) | `#60a5fa` (blue-400) |
| Text Hover | `#000000` (black) | `#ffffff` (white) |
| Border | `2px solid #000000` | `2px solid #60a5fa` |
| Border Radius | `6px` | `6px` |
| Height | `40px` | `40px` |
| Padding | `8px 16px` | `8px 16px` |
| Font Size | `14px` | `14px` |
| Icon Size | `16px` | `16px` |
| Gap | `8px` | `8px` |
| Transition | `all 0.5s ease` | `all 0.5s ease` |
