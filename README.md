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

Burp supplementary resource: twelve of 27 ordered clips are verified, including the newly hosted private part 12 (13:03, 720p). Hosted and enrolled in-site playback were checked before removing its verified local upload copy; the original archive remains retained. Media links and member records are stored in the protected database rather than this public repository. Class 26 part 1 (22:31) remains available on Facebook but was not independently downloaded or hosted in this maintenance pass.

Four older Arena training uploads that remained publicly listed on the video host were changed to private visibility and checked again. These uploads were not linked by the current archive; unrelated channel content was unchanged. Private links can still be watched by their holders, so private visibility is not account-bound video authorization.

An encrypted course-content and roster backup was verified through temporary typed-table restoration. Its private offsite copy was downloaded and checked byte-for-byte, including 69 preserved resource files. See [RECOVERY.md](RECOVERY.md) for the scope, limits and recovery procedure; automatic scheduling and complete account/payment recovery remain pending.

Lesson navigation retains compact readable rows beside the player while the main catalog keeps its cards. Date-named archive classes support the same browser-local completion and resume controls as older numbered entries.
