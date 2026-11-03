// Keep archive reads consistent when historical source snapshots coexist.
// updatedAt is part of the archived payload; payload text is a deterministic
// tie-breaker for snapshots exported on the same date.
export async function archiveSnapshot(database) {
  const { rows } = await database.query(
    "SELECT payload FROM learning.source_snapshots WHERE payload ? 'entries' AND jsonb_typeof(payload->'entries')='array' ORDER BY COALESCE(payload->>'updatedAt','') DESC, payload::text DESC LIMIT 1"
  );
  if (!rows[0]) throw new Error('Archive unavailable');
  return rows[0].payload;
}
