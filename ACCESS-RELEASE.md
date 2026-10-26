# Shared learning account and enrolled course access

The public catalog contains only course previews. Video URLs, full class notes and downloads require a valid server session and an explicit grant for that course. Registration and pending enrollment requests do not grant access.

The main site hosts both the archive and /vault/ behind one account. The owner approves or revokes requests through the protected admin panel’s new enrollment section. Existing admin tools remain.

Better Auth1.7.13 handles passwords and sessions; shared database-backed rate limits, no session cookie cache, exact trusted origin and no-store content responses. No payments or email-delivery service is enabled; account emails are not treated as verified identity.

Previously exposed Unlisted video links and public Git history cannot be revoked by a website gate. Strong host-level protection requires moving videos to a host with signed playback or domain restrictions. This release does not claim DRM.
