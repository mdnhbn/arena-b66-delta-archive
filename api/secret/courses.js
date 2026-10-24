import {PROJECT_ID,json} from '../../_server/security.mjs';
import {readCourses} from '../../_server/secret-courses.mjs';
export async function GET(){if(process.env.VERCEL_ENV!=='production'||process.env.VERCEL_PROJECT_ID!==PROJECT_ID)return json({error:'Not found'},404);try{return json(await readCourses());}catch{return json({error:'Unavailable'},503);}}
