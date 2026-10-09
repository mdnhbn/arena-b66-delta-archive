import { list } from '@vercel/blob';
import { adminAllowed, json } from '../../_server/security.mjs';
export async function GET() {
  if (!adminAllowed()) return json({error:'Not found'},404);
  try {
    const days=[];
    for(let i=6;i>=0;i--){const date=new Date(Date.now()-i*86400000).toISOString().slice(0,10);let cursor;const visitors=new Set();let visits=0,limited=false;
      do{const result=await list({prefix:'visits/'+date+'/',limit:1000,cursor});for(const blob of result.blobs){const name=blob.pathname.split('/').pop();const match=/^([a-f0-9]{64})-[a-f0-9]{32}\.json$/.exec(name);if(match){visits++;visitors.add(match[1]);}}cursor=result.cursor;if(visits>=3000){limited=result.hasMore;break;}if(!result.hasMore)break;}while(cursor);
      days.push({date,visits,visitors:visitors.size,limited});
    }
    return json({days,updatedAt:new Date().toISOString(),metric:'Anonymous 30-minute visit sessions; daily visitors are approximate'});
  }catch(error){console.error('Admin statistics unavailable',error.name);return json({error:'Private storage unavailable'},503);}
}
