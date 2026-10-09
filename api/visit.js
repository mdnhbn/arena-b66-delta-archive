import { randomBytes } from 'node:crypto';
import { put, list } from '@vercel/blob';
import { PUBLIC_ORIGIN, json, cookies, sign, verify, digest, safeRoute, limitedJSON } from '../_server/security.mjs';
import { takeRateToken } from '../_server/rate-limit.mjs';
import {touchPresence} from '../_server/presence.mjs';
import {countryCode,HEARTBEAT_INTERVAL} from '../_server/analytics.mjs';
export async function POST(request) {
  if (process.env.VERCEL_ENV !== 'production' || process.env.ANALYTICS_INGEST_ENABLED !== '1') return json({error:'Unavailable'},503);
  if (request.headers.get('origin') !== PUBLIC_ORIGIN || request.headers.get('sec-fetch-site') !== 'same-origin') return json({error:'Forbidden'},403);
  if (request.headers.get('dnt')==='1' || request.headers.get('sec-gpc')==='1') return new Response(null,{status:204});
  if (request.headers.get('content-type')?.split(';')[0] !== 'application/json') return json({error:'Unsupported format'},415);
  let input;try{input=await limitedJSON(request,1024);}catch{return json({error:'Invalid request'},400);}
  const now=Date.now(), jar=cookies(request);
  const knownVisitor=verify(jar['__Host-delta-visitor'],now),knownSession=verify(jar['__Host-delta-session'],now);
  if(knownVisitor && knownSession){
    if(verify(jar['__Host-delta-presence'],now))return new Response(null,{status:204,headers:{'Cache-Control':'no-store'}});
    try{await touchPresence(digest('presence:'+knownVisitor.id),countryCode(request.headers.get('x-vercel-ip-country')),now);const headers=new Headers({'Cache-Control':'no-store'});headers.append('Set-Cookie','__Host-delta-presence='+sign({id:knownVisitor.id,exp:now+HEARTBEAT_INTERVAL})+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=120');return new Response(null,{status:204,headers});}catch(error){console.error('Presence unavailable',error.name);return json({error:'Unavailable'},503);}
  }
  try {
    const visitor=knownVisitor||{id:randomBytes(16).toString('hex'),exp:now+30*86400000};
    const session={id:randomBytes(16).toString('hex'),exp:now+30*60000};
    const date=new Date(now).toISOString().slice(0,10);
    const country=countryCode(request.headers.get('x-vercel-ip-country'));
    const record={at:new Date(now).toISOString(),date,visitor:digest(date+':'+visitor.id),country,route:safeRoute(input?.route)};
    // Bounded pilot collection; the platform rate limit also protects this endpoint.
    const daily=await list({prefix:'visits/'+date+'/',limit:1000});
    if(daily.blobs.length>=1000)return new Response(null,{status:204,headers:{'Cache-Control':'no-store'}});
    if(!await takeRateToken(request))return new Response(null,{status:429,headers:{'Cache-Control':'no-store','Retry-After':'60'}});
    await put('visits/'+date+'/'+record.visitor+'-'+session.id+'-'+country+'.json',JSON.stringify(record),{access:'private',contentType:'application/json',addRandomSuffix:false,allowOverwrite:false});
    let presenceSaved=false;
    try{await touchPresence(digest('presence:'+visitor.id),country,now);presenceSaved=true;}catch(error){console.error('Presence unavailable',error.name);}
    const headers=new Headers({'Cache-Control':'no-store'});
    headers.append('Set-Cookie','__Host-delta-visitor='+sign(visitor)+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=2592000');
    headers.append('Set-Cookie','__Host-delta-session='+sign(session)+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=1800');
    if(presenceSaved)headers.append('Set-Cookie','__Host-delta-presence='+sign({id:visitor.id,exp:now+HEARTBEAT_INTERVAL})+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=120');
    return new Response(null,{status:204,headers});
  } catch(error) {
    console.error('Anonymous visit storage failed',error.name); // never log tokens, headers, or visitors
    return json({error:'Unavailable'},503);
  }
}
