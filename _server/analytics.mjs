export const ACTIVE_WINDOW=5*60000;
export const HEARTBEAT_INTERVAL=2*60000;
export function countryCode(value){return typeof value==='string' && /^[A-Z]{2}$/.test(value)?value:'ZZ';}
export function summarizeVisits(blobs){
  const visitors=new Map();let visits=0;
  for(const blob of blobs){const match=/^([a-f0-9]{64})-[a-f0-9]{32}(?:-([A-Z]{2}))?\.json$/.exec(blob.pathname.split('/').pop());if(!match)continue;visits++;const at=Date.parse(blob.uploadedAt)||0;const previous=visitors.get(match[1]);if(!previous || at>previous.at)visitors.set(match[1],{at,country:countryCode(match[2])});}
  const countries=new Map();for(const visitor of visitors.values())countries.set(visitor.country,(countries.get(visitor.country)||0)+1);
  return {visits,visitors:visitors.size,countries:[...countries].map(([code,count])=>({code,count})).sort((a,b)=>b.count-a.count)};
}
export function summarizePresence(blobs,now=Date.now()){
  const visitors=new Map();
  for(const blob of blobs){const match=/^([a-f0-9]{64})-([A-Z]{2})\.json$/.exec(blob.pathname.split('/').pop());const at=Date.parse(blob.uploadedAt);if(!match || !Number.isFinite(at) || at>now+10000 || now-at>ACTIVE_WINDOW)continue;const previous=visitors.get(match[1]);if(!previous || at>previous.at)visitors.set(match[1],{at,country:countryCode(match[2])});}
  const countries=new Map();for(const visitor of visitors.values())countries.set(visitor.country,(countries.get(visitor.country)||0)+1);
  return {active:visitors.size,countries:[...countries].map(([code,count])=>({code,count})).sort((a,b)=>b.count-a.count)};
}
