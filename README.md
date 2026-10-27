# CyberNest

[Learning website](https://cybernest-learn.vercel.app/) · [Management Studio](https://cybernest-learn.vercel.app/studio)

Public application source for the CyberNest learning platform. Includes an English/Bengali course preview, shared accounts, explicit course approval, private resource delivery, course management, advertising controls and consent-based visitor analytics.

## Content and access

Course text, files, source-post snapshots and playable media metadata are managed in protected database storage, separately from public application source. Use Studio to edit courses; never commit course exports, notes, downloads, credentials or provider tokens. Registration does not grant course access. Payment collection is not connected.

## Validation

Run `npm ci --ignore-scripts`, `npm run build`, `npm test`. The build rejects private course exports and private/static credential artifacts. CI also scans Git history for credential patterns.

Removing course files from the current branch does not revoke historical Git copies or previously shared media URLs. Previously downloaded copies cannot be erased remotely. Host-level signed or restricted playback is a separate requirement for stronger paid-content protection. See SECURITY.md.

## Verified maintenance · 27 October 2026

Current application source excludes private course exports. Protected file delivery contains 69 preserved resources, including three course-scoped PDFs. Dashboard and detailed history share consented Postgres sessions; member management uses separate staff-only tables and versioned updates. The suspended legacy Blob data remains untouched.

Burp supplementary resource: eight of 27 ordered clips are verified, including the newly hosted private part 08 (13:55, 720p). Media links and member records are stored in the protected database rather than this public repository. Class 26 part 1 (22:31) remains available on Facebook but was not independently downloaded or hosted in this maintenance pass.
