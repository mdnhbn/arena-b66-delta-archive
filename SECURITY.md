# Security maintenance

Production credentials belong in Vercel server-only environment variables. Never put passwords, database URLs, write tokens, OAuth secrets or private keys in source, browser assets, course resources or advertising tags. Public provider identifiers and advertising zone IDs are not account credentials.

`npm run build` copies an explicit list of frontend files and checks the output for private paths and credential patterns, including exact sensitive environment values available to the build. Unknown private files and source maps fail the build. The required **Archive checks** workflow also scans Git history with a checksum-pinned Gitleaks release and redacts findings. A reviewed historical public ad zone has an exact, documented exception. No real credential is excepted.

Owner and delegated staff permissions are checked on the server for each request. Course-scoped editors must pass the scope check on both reads and writes. Course signup and enrollment requests do not grant course access. Production runtime credentials are not supplied to preview or development deployments. The isolated advertising project receives no learning account credentials.

If a real credential is exposed, revoke or rotate it at its provider, update the server configuration, redeploy and review relevant provider access logs. Removing a file or deleting a Git commit does not invalidate a credential. Do not post secrets, passwords or student details in public issues.

Browser HTML, CSS and JavaScript are visible to visitors. Access control protects private responses; it does not hide browser code or revoke previously shared third-party video URLs. This is not a guarantee against every vulnerability.
