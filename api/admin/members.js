import { get, put } from '@vercel/blob';
import { adminAllowed, adminMutationAllowed, json, limitedJSON, cleanMembers } from '../../_server/security.mjs';
const path='roster/facebook-delta.json';
export async function GET(){
  if(!adminAllowed())return json({error:'Not found'},404);
  try{const file=await get(path,{access:'private',useCache:false});if(!file||file.statusCode!==200)return json({members:[],source:'সদস্যতালিকা এখনও যোগ করা হয়নি',updatedAt:null});const data=await new Response(file.stream).json();return json({members:cleanMembers(data.members),source:String(data.source||'').slice(0,160),updatedAt:data.updatedAt||null});}
  catch(error){console.error('Private roster unavailable',error.name);return json({error:'Private roster unavailable'},503);}
}
export async function POST(request){
  if(!adminAllowed())return json({error:'Not found'},404);
  if(!adminMutationAllowed(request))return json({error:'Forbidden'},403);
  let data;try{const input=await limitedJSON(request,256000);data={members:cleanMembers(input.members),source:typeof input.source==='string'?input.source.trim().slice(0,160):'Owner import',updatedAt:new Date().toISOString()};}catch{return json({error:'Invalid member list'},400);}
  try{await put(path,JSON.stringify(data),{access:'private',contentType:'application/json',addRandomSuffix:false,allowOverwrite:true});return json({saved:data.members.length,updatedAt:data.updatedAt});}
  catch(error){console.error('Private roster save failed',error.name);return json({error:'Could not save'},503);}
}
