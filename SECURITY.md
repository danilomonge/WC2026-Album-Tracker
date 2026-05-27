# Security Policy

## Supported Version

The `main` branch and the application deployed from it receive security fixes.

## Reporting A Vulnerability

Do not publish vulnerabilities in GitHub Issues.

Use GitHub private vulnerability reporting from the repository **Security** tab when available. If it is unavailable, contact the maintainer through a private channel associated with their GitHub profile and include:

- A description of the risk and impact.
- Minimal reproduction steps.
- Affected browser or environment.
- A proof of concept that does not disclose user data.
- A proposed fix, if available.

The maintainer will attempt to acknowledge receipt and coordinate responsible disclosure before public details are released.

## Security Model

- This is a public SPA; all JavaScript, catalog data, and the Supabase publishable key are visible to visitors.
- Data protection depends on RLS for `public.user_sticker_progress`, not on hiding the public key.
- `service_role` keys, JWT secrets, SMTP credentials, and OAuth client secrets must never be stored in this repository.
- The application only needs authenticated access to the current user's sticker progress.

## Implemented Controls

- RLS based on `auth.uid()` permits reading and modifying only the current user's rows.
- Postgres validates catalog IDs and duplicate ranges.
- A CSP reduces XSS and unexpected-connection surfaces.
- Template values are escaped before HTML insertion.
- Supabase SDK and PDF-generation imports are version-pinned.
- CI dependencies are pinned to immutable GitHub Actions SHAs.

## Recommended Deployment Hardening

- Enable leaked-password protection in Supabase Auth when the selected plan supports it.
- Set a minimum password length of 8 or more characters and align UI validation.
- Enable email confirmation, CAPTCHA, and custom SMTP for public installations.
- Limit redirect URLs to actual deployment origins.
- Review Supabase Security Advisor and Performance Advisor after schema changes.

## Hosted Instance Audit

Verified on May 28, 2026:

- `public.user_sticker_progress` is the only public application table and has RLS enabled.
- Its `SELECT`, `INSERT`, `UPDATE`, and `DELETE` policies restrict rows to `(select auth.uid()) = user_id`.
- An anonymous REST insert was rejected by RLS with HTTP `401`.
- Supabase Performance Advisor returned no notices.
- Supabase Security Advisor reports one remaining warning: **Leaked Password Protection Disabled**.
