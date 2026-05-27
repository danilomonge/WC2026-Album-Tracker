# WC26 Brand Mark Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the rejected flat emblem with a realistic, symmetrical futuristic WC26 match ball shared by the favicon and application header.

**Architecture:** A transparent `wc26-ball-premium.png` is the visual source of truth, generated as a clean premium match-ball render with a central `26`. HTML references it in the header, while compatible PNG and ICO favicon assets are derived from the same master; existing CSS preserves layout measurements.

**Tech Stack:** Static HTML/CSS, PNG/ICO assets, ImageMagick, Node.js built-in test runner, Playwright CLI.

---

### Task 1: Lock The Brand Asset Contract

**Files:**
- Modify: `tests/favicon.test.js`

- [x] **Step 1: Write failing tests for the new source asset**

Update assertions to require a versioned PNG favicon, the premium ball in
`.logo-home__ball`, and the removal of the rejected `wc26-mark.svg`.

- [x] **Step 2: Run the focused test to verify failure**

Run: `node --test tests/favicon.test.js`

Expected: FAIL because `index.html` still references `wc26-mark.svg` and does
not expose `wc26-ball-premium.png`.

### Task 2: Implement The Futuristic Mark

**Files:**
- Create: `wc26-ball-premium.png`
- Modify: `index.html`
- Delete: `wc26-mark.svg`
- Modify: `favicon-32x32.png`
- Modify: `favicon.ico`
- Modify: `apple-touch-icon.png`

- [x] **Step 1: Create the premium PNG source of truth**

Produce a symmetric pearl-white and deep-blue tournament football with
realistic stitching, minimal cyan panel accents and a large centered `26`.

- [x] **Step 2: Integrate the premium PNG**

Change the header image source to `./wc26-ball-premium.png`, remove the
rejected SVG favicon link and increment fallback asset cache versions.

- [x] **Step 3: Render fallback images**

Run:

```bash
magick wc26-ball-premium.png -resize 32x32 -strip favicon-32x32.png
magick wc26-ball-premium.png -resize 180x180 -strip apple-touch-icon.png
magick /tmp/wc26-icon-16.png /tmp/wc26-icon-32.png /tmp/wc26-icon-48.png favicon.ico
```

- [x] **Step 4: Run focused tests to verify green**

Run: `node --test tests/favicon.test.js`

Expected: PASS.

### Task 3: Document And Verify Publication

**Files:**
- Modify: `README.md`

- [x] **Step 1: Align published asset documentation**

Replace the rejected SVG entry with `wc26-ball-premium.png`, retaining the
fallback file list and documenting `github-social-preview.png`.

- [x] **Step 2: Run full verification**

Run:

```bash
npm run build:css
npm test
git diff --check
```

Expected: build succeeds, all tests pass, and whitespace validation reports no
issues.

- [x] **Step 3: Perform pre-publication visual checks**

Render the page at mobile and desktop sizes using Playwright before
publication, confirming icon dimensions remain `22x22` and `30x30`. Repeat
the same validation against GitHub Pages after deployment.
