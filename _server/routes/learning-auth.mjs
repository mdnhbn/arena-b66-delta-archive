import {learningAuth,accountJSON} from '../learning-auth.mjs';import {emailVerificationReady} from '../email-verification.mjs';
async function handler(request){
 const url=new URL(request.url),path=url.searchParams.get('path');if(!path||! /^[a-zA-Z0-9/-]{1,100}$/.test(path))return accountJSON({error:'Not found'},404);
 if(path==='sign-up/email'&&!emailVerificationReady())return accountJSON({error:'email_verification_unavailable',message:'Email sign-up is temporarily unavailable until email verification is connected.'},503);
 if(Number(request.headers.get('content-length')||0)>16384)return accountJSON({error:'Request too large'},413);
 url.pathname='/api/auth/'+path;url.searchParams.delete('path');
 try{return await learningAuth().handler(new Request(url,request));}catch{return accountJSON({error:'Account service unavailable'},503);}
}
export {handler as GET,handler as POST};
