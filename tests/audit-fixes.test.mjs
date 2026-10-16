import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {safeRoute} from '../_server/security.mjs';
import {renderCatalog} from '../scripts/catalog.mjs';

test('analytics keeps authorized deep-link paths and discards query text',()=>{
  for(const [value,expected] of [
    ['#class/entry-99?tab=notes','#class/entry-99'],
    ['#class/class-2026-10-11?tab=tools','#class/class-2026-10-11'],
    ['#resources?topic=XSS&query=private+search','#resources'],
    ['#class/class-2026-02-30?tab=notes','#overview'],
    ['#class/entry-99/extra?tab=notes','#overview'],
    ['https://example.org/#class/entry-99','#overview'],
    ['#class/entry-99?'+ 'x'.repeat(2050),'#overview'],
    [null,'#overview']])assert.equal(safeRoute(value),expected);
});

test('catalog has current resource links, rejects executable URLs and raw HTML',()=>{
  const catalog=renderCatalog({updatedAt:'2026-10-13',entries:[
    {id:'entry-1',category:'recordings',recordingSerial:1,title:'<script>bad</script>',date:'2026-10-11',videoStatus:'ready'},
    {id:'file-1',category:'tools',title:'Tool',documentUrl:'javascript:alert(1)',downloadLinks:[{label:'safe',url:'https://example.org/manual.pdf'}]}]});
  assert.match(catalog,/#class\/entry-1/);assert.match(catalog,/#resource\/file-1/);
  assert.match(catalog,/https:\/\/example.org\/manual.pdf/);assert.doesNotMatch(catalog,/javascript:|<script>/);
});

test('built catalog includes every current entry and public output excludes private files',()=>{
  const data=JSON.parse(readFileSync('data.json','utf8'));
  const catalog=readFileSync('public/CATALOG.md','utf8');
  assert.equal(catalog,renderCatalog(data));
  for(const entry of data.entries)assert.ok(catalog.includes(`### ${entry.id} — `));
  for(const path of ['public/_server','public/.env','public/STATE.md','public/node_modules','public/fixes-2026-10-13'])assert.equal(existsSync(path),false);
});

test('published roadmap and original-source provenance reflect the reviewed state',()=>{
  const data=JSON.parse(readFileSync('data.json','utf8'));
  const records=data.entries.filter(e=>e.category==='recordings').sort((a,b)=>a.recordingSerial-b.recordingSerial);
  assert.deepEqual(records.map(e=>e.recordingSerial),records.map((e,i)=>i+1));
  for(const stage of data.syllabus.stages.filter(e=>e.classIds?.includes('class-2026-10-11')))assert.doesNotMatch(stage.summary,/১১ অক্টোবর.*ভিডিও হোস্টিং বাকি/);
  for(const id of ['msg-class22-duplicator-pro','msg-class22-unlimited-extension']){
    const e=data.entries.find(e=>e.id===id);assert.equal(e.relatedRecordingId,'entry-148');
    assert.doesNotMatch(e.sourceLabel,/\?\?\?/);assert.doesNotMatch(e.relationshipVerification,/\?\?\?/);
  }
  const osint=data.entries.find(e=>e.id==='entry-43');
  assert.equal(osint.publicationEdition,'lab-scoped-redacted');
  assert.doesNotMatch(osint.noteText,/grabify\.link|forms\.gle|take attendance/i);
  const reviewed=records.filter(e=>data.entries.find(n=>n.id===e.searchStudyGuideId)?.fullRecordingSummaryReviewed).length;
  assert.equal(data.studyGuideAudit.fullRecordingSummariesReviewed,reviewed);
  assert.equal(data.studyGuideAudit.fullRecordingSummariesPending,records.length-reviewed);
  if(data.studyGuideAudit.fullAnalysisComplete)assert.equal(reviewed,records.length);
});

test('public source contains no common credential or private-key patterns',()=>{
  const patterns=[/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,/\bAKIA[A-Z0-9]{16}\b/,/\bgh[pousr]_[A-Za-z0-9]{30,}\b/,/vercel_blob_rw_[A-Za-z0-9_]+/];
  const paths=['data.json','app.js','modern.js','admin-ui.js',...readdirSync('notes').map(n=>'notes/'+n)];
  for(const path of paths){if(!/\.(json|js|md|txt)$/.test(path))continue;
    const source=readFileSync(path,'utf8');for(const pattern of patterns)assert.equal(pattern.test(source),false,`Credential-like content in ${path}`);
  }
});
