# Frontend learning-library preview

Requested direction: a readable course catalog inspired by the user's DeepLearning.AI screenshot, while retaining Delta's green cybersecurity identity. Frontend changes only. Existing admin pages, controls, server permissions, course source data, video IDs, notes, documents, tools and schedules are unchanged.

Included: larger category cover cards built with CSS (no copied instructor photos), left search/filter controls, saved courses/classes, resume links, manually marked lesson completion, browser-local progress, light/dark appearance, responsive grids, keyboard focus and reduced-motion support.

All courses display Paid course, following the user's final clarification. No course has been selected as free. No prices, currency, free trial or automatic free access are invented.

Enrollment options demonstrate the earlier requirement: course payment and a separate optional ad-free purchase, selected together. This preview does not accept payments or unlock content. Sign in/Register controls show an explicitly identified account-preview dialog; they do not collect credentials or create student accounts. Live identity, student permissions and checkout require later authorized steps. A later admin change may configure free courses; this release does not edit the admin panel.

Bookmarks, resume and completion store only course/lesson IDs and a short title in this browser. They are convenience state, never proof of payment or permission, and do not sync across devices yet. Existing Vercel protection remains unchanged.

Validation: normal project checks plus isolated DOM interaction tests for both complete frontend bundles. Visual pixel/layout verification through the connected browser was unavailable because local browser control was disabled. Publish to protected preview branches for owner review; keep production unchanged.

Reference behavior was checked against the official account/progress help pages; the full public courses page returned403, so no claim is made to have examined the reference's signed-in product:
https://info.deeplearning.ai/knowledge-base/will-i-lose-my-certificates-or-progress-if-i-go-back-to-free
https://info.deeplearning.ai/knowledge-base/how-can-i-edit-my-deeplearning.ai-profile
