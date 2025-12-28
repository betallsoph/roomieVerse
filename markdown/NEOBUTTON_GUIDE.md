# Neobrutalism Interaction Guide

This guide documents the design system and interaction models for the Telegram Mini App, focusing on "tactile" feel, instant responsiveness on mobile, and Neobrutalist aesthetics.

## 🎯 The Goal
To create a UI that feels "physical" and "heavy":
1.  **Instant Response**: Zero delay when tapping on mobile.
2.  **Tactile Feedback**: Even extremely quick taps (< 50ms) must show the element reacting.
3.  **Distinct Physics**: Buttons "sink" (translate), List Items "squeeze" (scale).
4.  **No "Sticky" Hover**: On mobile, elements shouldn't stay in the `:hover` state after tapping.

---

## 🎨 Global Design System

We use CSS variables to maintain consistency across the app.

### Shadows & Depth
We use hard, non-blurred shadows to create the Neobrutalist look.

| Variable | Value | Usage |
| :--- | :--- | :--- |
| **`--shadow-primary`** | `3px 3px 0px -1px #000000` | Main buttons, Cards. Bold and deep. |
| **`--shadow-secondary`** | `2px 2px 0px -1px #000000` | List items, secondary elements. Slightly subtler. |

---

## 🛠️ Component 1: NeoButton (The "Sink" Effect)

Buttons simulate a physical keypress by moving *down and right* exactly the distance of their shadow.

### Physics
*   **Action**: `translate(3px, 3px)`
*   **Shadow**: Disappears on press (simulating the button touching the surface).
*   **Timing**: 75ms minimum press duration.

### CSS Implementation
```css
button {
  box-shadow: var(--shadow-primary); /* 3px 3px */
  transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

button:active,
button.pressed {
  transform: translate(3px, 3px); /* Moves exactly into the shadow */
  box-shadow: none;
}
```

---

## 🛠️ Component 2: NeoListItem (The "Squeeze" Effect)

List items (Tasks) are larger surface areas. Sinking them feels too heavy. Instead, we "squeeze" them slightly, like pressing a foam pad.

### Physics
*   **Action**: `scale(0.97)`
*   **Shadow**: Remains visible but element shrinks.
*   **Timing**: 75ms minimum press duration.

### CSS Implementation
```css
.task-item {
  box-shadow: var(--shadow-secondary); /* 2px 2px */
  transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.task-item:active,
.task-item.pressed {
  transform: scale(0.97); /* Subtle shrink effect */
  background-color: var(--secondary); /* Visual feedback color */
}
```

---

## ⚡ The "Sweet Spot" Values

Through testing, we arrived at these specific values for the best mobile feel:

| Property | Value | Reason |
| :--- | :--- | :--- |
| **`minPressDuration`** | **75ms** | **50ms** was too fast (blink and miss). **100ms** felt laggy. **75ms** is snappy but visible. |
| **Transition Speed** | **0.1s** | **0.2s** felt floaty. **0.1s** gives a solid, mechanical bounce-back. |
| **Primary Shadow** | **3px 3px** | Bold enough to look 3D, but not cartoonishly large. |

## � Mobile Optimization Checklist

1.  **Viewport**: `user-scalable=no` to remove 300ms tap delay.
2.  **Touch Action**: `touch-action: manipulation` on all interactive elements.
3.  **No Hover**: `transform: none` inside `@media (hover: hover)` or simply ensuring `:hover` doesn't trigger movement logic that gets stuck on mobile.

