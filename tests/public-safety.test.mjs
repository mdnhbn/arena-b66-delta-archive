import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {assertSafePublicTree,runtimeSecrets} from '../scripts/public-safety.mjs';

test('public build rejects hidden config, private downloads, source maps and nested credentials',async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'cybernest-public-'));
 try{
  await writeFile(path.join(root,'app.js'),'console.log("public preview")');
  assert.equal(await assertSafePublicTree(root,{secrets:[]}),1);
  for(const name of ['.env.production','backup.sql','app.js.map','session.local.json']){
   await writeFile(path.join(root,name),'private');
   await assert.rejects(()=>assertSafePublicTree(root,{secrets:[]}));
   await rm(path.join(root,name));
  }
  await mkdir(path.join(root,'nested'));
  const token=['vercel','blob','rw','syntheticOnly1234567890'].join('_');
  await writeFile(path.join(root,'nested','config.json'),JSON.stringify({value:token}));
  await assert.rejects(()=>assertSafePublicTree(root,{secrets:[]}),/Credential-like/);
  const secret='synthetic-runtime-value-'+Date.now();
  await writeFile(path.join(root,'nested','config.json'),JSON.stringify({value:secret}));
  await assert.rejects(()=>assertSafePublicTree(root,{secrets:[secret]}),/Credential-like/);
 }finally{await rm(root,{recursive:true,force:true});}
});

test('secret comparison selects server values without publishing them',()=>{
 const value='synthetic-value-'.repeat(3);
 assert.deepEqual(runtimeSecrets({CYBERNEST_AUTH_SECRET:value,PUBLIC_ORIGIN:'https://example.com',SOME_FLAG:'1'}),[value]);
});
