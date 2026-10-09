import {getCache} from '@vercel/functions';
import {PROJECT_ID} from './security.mjs';
export async function cachedStat(key,ttl,load){
  const cache=getCache({namespace:'delta-admin-stats:'+PROJECT_ID});
  try{const value=await cache.get(key);if(value)return value;}catch{}
  const value=await load();
  try{await cache.set(key,value,{ttl});}catch{}
  return value;
}
