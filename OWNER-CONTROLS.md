# Owner website controls

The protected admin workspace controls the live archive and /vault/ library. Open the existing owner URL and choose the required navigation view.

- **Site control:** independently pause the whole learner site, catalog, video playback, downloads, enrollment requests, new registration or advertising. The owner workspace stays accessible. Edit the site label, announcement and temporary maintenance message. Changes are version checked, audited and retain prior setting revisions. An open learner page checks changes each minute; already shared direct host links cannot be recalled.
- **Course list:** add and edit courses; removing a course archives it without deleting hosted videos or lesson history. Publication updates the same private database used by learners.
- **Lessons and resources:** edit ordered lessons, YouTube/Dailymotion metadata, summary, notes, homework, document links and tools. Select the correct existing privacy state. Unlisted YouTube links can be played outside this website by anyone holding the link.
- **Main classes and resources:** edit original archive titles, topics, notes, class dates and a replacement YouTube video or document link. Existing Dailymotion parts remain. Only update dates and playback review states after verifying them.
- **Student permissions:** approve or revoke a specific registered learner's course. Registration or a pending request does not enroll a learner automatically.
- **Advertising:** maintain isolated banner placements separately for the archive and vault. Configuration now uses private Postgres instead of the exhausted Blob settings store. Global ad maintenance also removes loaded banners after the next status refresh.
- **Prices and payments:** prepare separate course and ad-free prices in BDT, USD, SAR, EUR or GBP. These are inactive draft prices. No gateway, checkout, charge or automatic paid entitlement is enabled. Merchant connection and verified payment callbacks are required before taking money.

Maintenance switches isolate a failing feature; they do not repair application code. The original Blob-based visitor analytics and private roster are separate legacy features; their availability must be checked independently. Existing public Git history and copied video-host links remain outside website access controls. Media upload/download backlogs are not completed by this control-panel release.

Verification:33 project checks,17 database-backed operation/content checks,13 public live checks and11 authenticated owner checks. Test-only course records were cleaned. Core course access still requires a server-validated session and explicit course grant. No security protection or repository visibility was weakened.
