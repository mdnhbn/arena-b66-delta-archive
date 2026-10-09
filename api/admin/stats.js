import {list} from '@vercel/blob';
import {adminAllowed,json} from '../../_server/security.mjs';
import {summarizeVisits,summarizePresence,ACTIVE_WINDOW} from '../../_server/analytics.mjs';
import {cachedStat} from '../../_server/stat-cache.mjs';
async function blobsFor(prefix){let cursor,blobs=[],limited=false;do{const result=await list({prefix,limit:1000,cursor});blobs.push(...result.blobs);cursor=result.cursor;if(blobs.length>=3000){limited=result.hasMore;break;}if(!result.hasMore)break;}while(cursor);return {blobs,limited};}
export async function GET(request){
  if(!adminAllowed())return json({error:'Not found'},404);
  const period=request && new URL(request.url).searchParams.get('days')==='28'?28:7;
  try{
    const now=Date.now(),today=new Date(now).toISOString().slice(0,10),startDate='2026-10-09',days=[];
    for(let i=period-1;i>=0;i--){const date=new Date(now-i*86400000).toISOString().slice(0,10);if(date<startDate){days.push({date,visits:null,visitors:null,collected:false,limited:false,countries:[]});continue;}
      const day=await cachedStat('day-v2:'+date,date===today?30:300,async()=>{const result=await blobsFor('visits/'+date+'/');return {date,...summarizeVisits(result.blobs),collected:true,limited:result.limited};});days.push(day);
    }
    const presence=await cachedStat('presence-v1:'+Math.floor(now/30000),30,async()=>{const dates=[today];if(now%86400000<ACTIVE_WINDOW)dates.push(new Date(now-86400000).toISOString().slice(0,10));const records=await Promise.all(dates.map(date=>blobsFor('presence/'+date+'/')));return {...summarizePresence(records.flatMap(r=>r.blobs),now),limited:records.some(r=>r.limited),at:new Date(now).toISOString()};});
    return json({days,startDate,period,active:presence.active,activeCountries:presence.countries,activeWindowMinutes:5,presenceUpdatedAt:presence.at,presenceLimited:presence.limited,updatedAt:new Date().toISOString(),timeZone:'UTC',metric:'Anonymous browser estimates; active means a signal in the last five minutes'});
  }catch(error){console.error('Admin statistics unavailable',error.name);return json({error:'Private storage unavailable'},503);}
}
