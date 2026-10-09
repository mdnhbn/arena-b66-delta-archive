import { isIP } from 'node:net';
import { get, put, BlobPreconditionFailedError } from '@vercel/blob';
import { digest } from './security.mjs';
export async function takeRateToken(request, options = {}) {
  const now=options.now??Date.now(), limit=options.limit??100;
  const read=options.get??get, write=options.put??put;
  // This site reaches Vercel directly. Vercel overwrites this header at its proxy.
  const ip=request.headers.get('x-vercel-forwarded-for')||request.headers.get('x-forwarded-for')||'';
  if(!isIP(ip.trim()))throw new Error('Trusted client address unavailable');
  const minute=Math.floor(now/60000);
  const path='rate/'+new Date(now).toISOString().slice(0,10)+'/'+digest('rate:'+minute+':'+ip.trim())+'.json';
  // Private store CAS coordinates concurrent functions. The IP itself is never saved.
  for(let attempt=0;attempt<3;attempt++){
    const old=await read(path,{access:'private',useCache:false});
    const value=old?.statusCode===200?await new Response(old.stream).json():{count:0};
    if(!Number.isSafeInteger(value.count)||value.count<0)throw new Error('Invalid rate counter');
    if(value.count>=limit)return false;
    const etag=old?.blob?.etag;
    if(old&&!etag)throw new Error('Missing rate counter version');
    try{
      await write(path,JSON.stringify({count:value.count+1}),{access:'private',contentType:'application/json',addRandomSuffix:false,allowOverwrite:!!old,...(etag?{ifMatch:etag}:{})});
      return true;
    }catch(error){
      // Initial create races and conditional update conflicts retry a fresh read.
      if(error instanceof BlobPreconditionFailedError||!old){if(attempt<2)continue;return false;}
      throw error;
    }
  }
  return false;
}
