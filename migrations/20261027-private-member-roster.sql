-- Run once with the maintenance database role. Contains no member records.
BEGIN;
CREATE TABLE IF NOT EXISTS learning.member_rosters (
 key text PRIMARY KEY CHECK(key='facebook-delta'),
 payload jsonb NOT NULL CHECK(jsonb_typeof(payload->'members')='array'),
 version integer NOT NULL DEFAULT 1 CHECK(version>0),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS learning.member_roster_revisions (
 key text NOT NULL CHECK(key='facebook-delta'),
 payload jsonb NOT NULL,
 version integer NOT NULL CHECK(version>0),
 created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(key,version)
);
ALTER TABLE learning.member_rosters ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning.member_roster_revisions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON learning.member_rosters,learning.member_roster_revisions FROM PUBLIC,cybernest_app;
GRANT SELECT,INSERT,UPDATE ON learning.member_rosters TO cybernest_staff;
GRANT SELECT,INSERT ON learning.member_roster_revisions TO cybernest_staff;
CREATE POLICY staff_roster ON learning.member_rosters FOR ALL TO cybernest_staff USING(true) WITH CHECK(true);
CREATE POLICY staff_roster_revisions ON learning.member_roster_revisions FOR ALL TO cybernest_staff USING(true) WITH CHECK(true);
COMMIT;
