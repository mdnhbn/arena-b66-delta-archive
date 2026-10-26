import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
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

test('public output excludes full course data, downloads and private files',()=>{
  for(const path of ['public/data.json','public/CATALOG.md','public/documents','public/notes','public/tools','public/_server','public/.env','public/STATE.md','public/node_modules','public/fixes-2026-10-13'])assert.equal(existsSync(path),false,path);
});

test('public preview preserves class order without publishing private course resources',()=>{
  const data=JSON.parse(readFileSync('_server/archive-preview.json','utf8'));
  const records=data.entries.filter(e=>e.category==='recordings').sort((a,b)=>a.recordingSerial-b.recordingSerial);
  assert.deepEqual(records.map(e=>e.recordingSerial),records.map((e,i)=>i+1));
  assert.equal(records.length,26);
  for(const entry of data.entries)for(const key of ['noteText','youtubeId','youtubeVideos','dailymotionVideos','documentUrl','source','links'])assert.equal(entry[key],undefined);
});

test('public source contains no common credential or private-key patterns',()=>{
  const patterns=[/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,/\bAKIA[A-Z0-9]{16}\b/,/\bgh[pousr]_[A-Za-z0-9]{30,}\b/,/vercel_blob_rw_[A-Za-z0-9_]+/];
  const paths=['_server/archive-preview.json','app.js','modern.js','admin-ui.js'];
  for(const path of paths){if(!/\.(json|js|md|txt)$/.test(path))continue;
    const source=readFileSync(path,'utf8');for(const pattern of patterns)assert.equal(pattern.test(source),false,`Credential-like content in ${path}`);
  }
});
