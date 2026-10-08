# Website security review

Reviewed 2026-10-09. This is a scoped source and browser review of the public static archive, not a penetration-test certificate or a promise of complete security.

## Improvements

- Advertising scripts run in opaque sandboxed frames. They cannot read or modify the course page or its storage, navigate the top-level page, or use camera, microphone or location. Banner clicks may open a separate advertiser page. The close control unloads the advertisement for the tab session.
- The course page loads only its own scripts. CSP restricts frames to saved documents and the two video providers; objects, forms and unexpected remote scripts are blocked. A restrictive browser feature policy and same-origin framing policy are configured. Existing HTTPS/HSTS and MIME-sniffing protection remain in place.
- Course text uses text nodes rather than HTML injection. Links reject executable schemes and credentials in URLs; external windows use `noopener noreferrer`. PDF previews accept only same-origin PDF files.
- The Vercel toolbar is disabled for both production and previews.

## Validation

Tests cover malicious course titles/notes, invalid URL schemes, credential URLs, foreign PDF embeds, forged advertisement fallback messages, advertisement dismissal, and course/player rendering. Public textual resources were checked for common token/private-key patterns without logging their contents. No matching token/private-key pattern was found; pattern checks cannot prove the absence of every kind of secret.

## Remaining risks and owner actions

- Previously removed confidential information can remain in Git history or prior deployments. Rotate any still-active credentials that were previously exposed; deleting the current text alone does not revoke them.
- The production branch currently has no branch protection. Restrict force pushes and require reviewed changes and meaningful checks when the publishing workflow is configured. Protect GitHub, Vercel and video/ad accounts with two-factor authentication. Account security was not independently audited.
- Ad creatives and external downloads are controlled by third parties. The sandbox protects the archive; it cannot certify the safety of an advertiser's landing page or a downloaded executable. Keep software updated and use trusted official sources. Historic course packages are for isolated labs.
- Public and unlisted recordings/resources are accessible to anyone with the link. This public archive does not provide authentication or DRM. No application backend, database or public write endpoint exists in this repository.

## References

- [MDN: iframe sandbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe)
- [MDN: CSP sandbox](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/sandbox)
- [MDN: frame ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)
- [Vercel toolbar controls](https://vercel.com/docs/vercel-toolbar/managing-toolbar)
