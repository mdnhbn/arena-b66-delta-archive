# Visitor history, staff and advertising

The owner workspace now has **Visitor history**, **Team and roles**, **Integrations**, and advanced controls inside **Advertising**. Staff use the same learner account to sign in at `/studio`; their verified role is checked on every management request. The original owner Vercel login remains independent and cannot be disabled by a delegated manager.

## Visitor history

First-party analytics asks for permission. With consent it stores browser sessions, page routes without search queries, approximate country and bounded visible/focused-tab time. Signed-in sessions are attributed to the current account; an anonymous session is not retroactively turned into a named browsing history. DNT/GPC disables collection. This data is retained in private Postgres and survives deployments. Duration is an estimate, not proof of video playback or attention. Historical duration before collection started is not invented. The old aggregate visitor charts remain separate.

Super Admin/Admin can review named and guest histories. Analysts and other permitted staff see aggregate metrics without visitor identities. IP-derived rate-limit keys are HMAC hashes; raw IP addresses are not stored in the activity tables. Authentication sessions are a separate framework feature.

## Roles

| Role | Permitted work |
| --- | --- |
| Original owner | All controls, including assignment/revocation of delegated Super Admins |
| Super Admin | Site management and lower staff roles; cannot change own role or assign another Super Admin |
| Admin | Course/content, learners, ads, site settings and draft pricing; no staff assignment |
| Course Manager | Catalog and course content |
| Editor | Lessons/archive content in explicitly assigned courses, or all courses when owner explicitly selects that scope |
| Marketer | Ads and aggregate analytics |
| Finance Manager | Draft course/ad-free prices and aggregate analytics |
| Analyst | Aggregate analytics only |

An unverified account cannot receive a management role. A verified same-email Google/GitHub account explicitly linked through the authentication framework also qualifies. No actual person was granted access during this implementation. Revocation applies on the next server request. Changes use request-scoped authenticated actor IDs in the audit history.

## Social login

Email/password remains available. Google/GitHub providers require owner-controlled OAuth apps and server secrets before their buttons activate. Google callback: `https://cybernest-learn.vercel.app/api/auth/callback/google`; GitHub callback: `https://cybernest-learn.vercel.app/api/auth/callback/github`. Only identity/profile/email scopes are requested, not repository or Drive access. Provider tokens are encrypted. Same-email accounts are not implicitly merged; a signed-in user can explicitly link the verified provider. Provider authentication has not been called successful merely because buttons exist.

## Advertising

Existing banners remain. Additional configurable kinds are iframe-compatible native, in-page, full-page/interstitial, direct/smart link, explicit-click OnClick link, and an HTTPS MP4/WebM ad. Each has its own initial delay, interval, session cap and interstitial display timeout. Interstitials remain closable and are skipped on course-player pages. Popups are never forced without a user click. Network names are admin metadata, not public captions.

Third-party creative code executes on the existing separate advertisement origin. It is not injected into the authenticated site's head. A network tag requiring parent-head access, Push/Service Worker, MultiTag or VAST/player integration needs its own reviewed adapter. The form does not claim every network SDK works unchanged in an iframe. Google/YouTube's own player advertisements are separate from this site's ads. Ad-free access checks read real database entitlements; no payment or ad-free purchase is activated by these controls.

New campaigns default off. No real additional network campaign or staff account was created as test data. Tests use owned synthetic creative and clean synthetic user/activity records.
