import { randomBytes } from 'node:crypto';
import { put, list } from '@vercel/blob';
import { PUBLIC_ORIGIN, json, cookies, sign, verify, digest, safeRoute, limitedJSON } from '../_server/security.mjs';
import { takeRateToken } from '../_server/rate-limit.mjs';
export async function POST(request) {
  if (process.env.VERCEL_ENV !== 'production' || process.env.ANALYTICS_INGEST_ENABLED !== '1') return json({error:'Unavailable'},503);
  if (request.headers.get('origin') !== PUBLIC_ORIGIN || request.headers.get('sec-fetch-site') !== 'same-origin') return json({error:'Forbidden'},403);
  if (request.headers.get('dnt')==='1' || request.headers.get('sec-gpc')==='1') return new Response(null,{status:204});
  if (request.headers.get('content-type')?.split(';')[0] !== 'application/json') return json({error:'Unsupported format'},415);
  let input;try{input=await limitedJSON(request,1024);}catch{return json({error:'Invalid request'},400);}
  const now=Date.now(), jar=cookies(request);
  if (verify(jar['__Host-delta-session'],now)) return new Response(null,{status:204,headers:{'Cache-Control':'no-store'}});
  try {
    const visitor=verify(jar['__Host-delta-visitor'],now)||{id:randomBytes(16).toString('hex'),exp:now+30*86400000};
    const session={id:randomBytes(16).toString('hex'),exp:now+30*60000};
    const date=new Date(now).toISOString().slice(0,10);
    const record={at:new Date(now).toISOString(),date,visitor:digest(date+':'+visitor.id),route:safeRoute(input?.route)};
    // Bounded pilot collection; the platform rate limit also protects this endpoint.
    const daily=await list({prefix:'visits/'+date+'/',limit:1000});
    if(daily.blobs.length>=1000)return new Response(null,{status:204,headers:{'Cache-Control':'no-store'}});
    if(!await takeRateToken(request))return new Response(null,{status:429,headers:{'Cache-Control':'no-store','Retry-After':'60'}});
    await put('visits/'+date+'/'+record.visitor+'-'+session.id+'.json',JSON.stringify(record),{access:'private',contentType:'application/json',addRandomSuffix:false,allowOverwrite:false});
    const headers=new Headers({'Cache-Control':'no-store'});
    headers.append('Set-Cookie','__Host-delta-visitor='+sign(visitor)+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=2592000');
    headers.append('Set-Cookie','__Host-delta-session='+sign(session)+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=1800');
    return new Response(null,{status:204,headers});
  } catch(error) {
    console.error('Anonymous visit storage failed',error.name); // never log tokens, headers, or visitors
    return json({error:'Unavailable'},503);
  }
}
