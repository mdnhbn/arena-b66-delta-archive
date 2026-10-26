import {authPool} from './learning-auth.mjs';
export const FEATURES=Object.freeze(['site','catalog','videos','resources','enrollment','registration','ads','checkout']);
export const DEFAULT_OPERATIONS=Object.freeze({title:'CyberNest',announcement:'',message:'এই অংশে সাময়িক রক্ষণাবেক্ষণ চলছে। একটু পরে আবার চেষ্টা করুন।',enabled:Object.fromEntries(FEATURES.map(k=>[k,k!=='checkout']))});
export function cleanOperations(input){
 if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!['title','announcement','message','enabled'].includes(k)))throw Error('Invalid settings');
 const out={};for(const [k,max]of [['title',80],['announcement',300],['message',400]]){if(typeof input[k]!=='string'||input[k].length>max)throw Error('Invalid text');out[k]=input[k].trim();}if(!out.title||!out.message)throw Error('Missing text');
 if(!input.enabled||Object.keys(input.enabled).length!==FEATURES.length||FEATURES.some(k=>typeof input.enabled[k]!=='boolean'))throw Error('Invalid switches');
 out.enabled=Object.fromEntries(FEATURES.map(k=>[k,input.enabled[k]]));
 // A payment gateway must be verified before any checkout can take money.
 if(out.enabled.checkout)throw Error('Live checkout is not connected');
 return out;
}
export async function operations(db=authPool()) {const {rows}=await db.query("SELECT payload,version,updated_at FROM learning.site_controls WHERE key='operations'");const r=rows[0];return {settings:r?cleanOperations(r.payload):structuredClone(DEFAULT_OPERATIONS),version:r?.version||0,updatedAt:r?.updated_at||null};}
export function unavailable(message){return Response.json({error:'maintenance',message},{status:503,headers:{'Cache-Control':'private, no-store','Retry-After':'60','X-Robots-Tag':'noindex,nofollow'}});}
export function blockedFeature(route,path,settings){
 if(route.startsWith('admin/')||route.startsWith('staff/')||route==='auth/sign-in/email'||route==='auth/sign-in/social'||route.startsWith('auth/callback/')||route==='site-config'||route==='account'||route==='auth/get-session'||route==='auth/sign-out')return null;
 if(!settings.enabled.site)return 'site';
 const feature=route==='auth/sign-up/email'?'registration':route==='enrollment'?'enrollment':route==='learning-file'?'resources':['ads-config','ad-code','ad-campaigns','ad-campaign-code'].includes(route)?'ads':route==='checkout'?'checkout':['learning-courses','learning-curriculum','learning-library','secret/courses','secret/curriculum'].includes(route)?'catalog':null;
 return feature&&!settings.enabled[feature]?feature:null;
}
