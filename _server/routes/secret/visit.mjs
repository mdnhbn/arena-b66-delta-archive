import {randomBytes} from 'node:crypto';
import {put,list} from '@vercel/blob';
import {PROJECT_ID,json,cookies,verify,sign,digest,limitedJSON} from '../../security.mjs';
import {secretRoute} from '../../sites.mjs';
import {touchPresence} from '../../presence.mjs';
import {countryCode,HEARTBEAT_INTERVAL} from '../../analytics.mjs';
import {takeRateToken} from '../../rate-limit.mjs';
import {bridgeAllowed} from '../../secret-auth.mjs';
export async function POST(request){
 if(process.env.VERCEL_ENV!=='production'||process.env.VERCEL_PROJECT_ID!==PROJECT_ID||process.env.ANALYTICS_INGEST_ENABLED!=='1')return json({error:'Unavailable'},503);
 if(!bridgeAllowed(request))return json({error:'Forbidden'},403);
 if(request.headers.get('content-type')?.split(';')[0]!=='application/json')return json({error:'Unsupported format'},415);
 const identity=request.headers.get('x-course-client')||'';if(!/^[a-f0-9]{64}$/.test(identity))return json({error:'Invalid request'},400);
 let input;try{input=await limitedJSON(request,1024);}catch{return json({error:'Invalid request'},400);}
 const now=Date.now(),jar=cookies(request),country=countryCode(request.headers.get('x-course-country')),prefix='sites/secret/';
 const knownVisitor=verify(jar['__Host-vault-visitor'],now),knownSession=verify(jar['__Host-vault-session'],now);
 const headers=new Headers({'Cache-Control':'no-store'});
 const presenceCookie=id=>headers.append('Set-Cookie','__Host-vault-presence='+sign({id,exp:now+HEARTBEAT_INTERVAL})+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=120');
 try{
  if(knownVisitor&&knownSession){if(verify(jar['__Host-vault-presence'],now))return new Response(null,{status:204,headers});await touchPresence(digest('secret-presence:'+knownVisitor.id),country,now,undefined,prefix);presenceCookie(knownVisitor.id);return new Response(null,{status:204,headers});}
  const visitor=knownVisitor||{id:randomBytes(16).toString('hex'),exp:now+30*86400000},session={id:randomBytes(16).toString('hex'),exp:now+30*60000},date=new Date(now).toISOString().slice(0,10);
  const daily=await list({prefix:prefix+'visits/'+date+'/',limit:1000});if(daily.blobs.length>=1000)return new Response(null,{status:204,headers});
  if(!await takeRateToken(request,{identity}))return new Response(null,{status:429,headers:{'Cache-Control':'no-store','Retry-After':'60'}});
  const record={at:new Date(now).toISOString(),date,visitor:digest('secret:'+date+':'+visitor.id),country,route:secretRoute(input?.route)};
  await put(prefix+'visits/'+date+'/'+record.visitor+'-'+session.id+'-'+country+'.json',JSON.stringify(record),{access:'private',contentType:'application/json',addRandomSuffix:false,allowOverwrite:false});
  let presenceSaved=false;try{await touchPresence(digest('secret-presence:'+visitor.id),country,now,undefined,prefix);presenceSaved=true;}catch(error){console.error('Secret presence unavailable',error.name);}
  headers.append('Set-Cookie','__Host-vault-visitor='+sign(visitor)+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=2592000');
  headers.append('Set-Cookie','__Host-vault-session='+sign(session)+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=1800');if(presenceSaved)presenceCookie(visitor.id);
  return new Response(null,{status:204,headers});
 }catch(error){console.error('Secret course visit unavailable',error.name);return json({error:'Unavailable'},503);}
}
