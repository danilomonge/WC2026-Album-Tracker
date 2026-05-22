# ⚽ WC2026 Collector — Germany Edition

> Track your **Panini FIFA World Cup 2026™** sticker album — Germany exclusive edition — in the browser, with cloud sync and PDF export.

**WC2026 Collector** is a static web app that lets you mark the stickers you have, track duplicates, monitor your progress by group and team, and export missing/duplicate lists as PDFs. No installation needed — just open it in a browser or visit the GitHub Pages URL.

---

## Table of Contents

1. [Which edition is this for?](#which-edition-is-this-for)
2. [Features](#features)
3. [Catalog structure](#catalog-structure)
4. [Functionality in detail](#functionality-in-detail)
5. [Without an account](#without-an-account)
6. [With an account — marking and sync](#with-an-account--marking-and-sync)
7. [Running locally](#running-locally)
8. [Deploying to GitHub Pages](#deploying-to-github-pages)
9. [Supabase setup](#supabase-setup)
10. [Project files](#project-files)
11. [Tests](#tests)

---

## Which edition is this for?

This tracker is built specifically for the **German edition of the Panini FIFA World Cup 2026™ album**.

The German edition differs from the international standard in one way: it includes **12 exclusive Coca-Cola Germany stickers** not found in the regular album. The app's catalog reflects this exactly:

| Category | Count |
|---|---|
| Teams (48 × 20 stickers) | 960 |
| FWC Specials | 20 |
| Coca-Cola Germany | 12 |
| **Total** | **992** |

> If you have the international edition (without the 12 Coca-Cola Germany stickers), just ignore that section — the rest of the album is identical.

---

## Features

- **Complete catalog** of all 992 stickers from the Germany edition
- **Interactive marking** — 1 click to collect, more clicks to add duplicates, `−` button to correct
- **Cloud sync** via Supabase — progress is saved and available on any device
- **Read-only mode** without an account — browse and search without signing up
- **Global search** — by player name, country, or sticker number
- **Type filters** — All, Collected, Duplicates, Missing, Specials, Coca-Cola, Shields, Team Photos, FWC
- **Flexible grouping** — by Group, Team, Page, or ungrouped
- **Secondary filters** — by group (A–L), team, and album page
- **Home view** — album progress summary, all 12 groups, tournament format, album structure
- **Detailed stats** — overview, progress by category, top teams, groups, priority missing, and more
- **PDF export** — missing list and duplicates list with username and generation date
- **Bilingual** — full UI in Spanish and English with a language toggle
- **Dark theme** — dark navy design with steel-blue accents, fully responsive
- **No custom backend** — 100% static SPA + Supabase as BaaS

---

## Catalog structure

### Teams

48 teams organized into 12 groups (A–L), 4 teams per group. Each team spans 2 album pages with 20 stickers:

- 1 shield
- 1 team photo
- 18 player stickers

### FWC Specials (pages 1–7 and 106–109)

20 tournament special stickers:

| ID | Description |
|---|---|
| FWC0 | Panini Logo |
| FWC1–FWC2 | Official Emblem |
| FWC3 | Official Mascots |
| FWC4 | Official Slogan |
| FWC5 | Official Ball |
| FWC6–FWC11 | Host nations (Canada, Mexico, USA ×3) |
| FWC12–FWC19 | Additional specials (FIFA Museums, Legends…) |

### Coca-Cola Germany (pages 106–109)

12 stickers exclusive to the German edition, identified as CC1–CC12.

---

## Functionality in detail

### Marking stickers

| Action | Result |
|---|---|
| 1st click | Sticker marked as **collected** |
| 2nd click | +1 **duplicate** |
| Further clicks | +1 duplicate each time |
| Click `−` | −1 duplicate; returns to **missing** when it reaches 0 |

### Search

The top search bar filters in real time by player or sticker name, team code (e.g. `MEX`, `ARG`), and sticker number (e.g. `42`, `FWC3`, `CC7`). Typing automatically navigates to the Album view and applies the filter.

### Type filters

Available in the chip bar below the header:

- **All** — every sticker visible in the current context
- **Collected** — only stickers you already have
- **Duplicates** — only stickers you have more than once
- **Missing** — stickers you don't have yet
- **Specials** — all special-type stickers (shields, team photos, FWC, Coca-Cola…)
- **Coca-Cola** — the 12 Germany exclusives
- **Shields** — team shields only
- **Team Photos** — team photos only
- **FWC** — all 20 tournament specials (FWC0–FWC19)

> In the **Duplicates** and **Missing** sections, the Collected/Duplicates/Missing chips are automatically hidden as they would be redundant.

### Grouping and secondary filters

- **Group by**: Group · Team · Page · Ungrouped
- **Group filter**: A through L, or all
- **Team filter**: specific country, or all
- **Page filter**: exact album page, or all

Each team header shows its album pages (e.g. `· Pg. 8, 9`).

### Main sections

| Section | Description |
|---|---|
| **Home** | Dashboard with album progress, 12-group summary, tournament format (stages, venues) and album structure |
| **Album** | All 992 stickers with full filters and grouping |
| **Duplicates** | Only stickers with at least 1 duplicate |
| **Missing** | Only stickers you don't have yet |
| **Specials** | Filtered view of all special stickers |
| **Coca-Cola** | The 12 Germany exclusive stickers |
| **Stats** | Full album statistics |

### Statistics

The Stats tab shows:

- **Overview** — % completed, collected / missing / duplicates / Coca-Cola counts, breakdown by category
- **Top teams by progress** — ranked list of countries with progress bars and scroll
- **Progress by group** — percentage progress for each group A–L
- **Priority missing** — teams with fewest stickers left (closest to completing)
- **Teams at 100%** — fully completed countries
- **Groups at 100%** — fully completed groups
- **Pending specials** — FWC stickers not yet collected
- **Pending Coca-Cola** — German exclusives not yet collected
- **Lagging teams** — countries with the least progress

### PDF export

From the sidebar (desktop):

- **Missing PDF** — list of all stickers you don't have, with ID, name and page
- **Duplicates PDF** — list of all stickers you have more than once, with count

Both PDFs include your username and the generation date.

### Language

The language toggle (🇪🇸 / 🇬🇧) in the sidebar switches the entire interface between **Spanish** and **English**, including labels, filters, messages and stats. The preference is saved between sessions.

---

## Without an account

Without signing up you can:

- Browse all groups, teams, pages and specials
- Use all filters and search
- View the Home dashboard and explore the album structure

You cannot: mark stickers, save progress, or export personalized PDFs.

---

## With an account — marking and sync

1. Click **Sign in / Register** in the sidebar.
2. Create an account with email and password, or sign in if you already have one.
3. Click stickers to mark them.
4. Progress is automatically saved to Supabase and synced across all your devices.
5. To reset the album, use the **Reset progress** button (requires confirmation).

> Login and sync require opening the app from `http://localhost` or an HTTPS URL (such as GitHub Pages). They do not work over `file://` due to browser security restrictions.

---

## Running locally

### Recommended — included Node server

```bash
node serve.mjs
```

Open `http://localhost:5500` in your browser.

### Alternative — Python

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

### Read-only — no server

Open `index.html` directly in the browser. Works in read-only mode (no login or sync).

---

## Deploying to GitHub Pages

1. Create a GitHub repository and upload: `index.html`, `styles.css`, `app.js`, `data.js` (and optionally `README.md`, `package.json`, `tests/`).
2. Go to **Settings → Pages**.
3. Under *Build and deployment*, choose `Deploy from a branch`.
4. Select `main` / `/ (root)` and save.
5. Your app will be available at:
   ```
   https://YOUR-USERNAME.github.io/YOUR-REPO/
   ```
6. Add that URL to the redirect URLs in your Supabase project.

---

## Supabase setup

The app has no custom backend. Progress is stored in **Supabase** with Row Level Security (each user can only see and edit their own data).

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a project.
2. Copy the **Project URL** and **anon/public key** from *Settings → API*.

### 2. Configure authentication

Under *Authentication → URL Configuration*, add your redirect URLs:

```
http://localhost:5500
http://localhost:8000
http://127.0.0.1:5500
https://YOUR-USERNAME.github.io/YOUR-REPO/
```

Enable *Email + Password* under *Authentication → Providers*.

### 3. Create tables and RLS policies

Run this SQL in the Supabase *SQL Editor*:

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.user_sticker_progress (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  sticker_id text not null,
  obtained boolean not null default false,
  duplicates integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_sticker_progress_duplicates_non_negative check (duplicates >= 0),
  constraint user_sticker_progress_valid_sticker_id check (
    sticker_id ~ '^(FWC([0-9]|1[0-9]|20)|CC([1-9]|1[0-2])|[A-Z]{3}([1-9]|1[0-9]|20))$'
  ),
  unique (user_id, sticker_id)
);

-- Trigger: create profile on sign-up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Trigger: update updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists touch_user_sticker_progress_updated_at on public.user_sticker_progress;
create trigger touch_user_sticker_progress_updated_at
before update on public.user_sticker_progress
for each row execute procedure public.touch_updated_at();

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.user_sticker_progress enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "progress_select_own" on public.user_sticker_progress for select using (auth.uid() = user_id);
create policy "progress_insert_own" on public.user_sticker_progress for insert with check (auth.uid() = user_id);
create policy "progress_update_own" on public.user_sticker_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "progress_delete_own" on public.user_sticker_progress for delete using (auth.uid() = user_id);
```

### 4. Connect the app

Supabase credentials are pre-configured in `app.js`. To use your own project, edit the `url` and `anonKey` constants in `DEFAULT_SUPABASE_CONFIG` at the top of `app.js`.

---

## Project files

| File | Description |
|---|---|
| `index.html` | SPA shell: HTML structure, nav, auth modal, toast |
| `app.js` | All logic: UI, Supabase auth, sync, filters, search, stats, PDF export, i18n |
| `styles.css` | Full visual design: dark navy theme, gradients, components (chips, cards, headers, stats), responsive |
| `data.js` | Frozen catalog of all 992 Germany-edition stickers: stickers, groups, teams, team colors, flag emojis |
| `serve.mjs` | Minimal Node.js dev server for `localhost:5500` |
| `tests/app.test.js` | Unit test suite for catalog integrity and business logic |
| `package.json` | Dev dependencies and `npm test` script |

---

## Tests

```bash
npm test
```

The suite covers:

- Catalog integrity (Germany edition, 992 total stickers, 12 Coca-Cola, 20 FWC)
- Correct page mapping per team
- Click logic: collect → duplicates → correction with `−`
- Remote progress merge with local state
- Filters: Coca-Cola, duplicates, missing, specials
- Global and per-category stats computation
