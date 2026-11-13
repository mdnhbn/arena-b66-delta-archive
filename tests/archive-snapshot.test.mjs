import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {archiveSnapshot} from '../_server/archive-snapshot.mjs';

const baseline=JSON.parse(readFileSync(new URL('../_server/archive-preview.json',import.meta.url),'utf8'));

test('archive snapshot preserves baseline class IDs omitted by a partial database export',async()=>{
 const database={query:async()=>({rows:[{payload:{updatedAt:'2026-11-03',entries:[
  {id:'class-2026-10-30',category:'recordings',title:'DB Network Testing'},
  {id:'database-only',category:'recordings',title:'New database class'}
 ]}}]})};
 const snapshot=await archiveSnapshot(database);
 assert.equal(snapshot.entries.filter(entry=>entry.id==='class-2026-10-30').length,1);
 assert.equal(snapshot.entries.find(entry=>entry.id==='class-2026-10-30').title,'DB Network Testing');
 assert.ok(snapshot.entries.some(entry=>entry.id===baseline.entries[0].id));
 assert.ok(snapshot.entries.some(entry=>entry.id==='database-only'));
});

