import {PROJECT_ID,json} from '../../security.mjs';
import {readCourses} from '../../secret-courses.mjs';
import {bridgeAllowed} from '../../secret-auth.mjs';
import {ARCHIVE_COURSE} from '../../course-policy.mjs';
export async function GET(request){if(process.env.VERCEL_ENV!=='production'||process.env.VERCEL_PROJECT_ID!==PROJECT_ID)return json({error:'Not found'},404);if(!bridgeAllowed(request))return json({error:'Forbidden'},403);try{const data=await readCourses();return json({...data,courses:data.courses.filter(c=>c.id!==ARCHIVE_COURSE)});}catch{return json({error:'Unavailable'},503);}}
