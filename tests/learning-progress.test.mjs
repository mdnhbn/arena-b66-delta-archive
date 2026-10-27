import test from 'node:test';
import assert from 'node:assert/strict';
import {GET,POST,cleanProgressInput} from '../_server/routes/learning-progress.mjs';
const url='https://cybernest-learn.vercel.app/api/learning-progress';

test('lesson progress accepts only bounded account-scoped lesson updates',()=>{
 assert.deepEqual(cleanProgressInput({courseId:'vault-source-0001',lessonId:'lesson-03',completed:true}),{courseId:'vault-source-0001',lessonId:'lesson-03',completed:true,opened:false});
 assert.deepEqual(cleanProgressInput({courseId:'arena-b66-delta',lessonId:'class-2026-10-18',opened:true}),{courseId:'arena-b66-delta',lessonId:'class-2026-10-18',completed:undefined,opened:true});
 for(const value of [{courseId:'../admin',lessonId:'lesson-1',completed:true},{courseId:'vault-source-0001',lessonId:'../account',completed:true},{courseId:'vault-source-0001',lessonId:'lesson-1'},{courseId:'vault-source-0001',lessonId:'lesson-1',opened:false},{courseId:'vault-source-0001',lessonId:'lesson-1',completed:'yes'},{courseId:'vault-source-0001',lessonId:'lesson-1',completed:true,other:'x'}])assert.throws(()=>cleanProgressInput(value));
});

test('lesson progress reads require a signed-in account',async()=>{
 const response=await GET(new Request(url));assert.equal(response.status,401);assert.equal(response.headers.get('cache-control'),'private, no-store, max-age=0');
});

test('lesson progress writes enforce origin, JSON and sign-in checks',async()=>{
 const wrongOrigin=await POST(new Request(url,{method:'POST',headers:{origin:'https://evil.example','content-type':'application/json'},body:JSON.stringify({courseId:'vault-source-0001',lessonId:'lesson-01',completed:true})}));assert.equal(wrongOrigin.status,403);
 const wrongType=await POST(new Request(url,{method:'POST',headers:{origin:'https://cybernest-learn.vercel.app','content-type':'text/plain'},body:'x'}));assert.equal(wrongType.status,415);
 const signedOut=await POST(new Request(url,{method:'POST',headers:{origin:'https://cybernest-learn.vercel.app','content-type':'application/json'},body:JSON.stringify({courseId:'vault-source-0001',lessonId:'lesson-01',completed:true})}));assert.equal(signedOut.status,401);
});
