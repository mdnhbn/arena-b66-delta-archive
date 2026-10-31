import {PROJECT_ID,json} from '../../security.mjs';
import {bridgeAllowed} from '../../secret-auth.mjs';
import {readCurriculum,courseIdOK} from '../../secret-curriculum.mjs';
import {ARCHIVE_COURSE} from '../../course-policy.mjs';
export async function GET(request){if(process.env.VERCEL_ENV!=='production'||process.env.VERCEL_PROJECT_ID!==PROJECT_ID)return json({error:'Not found'},404);if(!bridgeAllowed(request))return json({error:'Forbidden'},403);const id=new URL(request.url).searchParams.get('id');if(!courseIdOK(id))return json({error:'Invalid ID'},400);if(id===ARCHIVE_COURSE)return json({error:'Course unavailable'},404);try{const d=await readCurriculum(id);return json(d);}catch{return json({error:'Unavailable'},503);}}

