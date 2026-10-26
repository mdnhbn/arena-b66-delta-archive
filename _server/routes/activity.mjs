import {randomUUID} from 'node:crypto';
import {authPool,learningSession,accountJSON,LEARNING_ORIGIN} from '../learning-auth.mjs';
import {limitedJSON,cookies} from '../security.mjs';
import {ACTIVITY_COOKIE,activityDigest,signActivity,readActivity,cleanActivity,visitorIdentity} from '../visitor-activity.mjs';
export async function POST(request){
 if(request.headers.get('origin')!==LEARNING_ORIGIN||request.headers.get('sec-fetch-site')!=='same-origin')return accountJSON({error:'Forbidden'},403);
 if(request.headers.get('dnt')==='1'||request.headers.get('sec-gpc')==='1')return new Response(null,{status:204,headers:{'Cache-Control':'no-store'}});
 if(request.headers.get('content-type')?.split(';')[0]!=='application/json')return accountJSON({error:'Invalid format'},415);
 let data;try{data=cleanActivity(await limitedJSON(request,2048));}catch{return accountJSON({error:'Invalid activity'},400);}
 let db;try{db=await authPool().connect();
 const now=Date.now(),day=new Date(now).toISOString().slice(0,10),identity=visitorIdentity(readActivity(cookies(request)[ACTIVITY_COOKIE],now),now),session=await learningSession(request),userId=session?.user?.id||null;
 const country=/^[A-Z]{2}$/.test(request.headers.get('x-vercel-ip-country')||'')?request.headers.get('x-vercel-ip-country'):'ZZ',network=activityDigest('rate:'+Math.floor(now/60000)+':'+(request.headers.get('x-forwarded-for')?.split(',')[0]||'unknown'));
 await db.query('BEGIN');const limit=await db.query('INSERT INTO learning.activity_limits(key,bucket,count) VALUES($1,$2,1) ON CONFLICT(key) DO UPDATE SET count=learning.activity_limits.count+1 RETURNING count',[network,Math.floor(now/60000)]);if(limit.rows[0].count>120){await db.query('ROLLBACK');return accountJSON({error:'Too many requests'},429);}
 const prior=await db.query('SELECT id,user_id,last_seen,space FROM learning.activity_sessions WHERE id=$1 FOR UPDATE',[identity.session]);let previous=prior.rows[0],fresh=!previous;if(previous&&(previous.user_id!==userId||previous.space!==data.space||now-new Date(previous.last_seen)>30*60000)){identity.session=randomUUID();previous=null;fresh=true;}
 const seconds=previous?Math.min(data.seconds,45,Math.max(0,Math.floor((now-new Date(previous.last_seen))/1000))):0;
 await db.query('INSERT INTO learning.activity_sessions(id,day,visitor_key,user_id,country,space,active_seconds,views) VALUES($1,$2,$3,$4,$5,$6,$7,1) ON CONFLICT(id) DO UPDATE SET last_seen=now(),active_seconds=LEAST(86400,learning.activity_sessions.active_seconds+$7),views=learning.activity_sessions.views+$8',[identity.session,day,activityDigest(day+':'+identity.visitor),userId,country,data.space,seconds,!fresh&&data.navigation?1:0]);
 await db.query('INSERT INTO learning.activity_pages(session_id,route,page_title,active_seconds,views) VALUES($1,$2,$3,$4,1) ON CONFLICT(session_id,route) DO UPDATE SET last_seen=now(),active_seconds=LEAST(86400,learning.activity_pages.active_seconds+$4),views=learning.activity_pages.views+$5',[identity.session,data.route,data.title,seconds,!fresh&&data.navigation?1:0]);await db.query('COMMIT');return new Response(null,{status:204,headers:{'Cache-Control':'no-store','Set-Cookie':ACTIVITY_COOKIE+'='+signActivity(identity)+'; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=2592000'}});
 }catch{await db?.query('ROLLBACK').catch(()=>{});return accountJSON({error:'Activity unavailable'},503);}finally{db?.release();}
}
