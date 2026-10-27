import {accountJSON,authPool,LEARNING_ORIGIN,learningSession,profileFor,requireCourse} from '../learning-auth.mjs';
import {ARCHIVE_COURSE} from '../learning-content.mjs';
import {limitedJSON} from '../security.mjs';

const courseOK=value=>typeof value==='string'&&value.length<=64&&/^[a-z0-9]+(?:-[a-z0-9]+){0,15}$/.test(value);
const lessonOK=value=>typeof value==='string'&&value.length<=180&&/^[a-z0-9][a-z0-9-]*$/.test(value);
const originOK=request=>request.headers.get('origin')===LEARNING_ORIGIN||request.headers.get('origin')===process.env.CYBERNEST_AUTH_URL;

export function cleanProgressInput(value){
 if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).some(key=>!['courseId','lessonId','completed','opened'].includes(key))||!courseOK(value.courseId)||!lessonOK(value.lessonId))throw Error('Invalid lesson progress');
 if((value.completed!==undefined&&typeof value.completed!=='boolean')||(value.opened!==undefined&&value.opened!==true)||(value.completed===undefined&&value.opened!==true))throw Error('Invalid lesson progress');
 return {courseId:value.courseId,lessonId:value.lessonId,completed:value.completed,opened:value.opened===true};
}

export async function GET(request){
 if(!request.headers.get('cookie'))return accountJSON({error:'sign_in_required'},401);
 const session=await learningSession(request).catch(()=>null);
 if(!session)return accountJSON({error:'sign_in_required'},401);
 try{
  const userId=await profileFor(session),client=await authPool().connect();let rows;
  try{await client.query('BEGIN');await client.query("SELECT set_config('cybernest.user_id',$1,true)",[userId]);
   rows=(await client.query("SELECT p.course_id,p.lesson_id,p.completed,p.last_opened_at FROM learning.lesson_progress p JOIN learning.course_access a ON a.user_id=p.user_id AND a.course_id=p.course_id JOIN learning.courses c ON c.id=p.course_id WHERE p.user_id=$1 AND a.revoked_at IS NULL AND (a.expires_at IS NULL OR a.expires_at>now()) AND COALESCE((c.payload->>'archived')::boolean,false)=false ORDER BY p.last_opened_at DESC NULLS LAST,p.updated_at DESC LIMIT 2000",[userId])).rows;
   await client.query('COMMIT');
  }catch{await client.query('ROLLBACK').catch(()=>{});throw Error();}finally{client.release();}
  const courses={};let recent=null;
  for(const row of rows){const item=courses[row.course_id]??={completed:[]};if(row.completed)item.completed.push(row.lesson_id);if(row.last_opened_at&&!recent)recent={courseId:row.course_id,lessonId:row.lesson_id};}
  return accountJSON({courses,recent});
 }catch{return accountJSON({error:'Progress service unavailable'},503);}
}

export async function POST(request){
 if(!originOK(request))return accountJSON({error:'Forbidden'},403);
 if(request.headers.get('content-type')?.split(';')[0]!=='application/json')return accountJSON({error:'Invalid format'},415);
 let input;try{input=cleanProgressInput(await limitedJSON(request,1024));}catch{return accountJSON({error:'Invalid lesson progress'},400);}
 const permission=await requireCourse(request,input.courseId);if(permission.response)return permission.response;
 try{
  const userId=await profileFor(permission.session),client=await authPool().connect();
  try{
   await client.query('BEGIN');await client.query("SELECT set_config('cybernest.user_id',$1,true)",[userId]);
   const found=input.courseId===ARCHIVE_COURSE
    ? await client.query("SELECT 1 FROM learning.source_snapshots WHERE payload ? 'entries' AND jsonb_typeof(payload->'entries')='array' AND EXISTS(SELECT 1 FROM jsonb_array_elements(payload->'entries') e WHERE e->>'id'=$1) LIMIT 1",[input.lessonId])
    : await client.query('SELECT 1 FROM learning.lessons WHERE course_id=$1 AND id=$2 LIMIT 1',[input.courseId,input.lessonId]);
   if(!found.rowCount){await client.query('ROLLBACK');return accountJSON({error:'Unknown lesson'},404);}
   await client.query("INSERT INTO learning.lesson_progress(user_id,course_id,lesson_id,completed,last_opened_at) VALUES($1,$2,$3,COALESCE($4,false),CASE WHEN $5 THEN now() END) ON CONFLICT(user_id,course_id,lesson_id) DO UPDATE SET completed=COALESCE($4,learning.lesson_progress.completed),last_opened_at=CASE WHEN $5 THEN now() ELSE learning.lesson_progress.last_opened_at END,updated_at=now()",[userId,input.courseId,input.lessonId,input.completed??null,input.opened]);
   await client.query('COMMIT');return accountJSON({saved:true});
  }catch{await client.query('ROLLBACK').catch(()=>{});throw Error();}finally{client.release();}
 }catch{return accountJSON({error:'Progress could not be saved'},503);}
}
