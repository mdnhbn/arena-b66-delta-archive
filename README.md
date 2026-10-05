# Delta Archive · Arena B66

[Public website](https://arena-b66-delta-archive.vercel.app/) · [Catalogue](CATALOG.md) · [Status](ARCHIVE.md)

A complete Bengali static learning website with a dashboard, ordered class curriculum, searchable resource library, tools, schedule, notices, individual class pages and a resource draft workspace. Main-branch commits deploy automatically to Vercel.

## Website-first phase

The website structure is ready. All 22 collected recording entries have dedicated video, notes, documents and tools sections. Missing resources display honest placeholders and can be added later. Existing collected content remains available. Course collection and chronology verification are incomplete.

148 collected posts, 22 dated recording posts (19 July–4 October 2026), 8 complete inline notes and 4 linked YouTube videos. Record numbers are archive serials, not official class numbers. Unknown post dates remain null. Regular schedule times are distinguished from actual class start times.

## Add resources

Open the site's **রিসোর্সের খসড়া** workspace. Choose a class and resource type, enter a YouTube link, note, document link or tool guide, then download the updated JSON. Review it and replace `data.json` in GitHub; Vercel will publish the commit. The public form creates local drafts only and does not write to GitHub or upload videos. Unsaved drafts are lost when the page is closed.

The workspace also creates new class placeholders. Unlisted YouTube videos can embed publicly; Private videos do not provide public playback. Verify identity, visibility and playback before publishing a video entry. Do not store account credentials, signed download URLs or access tokens in this repository.

## Run

Serve the repository root using any static HTTP server. The site has no build or runtime dependencies. It uses accessible hash routes, responsive CSS and browser DOM APIs. Older `#entry-...` links continue to work.

## Verification

JavaScript syntax and DOM flow checks cover the dashboard, all 22 ordered classes, search and reset, topic/month filters, notes, embedded video markup, empty slots, schedule, local draft JSON export, invalid link validation, legacy routes and navigation. Live visual verification is recorded separately in ARCHIVE.md.
