import test from 'node:test';
import assert from 'node:assert/strict';
import {siteFrom,sitePrefix,secretRoute} from '../_server/sites.mjs';
import {cleanCourses,DEFAULT_COURSES} from '../_server/secret-courses.mjs';
import {bridgeAllowed,POST as collect} from '../api/secret/visit.js';
import {GET as stats} from '../api/admin/stats.js';
import {GET as courses,POST as publish} from '../api/admin/courses.js';
import {touchPresence} from '../_server/presence.mjs';
import {PROJECT_ID,ADMIN_ORIGIN} from '../_server/security.mjs';
function env(values,fn){const old={...process.env};Object.assign(process.env,values);return Promise.resolve().then(fn).finally(()=>{for(const key of Object.keys(process.env))if(!(key in old))delete process.env[key];Object.assign(process.env,old);});}
test('site namespaces never overlap or accept arbitrary storage paths',()=>{
 assert.equal(sitePrefix('archive'),'');assert.equal(sitePrefix('secret'),'sites/secret/');assert.throws(()=>sitePrefix('../'));
 assert.equal(siteFrom(new Request('https://example.org/api/admin/stats')),'archive');assert.equal(siteFrom(new Request('https://example.org/api/admin/stats?site=secret')),'secret');assert.throws(()=>siteFrom(new Request('https://example.org/?site=__proto__')));
 assert.equal(secretRoute('#category/hacking?query=private'),'#category/hacking');assert.equal(secretRoute('#library?token=private'),'#library');assert.equal(secretRoute('https://example.org/#courses'),'#library');
});
test('course validation rejects credentials, executable links and duplicated IDs',()=>{
 assert.deepEqual(cleanCourses(DEFAULT_COURSES),DEFAULT_COURSES);assert.deepEqual(cleanCourses([]),[]);
 const course=DEFAULT_COURSES[0];for(const url of ['javascript:alert(1)','http://example.org/','https://name:password@example.org/','https://example.org/?access_token=secret'])assert.throws(()=>cleanCourses([{...course,url}]));
 assert.throws(()=>cleanCourses([course,course]));assert.throws(()=>cleanCourses([{...course,category:'other'}]));assert.throws(()=>cleanCourses([{...course,adminSecret:'value'}]));
});
test('bridge key verification is strict and non-ASCII input cannot throw',()=>{
 const key='a'.repeat(64);assert.equal(bridgeAllowed(new Request('https://example.org/',{headers:{'x-secret-course-key':key}}),key),true);
 for(const supplied of ['','b'.repeat(64),'é'.repeat(64),'a'.repeat(63)])assert.equal(bridgeAllowed(new Request('https://example.org/',{headers:{'x-secret-course-key':supplied}}),key),false);
});
test('public deployment never serves admin course list or stats and rejects unauthenticated bridge writes',()=>env({VERCEL_ENV:'production',VERCEL_PROJECT_ID:PROJECT_ID,ANALYTICS_INGEST_ENABLED:'1',SECRET_COURSE_BRIDGE_KEY:'a'.repeat(64)},async()=>{
 assert.equal((await courses()).status,404);assert.equal((await stats(new Request('https://example.org/api/admin/stats?site=secret'))).status,404);assert.equal((await collect(new Request('https://example.org/api/secret/visit',{method:'POST',body:'{}'}))).status,403);
}));
test('owner mutation still requires trusted origin and invalid links never reach storage',()=>env({VERCEL_ENV:'preview',VERCEL_GIT_COMMIT_REF:'admin',VERCEL_PROJECT_ID:PROJECT_ID,ADMIN_PREVIEW_ENABLED:'1'},async()=>{
 const request=(origin,payload)=>new Request(ADMIN_ORIGIN+'/api/admin/courses',{method:'POST',headers:{origin,'Content-Type':'application/json','X-Delta-Admin':'1'},body:JSON.stringify(payload)});
 assert.equal((await publish(request('https://evil.example',{courses:[],updatedAt:null}))).status,403);
 assert.equal((await publish(request(ADMIN_ORIGIN,{courses:[{...DEFAULT_COURSES[0],url:'javascript:alert(1)'}],updatedAt:null}))).status,400);
 assert.equal((await stats(new Request(ADMIN_ORIGIN+'/api/admin/stats?site=invalid'))).status,400);
}));
test('secret live presence writes only its own prefix',async()=>{
 const writes=[];const store={get:async()=>null,put:async(path,data)=>{writes.push({path,data});}};
 await touchPresence('a'.repeat(64),'BD',Date.UTC(2026,9,24),store,'sites/secret/');assert.equal(writes.length,1);assert.match(writes[0].path,/^sites\/secret\/presence\/2026-10-24\//);assert.doesNotMatch(writes[0].data,/ip|visitor|cookie/i);
});


test('isolated banner host keeps site selection scoped and rejects unknown sites',async()=>{
 const {GET}=await import('../ads/api/custom.js');const original=globalThis.fetch;const calls=[];globalThis.fetch=async url=>{calls.push(String(url));return Response.json({code:'<p>owned test banner</p>',format:'728x90'});};
 try{assert.equal((await GET(new Request('https://ads.example/api/custom?slot=middle&variant=desktop&site=secret'))).status,200);assert.match(calls[0],/site=secret/);assert.equal((await GET(new Request('https://ads.example/api/custom?slot=middle&site=invalid'))).status,404);assert.equal((await GET(new Request('https://ads.example/api/custom?slot=rail&site=secret'))).status,404);assert.equal(calls.length,1);}finally{globalThis.fetch=original;}
});
