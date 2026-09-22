---
name: motion
description: >-
  Comprehensive guide and patterns for adding smooth, high-performance UI animations,
  scroll reveals, spring physics, and micro-interactions using the Motion (Framer Motion / Motion One) animation library.
---

# Motion Animation Skill

This skill provides guide lines, patterns, and code snippets for adding professional web animations using the **Motion** animation library (`motion` for Vanilla JS/HTML/CSS and React).

---

## 1. CDN Script Import (Vanilla HTML / JS)

To use Motion in vanilla web projects, include the CDN bundle in your HTML file:

```html
<script src="https://cdn.jsdelivr.net/npm/motion@latest/dist/motion.js"></script>
```

---

## 2. Core Animation Snippets

### Basic Animation & Springs
```javascript
const { animate, spring } = Motion;

// Animate element with smooth spring physics
animate(
  "#hero h1",
  { opacity: [0, 1], y: [30, 0] },
  { duration: 0.8, easing: spring({ stiffness: 100, damping: 15 }) }
);
```

### Scroll-Reveals (`inView`)
```javascript
const { inView, animate } = Motion;

// Reveal sections smooth as they scroll into viewport
inView("section", ({ target }) => {
  animate(
    target,
    { opacity: [0, 1], y: [40, 0] },
    { duration: 0.6, easing: "ease-out" }
  );
});
```

### Interactive Hover & Click Effects
```javascript
const { animate } = Motion;

document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("pointerenter", () => {
    animate(button, { scale: 1.04 }, { duration: 0.2 });
  });
  
  button.addEventListener("pointerleave", () => {
    animate(button, { scale: 1 }, { duration: 0.2 });
  });
});
```

---

## 3. High Performance Best Practices
- **Properties to Animate**: Stick to GPU-accelerated properties (`transform`, `opacity`, `filter`). Avoid animating layout properties (`height`, `top`, `margin`).
- **Easing**: Use natural spring physics or custom bezier curves (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Reduced Motion**: Always respect user accessibility preferences (`prefers-reduced-motion`).
