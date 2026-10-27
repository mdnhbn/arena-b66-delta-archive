import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {readActivityStats} from '../_server/activity-stats.mjs';import {POST} from '../_server/routes/visit.mjs';
test('overview uses one site and consented sessions, preserves unavailable days and exposes no identities',async()=>{
 const calls=[],db={query:async(sql,args)=>{calls.push({sql,args});assert.equal(args[0],'secret');if(sql.startsWith('SELECT day'))return {rows:[{date:'2026-10-26',visits:3,visitors:2}]};if(sql.includes('DISTINCT ON(day'))return {rows:[{date:'2026-10-26',code:'BD',count:2}]};if(sql.includes('DISTINCT ON(visitor_key)'))return {rows:[{code:'BD',count:1}]};return {rows:[{first_day:'2026-10-26'}]};}};
 const result=await readActivityStats('secret',7,db,Date.parse('2026-10-27T12:00Z'));
 assert.equal(result.days.length,7);assert.equal(result.days.at(-3).visits,null);assert.equal(result.days.at(-3).collected,false);assert.equal(result.days.at(-2).visits,3);assert.equal(result.days.at(-2).visitors,2);assert.equal(result.days.at(-1).visits,0);assert.equal(result.active,1);assert.equal(result.source,'consented-activity');assert.equal(result.legacyHistorySeparate,true);assert.equal(calls.length,4);
 assert.match(calls[1].sql,/DISTINCT ON\(day,visitor_key\)/);assert.match(calls[2].sql,/last_seen>\$2/);assert.doesNotMatch(JSON.stringify(result),/email|user_id|visitor_key|session_id|ip_address/);
 await assert.rejects(readActivityStats('../',7,db));await assert.rejects(readActivityStats('secret',365,db));await assert.rejects(readActivityStats('secret',7,{query:async()=>{throw Error('offline');}}));
});
test('retired collection cannot write Blob data and frontends no longer send duplicate visits',async()=>{
 const request=headers=>new Request('https://cybernest-learn.vercel.app/api/visit',{method:'POST',headers:{origin:'https://cybernest-learn.vercel.app','sec-fetch-site':'same-origin',...headers}});
 assert.equal((await POST(request({}))).status,410);assert.equal((await POST(request({dnt:'1'}))).status,204);assert.equal((await POST(request({origin:'https://evil.example'}))).status,403);
 for(const p of ['modern.js','vault/portal-controls.js','_server/routes/visit.mjs','_server/routes/secret/visit.mjs','_server/routes/admin/stats.mjs'])assert.doesNotMatch(readFileSync(p,'utf8'),/@vercel\/blob|fetch\('\/api\/visit/);
});
