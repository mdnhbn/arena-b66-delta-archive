import test from 'node:test';
import assert from 'node:assert/strict';
import {PUBLIC_ORIGINS,adminAllowed} from '../_server/security.mjs';
import {POST} from '../_server/routes/visit.mjs';
test('new and original addresses accept consent opt-out while unrelated origins fail before storage',async()=>{
 const previous={VERCEL_ENV:process.env.VERCEL_ENV,ANALYTICS_INGEST_ENABLED:process.env.ANALYTICS_INGEST_ENABLED};
 Object.assign(process.env,{VERCEL_ENV:'production',ANALYTICS_INGEST_ENABLED:'1'});
 try{for(const origin of [...PUBLIC_ORIGINS,'https://untrusted.example',"https://cybernest-learn.vercel.app.evil.example","' OR 1=1 --"]){
  const response=await POST(new Request('https://cybernest-learn.vercel.app/api/visit',{method:'POST',headers:{origin,'sec-fetch-site':'same-origin',dnt:'1'}}));
  assert.equal(response.status,PUBLIC_ORIGINS.includes(origin)?204:403);
 }}finally{for(const[k,v]of Object.entries(previous)){if(v===undefined)delete process.env[k];else process.env[k]=v;}}
 assert.equal(adminAllowed({VERCEL_ENV:'production',VERCEL_PROJECT_ID:'prj_Ts514bqmcaw8dmhGxNXa9on4LwTl',VERCEL_GIT_COMMIT_REF:'main',ADMIN_PREVIEW_ENABLED:'1'}),false);
});
test('patched dependency schema works without reading credentials',async()=>{
 const {parseGlobalConfig,parseAuthFileConfig}=await import('@vercel/cli-config');
 assert.equal(typeof parseGlobalConfig({}), 'object');
 assert.throws(()=>parseAuthFileConfig({token:123}));
});
