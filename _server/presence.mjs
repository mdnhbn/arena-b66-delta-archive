import {get,put,BlobPreconditionFailedError} from '@vercel/blob';
import {HEARTBEAT_INTERVAL,countryCode} from './analytics.mjs';
export async function touchPresence(visitor,country,now=Date.now(),store={get,put}){
  if(!/^[a-f0-9]{64}$/.test(visitor))throw new Error('Invalid visitor');
  const date=new Date(now).toISOString().slice(0,10),path='presence/'+date+'/'+visitor+'-'+countryCode(country)+'.json';
  const file=await store.get(path,{access:'private',useCache:false});
  const saved=file?.statusCode===200?await new Response(file.stream).json():null;
  if(saved && Number.isFinite(saved.lastSeen) && now-saved.lastSeen<HEARTBEAT_INTERVAL)return false;
  try{await store.put(path,JSON.stringify({lastSeen:now}),{access:'private',contentType:'application/json',addRandomSuffix:false,allowOverwrite:!!saved,...(saved?{ifMatch:file.blob.etag}:{})});return true;}
  catch(error){if(error instanceof BlobPreconditionFailedError)return false;throw error;}
}
