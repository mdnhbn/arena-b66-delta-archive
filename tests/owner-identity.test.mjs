import test from 'node:test';import assert from 'node:assert/strict';
import {configuredOwnerGitHubId,canonicalOwnerMatches} from '../_server/owner-identity.mjs';
test('canonical owner requires an explicitly configured immutable verified GitHub identity',()=>{
 const env={CYBERNEST_OWNER_GITHUB_ACCOUNT_ID:'1234567'},binding={providerId:'github',accountId:'1234567',verified:true};
 assert.equal(canonicalOwnerMatches(binding,env),true);
 assert.equal(canonicalOwnerMatches(binding,{}),false);
 assert.equal(canonicalOwnerMatches({...binding,verified:false},env),false);
 assert.equal(canonicalOwnerMatches({...binding,accountId:'7654321'},env),false);
 assert.equal(canonicalOwnerMatches({...binding,providerId:'google'},env),false);
 assert.equal(canonicalOwnerMatches({name:'owner',email:'owner@example.com',role:'super_admin'},env),false);
 assert.equal(configuredOwnerGitHubId({CYBERNEST_OWNER_GITHUB_ACCOUNT_ID:'*'}),'');
});
