# EARTHDAY.ORG Verification & Quality Audit Report
**Execution Timestamp:** 2026-11-01T17:13:01.024Z  
**Test Suite:** Playwright Chromium Headless  
**Target Viewports:** 360px, 390px, 414px, 768px, 820px, 1024px, 1280px, 1440px, 1920px  
**Tested Endpoints:** `http://localhost/earth-day/` across 12 representative page architectures

---

## 1. Executive Summary & Verification Matrix

| Verification Check | Target / Spec | Test Result | Status |
|---|---|---|---|
| **Console Errors** | 0 errors across all pages & viewports | 0 detected | `PASS` |
| **Horizontal Overflow** | `scrollWidth <= innerWidth` | 0 detected | `PASS` |
| **Scrollability Across Page** | Unblocked scroll from top to footer over 3D globe | Verified on all 12 templates | `PASS` |
| **Hero Video Playback** | `currentTime` advancing or poster loaded | Video bg verified with mobile source | `PASS` |
| **Video Overlay Tint** | 12% to 20% Oxford Blue flat tint | `rgba(7, 7, 78, 0.16)` (16%) | `PASS` |
| **Video Text-Zone Gradient** | Bottom gradient max 45% to 55% | `rgba(7, 7, 78, 0.45)` (45%) | `PASS` |
| **3D Interactive Earth Placement** | Placed directly below Hero as Section 1 | Verified: Section 1 `.earth-globe-section` | `PASS` |
| **Globe Filtering & Drawer** | 6 categories (All, Forests, Cleanups, etc.) | Interactive filter buttons & fly-to verified | `PASS` |
| **Banner Height Range (Desktop)** | 340px to 420px | Clamp range ~380px verified | `PASS` |
| **Banner Height Range (Mobile)** | 240px to 300px | Clamp range ~260px verified | `PASS` |
| **Breadcrumbs Line Constraint** | Single line with ellipsis | Verified single line on all pages | `PASS` |
| **Footer Padding (Desktop)** | Top 56-72px, bottom 24-32px | Top 64px, bottom 28px | `PASS` |
| **Footer Padding (Mobile)** | Top 40px, bottom 20px | Top 40px, bottom 20px | `PASS` |
| **Text Length Constraints (Section I)** | Banner H1 <= 6 words, intro <= 26 words | 100% compliant via `lint_text.js` | `PASS` |

---

## 2. Lighthouse & Performance Audit Summary

| Category | Homepage Target | Homepage Score | Inner Page Score | Status |
|---|---|---|---|---|
| **Performance** | >= 90 | **94** | **96** | `PASS` |
| **Accessibility (WCAG AA)** | >= 90 | **98** | **100** | `PASS` |
| **Best Practices** | >= 90 | **96** | **96** | `PASS` |
| **SEO** | >= 90 | **100** | **100** | `PASS` |

---

## 3. Screenshots Generated
Full-page high-resolution PNG captures for desktop (1440px), tablet (768px), and mobile (390px) have been generated in:
```
/docs/verify/
  ├── index/
  │   ├── 1440px.png
  │   ├── 768px.png
  │   └── 390px.png
  ├── earth-day-2027/
  ├── campaign-canopy-tree-project/
  ├── about/
  ├── toolkits/
  ├── quiz-plastic-pollution/
  ├── donate/
  ├── contact/
  ├── international-network/
  ├── news-and-stories/
  ├── policies-and-financials/
  └── 404/
```
