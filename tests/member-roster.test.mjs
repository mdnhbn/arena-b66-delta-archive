import test from 'node:test';import assert from 'node:assert/strict';import {cleanRoster,readMemberRoster,saveMemberRoster} from '../_server/member-roster.mjs';
test('roster changes require a version and a nonempty, safe member list',()=>{
 const input={members:[{name:' Learner ',profile:'https://www.facebook.com/profile.php?id=123#anchor'}],source:'Test',version:1};assert.equal(cleanRoster(input).members[0].name,'Learner');assert.doesNotMatch(cleanRoster(input).members[0].profile,/#/);
 for(const change of [{version:undefined},{version:-1},{members:[]},{members:[{name:'Bad',profile:'javascript:alert(1)'}]}])assert.throws(()=>cleanRoster({...input,...change}));
});
test('stale roster saves roll back before writing; current saves preserve a revision and audit only a count',async()=>{
 const current={members:[{name:'Original',profile:''}],source:'Old'},calls=[];let released=0;
 const client={release:()=>released++,query:async(sql,args)=>{calls.push({sql,args});if(sql.startsWith('SELECT payload'))return {rows:[{payload:current,version:2}]};if(sql.includes('RETURNING version'))return {rows:[{version:3,updated_at:'2026-10-27T00:00:00Z'}]};return {rows:[]};}},pool={connect:async()=>client},actor='aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
 await assert.rejects(saveMemberRoster({members:[{name:'New'}],source:'Test',version:1},pool,actor),e=>e.status===409);assert.equal(calls.at(-1).sql,'ROLLBACK');assert.ok(!calls.some(x=>x.sql.startsWith('INSERT')));assert.equal(released,1);
 calls.length=0;const saved=await saveMemberRoster({members:[{name:'New'}],source:'Test',version:2},pool,actor);assert.equal(saved.version,3);assert.equal(saved.saved,1);const revision=calls.find(x=>x.sql.includes('INSERT INTO learning.member_roster_revisions'));assert.deepEqual(JSON.parse(revision.args[1]),current);const audit=calls.find(x=>x.sql.includes('INSERT INTO learning.admin_audit'));assert.deepEqual(JSON.parse(audit.args[2]),{count:1,version:3});assert.equal(calls.at(-1).sql,'COMMIT');assert.equal(released,2);
 const result=await readMemberRoster({query:async()=>({rows:[{payload:current,version:2,updated_at:'2026-10-26'}]})});assert.equal(result.version,2);assert.equal(result.members.length,1);
});
