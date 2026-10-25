import {PROJECT_ID,json} from '../../_server/security.mjs';
import {bridgeAllowed} from '../../_server/secret-auth.mjs';
import {readCurriculum,courseIdOK} from '../../_server/secret-curriculum.mjs';
export async function GET(request){if(process.env.VERCEL_ENV!=='production'||process.env.VERCEL_PROJECT_ID!==PROJECT_ID)return json({error:'Not found'},404);if(!bridgeAllowed(request))return json({error:'Forbidden'},403);const id=new URL(request.url).searchParams.get('id');if(!courseIdOK(id))return json({error:'Invalid ID'},400);try{const d=await readCurriculum(id);return d.updatedAt?json(d):json({error:'Not found'},404);}catch{return json({error:'Unavailable'},503);}}
