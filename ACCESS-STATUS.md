# Learning access checkpoint — 2026-10-26

- Main site and /vault/ share one central Better Auth account/session.
- Anonymous and registered-but-unenrolled learners receive only previews, without video URLs, complete notes or downloadable files.
- Owner approves/revokes a specific course in the existing protected admin panel’s enrollment section; registration/pending requests never grant access.
- Runtime role cannot write course grants or read payment records. Owner control is limited to the protected admin environment and trusted origin.
- Full data and documents/notes/tools are excluded from static output. Protected downloads are delivered only after server checks.
- Live checks:15 auth/access cases,6 owner-control cases,15 final endpoint/storage checks;29 project tests pass and dependency audit is clear.
- Browser review checked light/dark catalog, one account entry, anonymous lesson gates, registration without automatic grants, and390px mobile layout. Player uses the existing CSP-approved YouTube privacy-enhanced origin.
- Payment collection and automatic email verification/password recovery are not enabled. Owner must verify applicants before approval.
- Previously public Git history and shared Unlisted video links remain outside this website gate; this is not DRM or a guarantee that copied links become private.
- Continue from the latest checkpoint; test and push each completed batch, deploy and verify before the next batch.
