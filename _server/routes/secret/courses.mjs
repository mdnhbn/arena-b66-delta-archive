import {PROJECT_ID,json} from '../../security.mjs';
import {readCourses} from '../../secret-courses.mjs';
import {bridgeAllowed} from '../../secret-auth.mjs';
export async function GET(request){if(process.env.VERCEL_ENV!=='production'||process.env.VERCEL_PROJECT_ID!==PROJECT_ID)return json({error:'Not found'},404);if(!bridgeAllowed(request))return json({error:'Forbidden'},403);try{return json(await readCourses());}catch{return json({error:'Unavailable'},503);}}
