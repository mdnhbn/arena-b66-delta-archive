import {socialProviders} from './social-providers.mjs';
import {betterAuth} from 'better-auth';
import pg from 'pg';
import {trustedManagementRequest,verifiedStaffIdentity} from './staff-policy.mjs';
const {Pool}=pg;
export const LEARNING_ORIGIN='https://cybernest-learn.vercel.app';
let pool,auth;
export function authPool(){
 if(pool)return pool;
 const value=process.env.CYBERNEST_DATABASE_URL;if(!value)throw Error('Learning account storage unavailable');
 const url=new URL(value);if(url.protocol!=='postgresql:'||!url.hostname.endsWith('.neon.tech')||url.searchParams.get('sslmode')!=='require')throw Error('Secure learning storage required');
 url.searchParams.delete('sslmode');
 pool=new Pool({connectionString:url.href,ssl:{rejectUnauthorized:true},max:3,connectionTimeoutMillis:5000,idleTimeoutMillis:10000,statement_timeout:8000,query_timeout:10000});pool.on('error',()=>{});return pool;
}
export function authOptions(database=authPool()){
 const baseURL=process.env.CYBERNEST_AUTH_URL||LEARNING_ORIGIN;
 if(!process.env.CYBERNEST_AUTH_SECRET||process.env.CYBERNEST_AUTH_SECRET.length<32)throw Error('Learning authentication unavailable');
 return {appName:'CyberNest',baseURL,basePath:'/api/auth',secret:process.env.CYBERNEST_AUTH_SECRET,database,
  socialProviders:socialProviders(),trustedOrigins:[baseURL],emailAndPassword:{enabled:true,minPasswordLength:12,maxPasswordLength:128,requireEmailVerification:false},
  user:{modelName:'cybernest_user',changeEmail:{enabled:false}},session:{modelName:'cybernest_session',expiresIn:7*86400,updateAge:86400,cookieCache:{enabled:false}},
  account:{modelName:'cybernest_account',encryptOAuthTokens:true,accountLinking:{enabled:true,disableImplicitLinking:true,allowDifferentEmails:false,trustedProviders:[]}},verification:{modelName:'cybernest_verification'},
  advanced:{cookiePrefix:'cybernest',database:{generateId:'uuid'},defaultCookieAttributes:{httpOnly:true,sameSite:'lax'}},
  rateLimit:{enabled:true,storage:'database',modelName:'cybernest_rate_limit',window:60,max:60,customRules:{'/sign-in/email':{window:60,max:5},'/sign-up/email':{window:3600,max:5},'/get-session':false}},
  logger:{disabled:true}
 };
}
export function learningAuth(){return auth??=betterAuth(authOptions());}
export async function learningSession(request){
 if(!request.headers.get('cookie'))return null;
 return learningAuth().api.getSession({headers:request.headers,query:{disableCookieCache:true}});
}
export function accountJSON(value,status=200){return Response.json(value,{status,headers:{'Cache-Control':'private, no-store, max-age=0','Vary':'Cookie','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex,nofollow'}});}
export async function profileFor(session){
 if(!session?.user?.id)return null;
 const {rows}=await authPool().query("INSERT INTO learning.profiles(identity_provider,identity_subject,email,display_name) VALUES('better-auth',$1,$2,$3) ON CONFLICT(identity_provider,identity_subject) DO UPDATE SET email=excluded.email,display_name=excluded.display_name RETURNING id",[session.user.id,session.user.email,session.user.name]);return rows[0].id;
}
export async function grantedCourses(session,request){
 if(!session?.user?.id)return new Set();
 const database=authPool(),{rows}=await database.query("SELECT a.course_id FROM learning.course_access a JOIN learning.courses c ON c.id=a.course_id JOIN learning.profiles p ON p.id=a.user_id WHERE p.identity_provider='better-auth' AND p.identity_subject=$1 AND COALESCE((c.payload->>'archived')::boolean,false)=false AND a.revoked_at IS NULL AND (a.expires_at IS NULL OR a.expires_at>now())",[session.user.id]);
 const grants=new Set(rows.map(r=>r.course_id));
 if(trustedManagementRequest(request)){
  const staff=await verifiedStaffIdentity(session,database);
  if(staff){const {rows}=await database.query("SELECT id AS course_id FROM learning.courses WHERE COALESCE((payload->>'archived')::boolean,false)=false AND ($1::text[] IS NULL OR id=ANY($1::text[]))",[staff.owner||!staff.courseIds.length?null:staff.courseIds]);for(const row of rows)grants.add(row.course_id);}
 }
 return grants;
}
export async function requireCourse(request,courseId){const session=await learningSession(request);if(!session)return {response:accountJSON({error:'sign_in_required'},401)};if(!(await grantedCourses(session,request)).has(courseId))return {response:accountJSON({error:'enrollment_required'},403)};return {session};}
