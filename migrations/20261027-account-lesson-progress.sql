-- Per-account lesson completion and last-opened markers for active course grants.
BEGIN;
CREATE TABLE IF NOT EXISTS learning.lesson_progress (
  user_id uuid NOT NULL REFERENCES learning.profiles(id) ON DELETE CASCADE,
  course_id text NOT NULL REFERENCES learning.courses(id) ON DELETE CASCADE,
  lesson_id text NOT NULL CHECK (length(lesson_id) BETWEEN 1 AND 180),
  completed boolean NOT NULL DEFAULT false,
  last_opened_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, course_id, lesson_id)
);
CREATE INDEX IF NOT EXISTS lesson_progress_recent
  ON learning.lesson_progress(user_id, last_opened_at DESC)
  WHERE last_opened_at IS NOT NULL;
ALTER TABLE learning.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning.lesson_progress FORCE ROW LEVEL SECURITY;
REVOKE ALL ON learning.lesson_progress FROM PUBLIC;
GRANT SELECT, INSERT, UPDATE ON learning.lesson_progress TO cybernest_app;
DROP POLICY IF EXISTS lesson_progress_owner ON learning.lesson_progress;
CREATE POLICY lesson_progress_owner ON learning.lesson_progress
  FOR ALL TO cybernest_app
  USING (user_id = NULLIF(current_setting('cybernest.user_id', true), '')::uuid)
  WITH CHECK (user_id = NULLIF(current_setting('cybernest.user_id', true), '')::uuid);
COMMIT;
