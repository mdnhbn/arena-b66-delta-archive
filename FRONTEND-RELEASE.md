# CyberNest frontend release

Owner authorized publishing the prepared frontends and shorter addresses.

- CyberNest: https://cybernest-learn.vercel.app
- Original addresses continue to work. Existing access and admin restrictions remain in force.
- Larger category cards, search, saved items, local resume/completion and light/dark appearance.
- All courses are labelled paid; student sign-in, registration and checkout are clearly labelled UI previews. No passwords, accounts, payments, new entitlements or production database connection are activated.
- Course records, videos, notes and tools remain unchanged.
- Security: exact origin allowlists, production admin denial, existing strict CSP and private API no-store policies retained. Patched undici 6.29.1 and pinned zod 4.6.6 through a same-major override; npm audit reports zero known vulnerabilities. Schema compatibility tests pass.
- Build, project tests and cross-site DOM interactions pass. Visual browser review is still pending because browser control is disabled.

Workflow: test each complete small batch, push it immediately, let Vercel publish it, verify live responses, then begin the next batch. Do not begin student identity or payment stages without the owner’s next instruction.
