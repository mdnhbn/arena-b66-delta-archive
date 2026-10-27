import test from 'node:test';import assert from 'node:assert/strict';import {randomBytes} from 'node:crypto';import {sealBackup,openBackup} from '../scripts/private-backup-format.mjs';
test('encrypted backup recovers Unicode and exact file bytes and uses fresh encryption for repeated snapshots',()=>{
 const key=randomBytes(32).toString('base64'),payload={tables:{resource_files:[{name:'নোট.pdf',content:Buffer.from('%PDF-private-file\x00\xff').toString('hex')}],courses:[{id:'synthetic',title:'কোর্স'}]}},a=sealBackup(payload,key),b=sealBackup(payload,key);assert.deepEqual(openBackup(a,key),payload);assert.notDeepEqual(a,b);assert.equal(a.includes(Buffer.from('private-file')),false);assert.equal(a.includes(Buffer.from('নোট.pdf')),false);
});
test('wrong keys, modified ciphertext/header and truncated backups fail authentication',()=>{
 const key=randomBytes(32).toString('base64'),original=sealBackup({private:true},key);assert.throws(()=>openBackup(original,randomBytes(32).toString('base64')));
 for(const offset of [15,original.length-20,original.length-1]){const copy=Buffer.from(original);copy[offset]^=1;assert.throws(()=>openBackup(copy,key));}
 for(const value of [Buffer.alloc(0),original.subarray(0,10),original.subarray(0,-10)])assert.throws(()=>openBackup(value,key));assert.throws(()=>sealBackup({},'short'));assert.throws(()=>openBackup(original,key+'extra'));
});
