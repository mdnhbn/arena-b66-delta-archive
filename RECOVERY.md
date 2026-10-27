# Private course-content recovery

`scripts/verify-course-backup.mjs` creates an authenticated AES-256-GCM snapshot outside the application source. It includes courses, lessons, resource metadata, protected file bytes, source snapshots, site controls and the staff member roster. Account credentials, sessions, orders, analytics history and video binaries are excluded. This is a content backup, not complete system disaster recovery.

## Create and verify

Use a trusted maintenance machine with a direct TLS-verified database connection. Supply these values privately through the environment; never put them in a command argument or commit them:

- `CYBERNEST_BACKUP_DATABASE_URL`: direct maintenance PostgreSQL URL with `sslmode=require`.
- `CYBERNEST_BACKUP_KEY`: random 32-byte key encoded as base64.
- `CYBERNEST_BACKUP_DIRECTORY`: absolute private directory outside this application.

Run `node scripts/verify-course-backup.mjs`. It reads a consistent database snapshot, checks each resource checksum, encrypts it, and reads the encrypted file back from disk. It then restores the decrypted records into temporary typed tables, compares every table's row count and hash, and rolls back those temporary tables. It never restores into production tables. The local verification receipt contains counts and hashes, not course text or file contents.

The current in-memory implementation limits resource bytes to 80 MiB and decrypted JSON to 256 MiB. Use a streaming database backup before exceeding those limits.

## Store and recover safely

Keep encrypted `.cnbackup` files in a private, owner-only recovery folder on another provider. Check permissions and compare the bytes of a downloaded copy with the local SHA-256 before treating offsite storage as verified. Keep recovery keys separately from the encrypted backups. An additional copy of the current key is stored as a Production Secret on the main project; no key is sent to browser code, preview deployments or the advertising project. Retain old keys when rotating, because a new key cannot open previous snapshots.

Use `openBackup` from `scripts/private-backup-format.mjs` on a trusted maintenance machine to authenticate and decrypt a downloaded copy. Recover first into an isolated database with the matching application schema. Review dependencies and permissions, compare files, and only then plan a production restore. The temporary-table test checks column types and content; it does not simulate a full environment outage or all relational constraints.

Verified on 27 October 2026: seven tables, 69 resource files, about 23 MB encrypted; downloaded offsite bytes matched and decrypted successfully. The original legacy Blob records remain retained because that store is suspended. Scheduled backups, automatic retention and a complete account/payment recovery drill remain pending. No backup or recovery key belongs in this public repository or static build.
