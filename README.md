# WC2026 Collector - Germany Edition

<p align="center">
  <img src="./wc26-ball-premium.png" width="112" alt="WC26 Collector premium football" />
</p>

A static web application for managing the **Panini FIFA World Cup 2026 - Germany Edition** album: collected stickers, duplicates, missing stickers, completion progress, and PDF exports, with private Supabase synchronization.

[Live application](https://danilomonge.github.io/WC2026-Album-Tracker/) | [Report a bug](https://github.com/danilomonge/WC2026-Album-Tracker/issues/new/choose) | [Contribute](CONTRIBUTING.md) | [Security](SECURITY.md)

## Project Status

- Implemented catalog: **992 stickers** from the Germany edition.
- Frontend: static SPA using HTML, CSS, and JavaScript ES modules.
- Persistence: Supabase Auth and Postgres with Row Level Security (RLS).
- Providers enabled in the hosted instance as verified on May 28, 2026: **email/password**. Google OAuth is implemented as an optional provider and is only shown if enabled in Supabase.
- Deployment: GitHub Pages from `main` and `/ (root)`.
- Code license: [MIT](LICENSE).

This project is not affiliated with, sponsored by, or endorsed by Panini or FIFA. All names and trademarks belong to their respective owners.

## Implemented Features

- Read-only browsing without an account.
- Email/password sign-up, sign-in, and sign-out.
- Password recovery from Supabase emails, including `token_hash` links and implicit-flow links.
- Conditional Google OAuth: the button remains hidden when Supabase reports that Google is disabled.
- Marking stickers, recording duplicates, and correcting entries with remote synchronization.
- Search, type filters, grouping by group/team/page, and missing, duplicate, special, Coca-Cola, and statistics views.
- Full Spanish and English application interface.
- PDF export for missing and duplicate lists using `jsPDF`.
- Immediate first render and progressive collection rendering for the complete catalog.
- Precompiled Tailwind CSS; the published application does not depend on the Tailwind CDN runtime.

## Catalog

| Category | IDs | Count |
| --- | --- | ---: |
| National teams (48 x 20) | `MEX1`-`PAN20`, depending on team | 960 |
| FWC specials | `FWC0`-`FWC19` | 20 |
| Coca-Cola Germany | `CC1`-`CC12` | 12 |
| **Total** |  | **992** |

- FWC specials are placed on pages 0-3 and 106-109.
- Coca-Cola Germany stickers are placed on pages 112-113.
- Each national team includes a badge, a team photo, and 18 players.

## Usage

### Without An Account

You can browse, search, filter, and inspect the catalog. Progress saving and personalized PDF exports require authentication.

### With An Account

1. Open the application through HTTPS or a local HTTP server. Authentication is unavailable when opening `index.html` through `file://`.
2. Sign in or create an account with email/password.
3. Select a sticker: the first click marks it as collected; subsequent clicks add duplicates.
4. Use the correction button to remove duplicates or return a sticker to the missing state.
5. Progress is synchronized through Supabase and restored after reload.

### Password Recovery

1. In the account modal, select **Forgot your password?**
2. Enter the email address; Supabase sends a recovery link.
3. Open the link in the published application or in a local URL authorized in Supabase.
4. The application detects the recovery session and requests the new password and its confirmation.

The current interface validates a minimum of 6 characters. Production-oriented forks should configure a stronger Supabase password policy and align the UI minimum accordingly.

## Architecture

```text
index.html
  -> tailwind.css + styles.css
  -> app.js
       -> data.js (static catalog)
       -> @supabase/supabase-js@2.50.0 (esm.sh)
       -> jspdf@4.2.1 (esm.sh, loaded only for export)
       -> Supabase Auth + public.user_sticker_progress
```

### Applied Security Controls

- A Content Security Policy in `index.html` limits scripts, connections, images, forms, and objects.
- The frontend embeds only a public Supabase publishable key; no `service_role` or secret key is used.
- RLS isolates each user's progress through `auth.uid()`.
- The database rejects sticker IDs outside the catalog.
- The database restricts `duplicates` to `0..99` and requires `obtained = true` when duplicates exist.
- Catalog-derived values are escaped before insertion into HTML templates.
- GitHub Actions dependencies are pinned to immutable revisions.

Hosted-instance audit note, May 28, 2026: Supabase Security Advisor reports that **Leaked Password Protection** is disabled. This is an Auth setting controlled by the deployment owner and should be enabled when the selected plan supports it. See [SECURITY.md](SECURITY.md).

## Local Development

Requirements: Node.js 20 or later and npm.

```bash
git clone https://github.com/danilomonge/WC2026-Album-Tracker.git
cd WC2026-Album-Tracker
npm ci
npm run build:css
npm test
node serve.mjs
```

Open [http://localhost:5500](http://localhost:5500).

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run build:css` | Compiles `tailwind.input.css` into `tailwind.css`. |
| `npm test` | Runs the 22 unit and asset-contract tests with `node:test`. |
| `node serve.mjs` | Serves the SPA locally on port 5500. |

When Tailwind classes in `index.html` or `app.js` change, include the regenerated `tailwind.css` in the commit.

## Configuring A Fork With Supabase

The published instance uses an existing Supabase project. To deploy your own fork:

1. Create a Supabase project.
2. Run [supabase/schema.sql](supabase/schema.sql) in the SQL Editor.
3. Enable Email under **Authentication > Providers**.
4. Configure redirect URLs:

```text
http://localhost:5500
http://127.0.0.1:5500
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

5. Replace `DEFAULT_SUPABASE_CONFIG.url` and `DEFAULT_SUPABASE_CONFIG.anonKey` in `app.js` with your Project URL and **publishable key**.
6. To use Google OAuth, enable Google in Supabase and configure its OAuth client. The UI displays the button automatically only when the provider is enabled.

### Deployed Schema

The application uses exactly one public table:

| Table | Purpose | Protection |
| --- | --- | --- |
| `public.user_sticker_progress` | Per-user sticker state | RLS; PK `(user_id, sticker_id)`; FK to `auth.users`; sticker-ID and duplicate constraints |

It does not use a `profiles` table, triggers, or RPC functions.

The four policies allow `SELECT`, `INSERT`, `UPDATE`, and `DELETE` exclusively when `(select auth.uid()) = user_id`. The reproducible SQL is in [supabase/schema.sql](supabase/schema.sql).

### Production Recommendations

- Enable email confirmation.
- Enable leaked-password protection and strengthen password requirements if the selected plan supports it.
- Consider CAPTCHA for registration, sign-in, and password reset when exposing the project to open traffic.
- Configure custom SMTP for delivery reliability and email reputation.
- Review Security Advisor and Performance Advisor regularly.

Official references:

- [Supabase: Securing your API](https://supabase.com/docs/guides/api/securing-your-api)
- [Supabase: Password security](https://supabase.com/docs/guides/auth/password-security)
- [Supabase: CAPTCHA protection](https://supabase.com/docs/guides/auth/auth-captcha)

## Deployment

GitHub Pages publishes the static contents of `main` from `/ (root)`. The required files are:

```text
index.html
app.js
data.js
styles.css
tailwind.css
wc26-ball-premium.png
favicon-32x32.png
favicon.ico
apple-touch-icon.png
github-social-preview.png
.nojekyll
```

When a change reaches `main`, GitHub Pages rebuilds the site. The CI workflow verifies tests and confirms that generated CSS is committed; it does not manage deployment.

The repository brand uses `wc26-ball-premium.png`. GitHub does not provide a separate profile avatar for individual repositories. `github-social-preview.png` is the prepared repository social-preview card and can be set from **Settings > General > Social preview**.

## Repository Structure

| Path | Description |
| --- | --- |
| `index.html` | SPA shell, authentication modal, and CSP. |
| `app.js` | State, UI, i18n, authentication, synchronization, statistics, and PDF export. |
| `data.js` | Fixed catalog of 992 stickers and album metadata. |
| `tailwind.input.css`, `tailwind.config.cjs`, `tailwind.css` | Tailwind source and compiled output. |
| `styles.css` | Custom component and visual styles. |
| `serve.mjs` | Minimal local server with path-traversal protection. |
| `tests/app.test.js`, `tests/favicon.test.js` | 22 tests covering catalog behavior, security/auth recovery helpers, and branding assets. |
| `supabase/schema.sql` | Required schema and RLS for new deployments. |
| `.github/workflows/ci.yml` | Automated checks for contributions. |
| `CONTRIBUTING.md` | Contribution workflow and acceptance criteria. |
| `SECURITY.md` | Responsible disclosure and recommended hardening. |

## Contributing

Bug reports and pull requests are welcome. Before contributing, read:

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [SECURITY.md](SECURITY.md) for vulnerabilities, which must not be filed as public issues.

## License And Trademarks

The code in this repository is released under the [MIT License](LICENSE).

Panini, FIFA, FIFA World Cup, and Coca-Cola are trademarks of their respective owners. This project is an independent collector tool and does not distribute official sticker images.
