# WC26 Brand Mark Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the photographic soccer-ball asset with a clean futuristic match-ball emblem shared by the favicon and the application header.

**Architecture:** A single scalable `wc26-mark.svg` is the visual source of truth. HTML serves it directly to modern browsers and references it in the header; ImageMagick renders compatible PNG and ICO fallbacks from that same SVG while existing CSS preserves layout measurements.

**Tech Stack:** Static HTML/CSS, SVG, ImageMagick, Node.js built-in test runner, Playwright CLI.

---

### Task 1: Lock The Brand Asset Contract

**Files:**
- Modify: `tests/favicon.test.js`

- [x] **Step 1: Write failing tests for the new source asset**

Update assertions to require a versioned `wc26-mark.svg` favicon link, the
same SVG in `.logo-home__ball`, and the removal of `soccer-ball-logo.png`.

- [x] **Step 2: Run the focused test to verify failure**

Run: `node --test tests/favicon.test.js`

Expected: FAIL because `index.html` still references `soccer-ball-logo.png`
and does not expose `wc26-mark.svg`.

### Task 2: Implement The Futuristic Mark

**Files:**
- Create: `wc26-mark.svg`
- Modify: `index.html`
- Delete: `soccer-ball-logo.png`
- Modify: `favicon-32x32.png`
- Modify: `favicon.ico`
- Modify: `apple-touch-icon.png`

- [x] **Step 1: Create the SVG source of truth**

Draw a polished white-and-graphite football with readable panel geometry,
controlled cool shadows and a cyan orbital accent, limiting the design to
high-contrast shapes that remain distinguishable at `16px`.

- [x] **Step 2: Integrate the SVG**

Add a versioned SVG favicon link, change the header image source to
`./wc26-mark.svg`, and increment fallback asset cache versions.

- [x] **Step 3: Render fallback images**

Run:

```bash
Render `wc26-mark.svg` in Chromium on a transparent surface and derive:

```bash
magick /tmp/wc26-transparent-1024.png -resize 32x32 -strip favicon-32x32.png
magick /tmp/wc26-transparent-1024.png -resize 180x180 -strip apple-touch-icon.png
magick /tmp/wc26-icon-16.png /tmp/wc26-icon-32.png /tmp/wc26-icon-48.png favicon.ico
```

- [x] **Step 4: Run focused tests to verify green**

Run: `node --test tests/favicon.test.js`

Expected: PASS.

### Task 3: Document And Verify Publication

**Files:**
- Modify: `README.md`

- [x] **Step 1: Align published asset documentation**

Replace the photographic PNG source entry with `wc26-mark.svg`, retaining the
fallback file list.

- [ ] **Step 2: Run full verification**

Run:

```bash
npm run build:css
npm test
git diff --check
```

Expected: build succeeds, all tests pass, and whitespace validation reports no
issues.

- [ ] **Step 3: Perform visual checks and publish**

Render the public page at mobile and desktop sizes using Playwright after
deployment, confirming icon dimensions remain `22x22` and `30x30`.
