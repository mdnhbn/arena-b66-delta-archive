# Website security review

Reviewed 2026-10-09. This is a scoped source and browser review of the archive and its new private administration routes, not a penetration-test certificate or a promise of complete security.

## Improvements

- Advertising scripts run on a separate origin containing only advertising files, inside sandboxed frames. They cannot read or modify the course page or its storage, navigate the top-level page, or use camera, microphone or location. Banner clicks may open a separate advertiser page. Advertisements load only after visitor expansion; the close control unloads them for the tab session.
- The course page loads only its own scripts. CSP restricts frames to saved documents and the two video providers; objects, forms and unexpected remote scripts are blocked. A restrictive browser feature policy and same-origin framing policy are configured. Existing HTTPS/HSTS and MIME-sniffing protection remain in place.
- Course text uses text nodes rather than HTML injection. Links reject executable schemes and credentials in URLs; external windows use `noopener noreferrer`. PDF previews accept only same-origin PDF files.
- The Vercel toolbar is disabled for both production and previews.
- Private administration uses the existing Vercel Authentication gate on preview URLs. The current team has one confirmed owner. Private data routes also reject production deployments server-side. Keep preview protection enabled and do not share bypass links or add unauthorized team members.
- Member snapshots and anonymous visit records use a private Blob store. No token, roster, IP address, contact details or Facebook identity is included in the public build. Admin responses use no-store and noindex; roster writes require a same-origin JSON request and a custom CSRF header. Public scripts use text nodes to render member names.
- The anonymous visit endpoint accepts only bounded JSON and known archive routes, deduplicates 30-minute sessions with signed Secure/HttpOnly/SameSite cookies, respects DNT/GPC, and caps pilot storage at approximately 1,000 sessions per UTC day. Counts are estimates of browsers and sessions, not identified students. Rate limiting is scoped to this endpoint at the platform level. Metrics begin when collection is enabled; previous traffic is not invented.
- A build allowlist publishes only intended course assets. Backend modules, dependency trees, configuration, private manifests and server environment variables are excluded from static output. Deployment source exposure and source maps are disabled. Browser-delivered frontend HTML, CSS and JavaScript remain inspectable by design.

## Validation

Tests cover malicious course titles/notes, invalid URL schemes, credential URLs, foreign PDF embeds, forged advertisement fallback messages, advertisement dismissal, and course/player rendering. Public textual resources were checked for common token/private-key patterns without logging their contents. No matching token/private-key pattern was found; pattern checks cannot prove the absence of every kind of secret.

## Remaining risks and owner actions

- Previously removed confidential information can remain in Git history or prior deployments. Rotate any still-active credentials that were previously exposed; deleting the current text alone does not revoke them.
- The production branch currently has no branch protection. Restrict force pushes and require reviewed changes and meaningful checks when the publishing workflow is configured. Protect GitHub, Vercel and video/ad accounts with two-factor authentication. Account security was not independently audited.
- Ad creatives and external downloads are controlled by third parties. The sandbox protects the archive; it cannot certify the safety of an advertiser's landing page or a downloaded executable. Keep software updated and use trusted official sources. Historic course packages are for isolated labs.
- Public and unlisted recordings/resources are accessible to anyone with the link. Public course content has no DRM. The private admin is a separate protected surface; visitors are not authenticated as students, and membership is an imported snapshot rather than automatic Facebook synchronization.
- Anonymous metrics can include bots, multiple browsers and missed privacy-restricted visits. Rate-limit counters are regional; the pilot cap can slightly exceed its target during simultaneous requests. This is not billing-grade analytics. Data is private; ongoing retention and administrator access should be reviewed as the site grows.

## References

- [MDN: iframe sandbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe)
- [MDN: CSP sandbox](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/sandbox)
- [MDN: frame ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)
- [Vercel toolbar controls](https://vercel.com/docs/vercel-toolbar/managing-toolbar)
