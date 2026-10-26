# CyberNest

[Learning website](https://cybernest-learn.vercel.app/) · [Management Studio](https://cybernest-learn.vercel.app/studio)

Public application source for the CyberNest learning platform. Includes an English/Bengali course preview, shared accounts, explicit course approval, private resource delivery, course management, advertising controls and consent-based visitor analytics.

## Content and access

Course text, files, source-post snapshots and playable media metadata are managed in protected database storage, separately from public application source. Use Studio to edit courses; never commit course exports, notes, downloads, credentials or provider tokens. Registration does not grant course access. Payment collection is not connected.

## Validation

Run `npm ci --ignore-scripts`, `npm run build`, `npm test`. The build rejects private course exports and private/static credential artifacts. CI also scans Git history for credential patterns.

Removing course files from the current branch does not revoke historical Git copies or previously shared media URLs. Previously downloaded copies cannot be erased remotely. Host-level signed or restricted playback is a separate requirement for stronger paid-content protection. See SECURITY.md.
