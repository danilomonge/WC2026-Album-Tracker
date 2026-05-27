# Contributing

Thank you for helping improve WC2026 Collector.

## Before You Start

- For reproducible bugs, open a bug report including browser, steps, and expected result.
- For substantial enhancements, open a proposal first so scope and user experience can be discussed.
- For vulnerabilities, do not create public issues: follow [SECURITY.md](SECURITY.md).
- Be respectful and follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Set Up The Environment

```bash
git clone https://github.com/danilomonge/WC2026-Album-Tracker.git
cd WC2026-Album-Tracker
npm ci
npm test
node serve.mjs
```

The local application is available at `http://localhost:5500`. To test authentication in a fork, configure your own Supabase project using [supabase/schema.sql](supabase/schema.sql) and update the public key in `app.js`.

## Workflow

1. Create a branch from `main`: `feature/description`, `fix/description`, or `docs/description`.
2. Keep the change small and focused.
3. Modify tests when logic changes.
4. If Tailwind utility use changes, run `npm run build:css` and commit `tailwind.css`.
5. Run every verification:

```bash
npm run build:css
npm test
git diff --check
```

6. Open a pull request describing the problem, solution, and verification.

## Contribution Areas

- Behavior or accessibility fixes.
- New tests for authentication, synchronization, and catalog behavior.
- Translations and copy clarity.
- Mobile rendering performance.
- Documentation and deployment usability.
- Security updates for dependencies loaded through ESM.

## Technical Rules

- Keep the application static and do not introduce server-side secrets in the frontend.
- A Supabase publishable key may be present in the client; never add `service_role`, JWT secrets, SMTP secrets, or OAuth credentials.
- Preserve RLS and the schema's integrity constraints.
- Do not accept sticker IDs outside the catalog in `data.js`.
- Use `textContent` or `escapeHtml()` when displaying data in templates.
- Do not weaken the CSP without justifying each new source or connection.
- Pin new runtime dependencies to versions and check known advisories.

## Catalog Changes

`data.js` represents the Germany edition: 992 stickers, including `FWC0`-`FWC19` and `CC1`-`CC12`. Any catalog change must:

- Cite the source for the change in the pull request.
- Update constraints in `supabase/schema.sql` if accepted IDs change.
- Update tests and documentation.

## Review Criteria

A pull request must preserve:

- Sign-in, password recovery, and reload without blocking.
- User-isolated synchronization.
- Read-only mode without an account.
- Functional PDF generation.
- A passing `npm test` run and a browser console without new errors.
