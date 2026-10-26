import test from 'node:test';
import assert from 'node:assert/strict';
import {authPool,learningAuth} from '../_server/learning-auth.mjs';
import {POST} from '../_server/routes/admin/archive.mjs';

test('archive write checks the authenticated editor course scope before parsing or modifying a class',async t=>{
 const names=['VERCEL_ENV','VERCEL_PROJECT_ID','CYBERNEST_AUTH_SECRET','CYBERNEST_DATABASE_URL','CYBERNEST_OWNER_GITHUB_ACCOUNT_ID'];
 const previous=Object.fromEntries(names.map(name=>[name,process.env[name]]));
 Object.assign(process.env,{VERCEL_ENV:'production',VERCEL_PROJECT_ID:'prj_Ts514bqmcaw8dmhGxNXa9on4LwTl',CYBERNEST_AUTH_SECRET:'synthetic-local-test-only-'.repeat(3),CYBERNEST_DATABASE_URL:'postgresql://test:test@security-test.neon.tech/app?sslmode=require'});
 delete process.env.CYBERNEST_OWNER_GITHUB_ACCOUNT_ID;
 let courseIds=['vault-source-0001'];
 const database=authPool();
 t.mock.method(learningAuth().api,'getSession',async()=>({user:{id:'synthetic-editor',email:'editor@example.invalid',name:'Editor'}}));
 t.mock.method(database,'query',async(sql)=>{
  if(sql.includes('learning.staff_roles'))return {rows:[{role:'editor',course_ids:courseIds,verified:true}]};
  if(sql.startsWith('INSERT INTO learning.profiles'))return {rows:[{id:'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'}]};
  assert.fail('An out-of-scope class must never reach course storage');
 });
 const request=()=>new Request('https://cybernest-learn.vercel.app/api/admin/archive',{method:'POST',headers:{cookie:'synthetic=session',origin:'https://cybernest-learn.vercel.app','Content-Type':'application/json','X-Delta-Admin':'1'},body:'{"entry":{},"version":0}'});
 try{
  assert.equal((await POST(request())).status,403);
  courseIds=['arena-b66-delta'];
  assert.equal((await POST(request())).status,400); // Scope is permitted; malformed input is still rejected.
 }finally{
  t.mock.restoreAll();await database.end();
  for(const [name,value]of Object.entries(previous)){if(value===undefined)delete process.env[name];else process.env[name]=value;}
 }
});
