import {learningSession,profileFor,authPool,accountJSON,LEARNING_ORIGIN} from '../learning-auth.mjs';
import {limitedJSON} from '../security.mjs';
export async function POST(request){
 if(request.headers.get('origin')!==LEARNING_ORIGIN&&request.headers.get('origin')!==process.env.CYBERNEST_AUTH_URL)return accountJSON({error:'Forbidden'},403);
 if(request.headers.get('content-type')?.split(';')[0]!=='application/json')return accountJSON({error:'Invalid format'},415);
 try{const session=await learningSession(request);if(!session)return accountJSON({error:'sign_in_required'},401);const input=await limitedJSON(request,1024);if(!/^(?:arena-b66-delta|vault-source-\d{4})$/.test(input.courseId||''))return accountJSON({error:'Invalid course'},400);
  const profile=await profileFor(session),result=await authPool().query("INSERT INTO learning.enrollment_requests(user_id,course_id) SELECT $1,id FROM learning.courses WHERE id=$2 ON CONFLICT(user_id,course_id) DO UPDATE SET requested_at=now(),status=CASE WHEN learning.enrollment_requests.status='approved' THEN 'approved' ELSE 'pending' END RETURNING status",[profile,input.courseId]);
  if(!result.rowCount)return accountJSON({error:'Unknown course'},404);return accountJSON({status:result.rows[0].status,message:'Your request is saved. Course access requires owner approval; no payment has been taken.'});
 }catch{return accountJSON({error:'Enrollment request could not be saved'},503);}
}
