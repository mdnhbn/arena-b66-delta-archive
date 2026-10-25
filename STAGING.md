# Step 1: isolated preview

Only this preparation step is authorized. Stop before storage, accounts, course permissions, payments, ad policy changes or production rollout.

Baseline: `70e6d2e7c85cfb9afbdbdedf3babe82d395b2855`.
Backup branch: `backup/pre-access-payments-2026-10-25`.
Test branch: `access-payments-preview`.

Keep existing Vercel Authentication enabled; do not create a public share/bypass link. The test build removes live advertising and visit collection scripts. Production/admin branches are unchanged. This test branch refuses a production build.

The Secret Course preview reads the private repository snapshot only, without production storage or the central bridge. Its write/ads/visit endpoints remain unavailable. This is not student authentication or course-level authorization.

Completion checks: build and tests pass; Vercel preview is READY at the expected SHA and project; anonymous root/data/API/document requests require Vercel login; current production and admin refs stay at their baselines.
