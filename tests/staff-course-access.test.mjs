import test from 'node:test';
import assert from 'node:assert/strict';
import {authPool,learningAuth,grantedCourses,requireCourse} from '../_server/learning-auth.mjs';
import {ROLE_PERMISSIONS,verifiedStaffIdentity} from '../_server/staff-policy.mjs';
import {GET as accountGET} from '../_server/routes/account.mjs';
import {GET as libraryGET} from '../_server/routes/learning-library.mjs';
import {GET as curriculumGET} from '../_server/routes/learning-curriculum.mjs';
import {GET as fileGET} from '../_server/routes/learning-file.mjs';
import {GET as progressGET,POST as progressPOST} from '../_server/routes/learning-progress.mjs';

test('verified staff can study without enrollment while account, scope and revocation boundaries remain enforced',async t=>{
 const names=['VERCEL_ENV','VERCEL_PROJECT_ID','CYBERNEST_AUTH_SECRET','CYBERNEST_DATABASE_URL','CYBERNEST_OWNER_GITHUB_ACCOUNT_ID'];
 const old=Object.fromEntries(names.map(key=>[key,process.env[key]]));
 Object.assign(process.env,{VERCEL_ENV:'production',VERCEL_PROJECT_ID:'prj_Ts514bqmcaw8dmhGxNXa9on4LwTl',CYBERNEST_AUTH_SECRET:'synthetic-staff-course-test-'.repeat(3),CYBERNEST_DATABASE_URL:'postgresql://test:test@staff-course-test.neon.tech/test?sslmode=require'});
 delete process.env.CYBERNEST_OWNER_GITHUB_ACCOUNT_ID;
 const visible=['arena-b66-delta','vault-source-0001','vault-source-0002'],profileId='aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
 const session={user:{id:'synthetic-staff',email:'staff@example.invalid',name:'Staff',role:'super_admin'}};
 let role='admin',verified=true,revoked=false,scope=[],enrolled=[],binding=null,broken=false,staffReads=0,fileReads=0;
 const saved=new Map(),db=authPool();
 const request=(path,headers={})=>new Request('https://cybernest-learn.vercel.app/api/'+path,{headers:{cookie:'synthetic=session',...headers}});
 const client={release(){},async query(sql,args=[]){
  if(sql==='BEGIN'||sql==='COMMIT'||sql==='ROLLBACK')return {rows:[]};
  if(sql.includes('set_config')){assert.deepEqual(args,[profileId]);return {rows:[]};}
  if(sql.startsWith('SELECT 1 FROM learning.lessons'))return {rows:[{}],rowCount:1};
  if(sql.startsWith('INSERT INTO learning.lesson_progress')){assert.equal(args[0],profileId);saved.set(args[1]+':'+args[2],{course_id:args[1],lesson_id:args[2],completed:args[3],last_opened_at:args[4]?'2026-10-30T12:00:00Z':null});return {rows:[],rowCount:1};}
  if(sql.startsWith('SELECT p.course_id')){assert.equal(args[0],profileId);assert.match(sql,/p\.course_id=ANY\(\$2::text\[\]\)/);return {rows:[...saved.values()].filter(row=>args[1].includes(row.course_id))};}
  assert.fail('Unexpected progress query');
 }};
 t.mock.method(learningAuth().api,'getSession',async()=>session);
 t.mock.method(db,'connect',async()=>client);
 t.mock.method(db,'query',async(sql,args=[])=>{
  if(sql.includes('learning.course_access')){assert.match(sql,/a\.revoked_at IS NULL/);assert.match(sql,/a\.expires_at>now\(\)/);assert.match(sql,/archived/);assert.deepEqual(args,[session.user.id]);return {rows:enrolled.filter(id=>visible.includes(id)).map(course_id=>({course_id}))};}
  if(sql.includes('public.cybernest_account')){assert.deepEqual(args,[session.user.id,'github',process.env.CYBERNEST_OWNER_GITHUB_ACCOUNT_ID]);return {rows:binding?[binding]:[]};}
  if(sql.includes('learning.staff_roles')){staffReads++;if(broken)throw Error('Storage unavailable');assert.match(sql,/r\.revoked_at IS NULL/);assert.deepEqual(args,[session.user.id]);return {rows:role&&!revoked?[{role,verified,course_ids:scope}]:[]};}
  if(sql.startsWith('SELECT id AS course_id')){assert.match(sql,/archived/);assert.match(sql,/id=ANY\(\$3::text\[\]\)/);return {rows:visible.filter(id=>id==='arena-b66-delta'?(args[3]===true||args[2].includes(id)):(args[1]===true||args[2].includes(id))).map(course_id=>({course_id}))};}
  if(sql.includes('learning.site_controls'))return {rows:[]};
  if(sql.includes('learning.source_snapshots'))return {rows:[{payload:{entries:[{id:'entry-1',category:'recordings',title:'Synthetic class',youtubeId:'test0000001',noteText:'Protected note'}]}}]};
  if(sql.includes('learning.resource_files')){fileReads++;return {rows:args[1]==='vault-source-0001'?[{name:'test.pdf',mime:'application/pdf',content:Buffer.from('synthetic document')}]:[]};}
  if(sql.startsWith('SELECT id,serial,title,payload FROM learning.lessons'))return {rows:[{id:'lesson-01',serial:1,title:'Lesson',payload:{videos:[{provider:'youtube',id:'test0000001'}],documents:[],tools:[]}}]};
  if(sql.startsWith('SELECT id,serial,title FROM learning.lessons'))return {rows:[{id:'lesson-01',serial:1,title:'Lesson'}]};
  if(sql.startsWith('INSERT INTO learning.profiles'))return {rows:[{id:profileId}]};
  assert.fail('Unexpected query: '+sql);
 });
 const grants=()=>grantedCourses(session,request('account'));
 try{
  await t.test('management roles do not see the private archive unless explicitly scoped',async()=>{
   const ordinaryVisible=visible.filter(id=>id!=='arena-b66-delta');
   for(role of Object.keys(ROLE_PERMISSIONS)){assert.deepEqual([...await grants()],ordinaryVisible);const access=await requireCourse(request('learning-curriculum'),'vault-source-0001');assert.equal(access.response,undefined);}
   const account=await accountGET(request('account'));assert.deepEqual((await account.json()).courses,ordinaryVisible);assert.match(account.headers.get('cache-control'),/private, no-store/);
  });
  await t.test('a scoped editor gains only assigned courses plus separately enrolled courses',async()=>{
   role='editor';scope=['vault-source-0001','archived-course','nonexistent-course'];assert.deepEqual([...await grants()],['vault-source-0001']);
   assert.equal((await requireCourse(request('learning-curriculum'),'vault-source-0002')).response.status,403);
   enrolled=['vault-source-0002'];assert.deepEqual(new Set(await grants()),new Set(['vault-source-0001','vault-source-0002']));
   enrolled=[];scope=[];
  });
  await t.test('existing valid management scope identifiers do not invalidate the editor role',async()=>{
   role='editor';scope=[Array(17).fill('a').join('-')];
   const identity=await verifiedStaffIdentity(session,db);assert.equal(identity.role,'editor');assert.deepEqual(identity.courseIds,scope);
   for(scope of [null,'vault-source-0001',['../studio']])assert.equal(await verifiedStaffIdentity(session,db),null);
   scope=[];
  });
  await t.test('unverified, revoked, unknown and client-claimed roles cannot unlock course content',async()=>{
   role='admin';verified=false;assert.equal((await grants()).size,0);verified=true;revoked=true;assert.equal((await grants()).size,0);revoked=false;
   for(role of [null,'marketing','__proto__']){assert.equal((await grants()).size,0);assert.equal((await requireCourse(request('learning-file',{'x-role':'super_admin'}),'vault-source-0001')).response.status,403);}
   enrolled=['vault-source-0002'];assert.deepEqual([...await grants()],enrolled);enrolled=[];
  });
  await t.test('only the verified immutable GitHub owner binding grants owner access',async()=>{
   process.env.CYBERNEST_OWNER_GITHUB_ACCOUNT_ID='123456';role=null;
   for(binding of [{providerId:'github',accountId:'654321',verified:true},{providerId:'google',accountId:'123456',verified:true},{providerId:'github',accountId:'123456',verified:false}])assert.equal((await grants()).size,0);
   binding={providerId:'github',accountId:'123456',verified:true};assert.deepEqual([...await grants()],visible);
   delete process.env.CYBERNEST_OWNER_GITHUB_ACCOUNT_ID;binding=null;
  });
  await t.test('staff access requires canonical production context and a signed-in session',async()=>{
   role='super_admin';const before=staffReads;
   assert.equal((await grantedCourses(session,new Request('https://untrusted.example/api/account'))).size,0);
   process.env.VERCEL_ENV='preview';assert.equal((await grants()).size,0);process.env.VERCEL_ENV='production';
   process.env.VERCEL_PROJECT_ID='wrong-project';assert.equal((await grants()).size,0);process.env.VERCEL_PROJECT_ID='prj_Ts514bqmcaw8dmhGxNXa9on4LwTl';
   assert.equal((await grantedCourses(null,request('account'))).size,0);assert.equal(staffReads,before);
   assert.equal((await requireCourse(new Request('https://cybernest-learn.vercel.app/api/learning-file'),'vault-source-0001')).response.status,401);
  });
  await t.test('archive, vault player and files share staff access; file course binding is preserved',async()=>{
   role='marketer';let archive=await libraryGET(request('learning-library')),data=await archive.json();assert.equal(data.access.granted,false);assert.deepEqual(data.entries,[]);
   role='editor';scope=['arena-b66-delta'];archive=await libraryGET(request('learning-library'));data=await archive.json();assert.equal(data.access.granted,true);assert.equal(data.entries[0].youtubeId,'test0000001');
   role='marketer';enrolled=['vault-source-0001','vault-source-0002'];const curriculum=await (await curriculumGET(request('learning-curriculum?id=vault-source-0001'))).json();assert.equal(curriculum.access,'granted');assert.equal(curriculum.lessons[0].videos.length,1);
   const file=await fileGET(request('learning-file?key=documents/test.pdf&courseId=vault-source-0001'));assert.equal(file.status,200);assert.equal(await file.text(),'synthetic document');
   assert.equal((await fileGET(request('learning-file?key=documents/test.pdf&courseId=vault-source-0002'))).status,404);
   role='editor';scope=['vault-source-0002'];enrolled=[];const before=fileReads;assert.equal((await fileGET(request('learning-file?key=documents/test.pdf&courseId=vault-source-0001'))).status,403);assert.equal(fileReads,before);scope=[];
   role=null;const preview=await (await curriculumGET(request('learning-curriculum?id=vault-source-0001'))).json();assert.equal(preview.access,'preview');assert.equal(preview.lessons[0].videos.length,0);
  });
  await t.test('staff progress saves and reads without enrollment, then disappears when role is revoked',async()=>{
   role='editor';scope=['vault-source-0001'];const update=new Request('https://cybernest-learn.vercel.app/api/learning-progress',{method:'POST',headers:{cookie:'synthetic=session',origin:'https://cybernest-learn.vercel.app','content-type':'application/json'},body:JSON.stringify({courseId:'vault-source-0001',lessonId:'lesson-01',completed:true,opened:true})});
   assert.equal((await progressPOST(update)).status,200);const progress=await (await progressGET(request('learning-progress'))).json();assert.deepEqual(progress.courses['vault-source-0001'].completed,['lesson-01']);
   revoked=true;assert.deepEqual((await (await progressGET(request('learning-progress'))).json()).courses,{});revoked=false;scope=[];
  });
  await t.test('a failed role lookup never becomes an unrestricted course grant',async()=>{
   broken=true;assert.equal((await accountGET(request('account'))).status,503);const preview=await (await libraryGET(request('learning-library'))).json();assert.equal(preview.access.granted,false);
  });
 }finally{t.mock.restoreAll();await db.end();for(const key of names)if(old[key]===undefined)delete process.env[key];else process.env[key]=old[key];}
});
