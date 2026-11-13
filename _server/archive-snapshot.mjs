import {readFileSync} from 'node:fs';

// Keep archive reads consistent when historical source snapshots coexist.
// updatedAt is part of the archived payload; payload text is a deterministic
// tie-breaker for snapshots exported on the same date.
const preview=JSON.parse(readFileSync(new URL('./archive-preview.json',import.meta.url),'utf8'));

export async function archiveSnapshot(database) {
  const { rows } = await database.query(
    "SELECT payload FROM learning.source_snapshots WHERE payload ? 'entries' AND jsonb_typeof(payload->'entries')='array' ORDER BY COALESCE(payload->>'updatedAt','') DESC, payload::text DESC LIMIT 1"
  );
  if (!rows[0]) throw new Error('Archive unavailable');
  const snapshot=rows[0].payload;
  const current=snapshot.entries;
  const currentById=new Map(current.map(entry=>[entry.id,entry]));
  const previewIds=new Set(preview.entries.map(entry=>entry.id));
  // The database may contain a newer partial export than the bundled archive.
  // Preserve any baseline entries omitted by that export; DB versions win for
  // IDs present in both. This keeps class IDs editable and visible consistently.
  const entries=[
    ...preview.entries.map(entry=>currentById.get(entry.id)||entry),
    ...current.filter(entry=>!previewIds.has(entry.id))
  ];
  return {...preview,...snapshot,entries};
}

