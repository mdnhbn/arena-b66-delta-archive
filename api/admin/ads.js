import {adminAllowed,adminMutationAllowed,json,limitedJSON} from '../../_server/security.mjs';
import {cleanAds} from '../../_server/ads.mjs';
import {readAds,saveAds} from '../../_server/ad-store.mjs';
export async function GET(){if(!adminAllowed())return json({error:'Not found'},404);try{return json(await readAds());}catch(error){console.error('Private ad settings unavailable',error.name);return json({error:'Storage unavailable'},503);}}
export async function POST(request){
  if(!adminAllowed())return json({error:'Not found'},404);
  if(!adminMutationAllowed(request))return json({error:'Forbidden'},403);
  let settings;try{settings=cleanAds(await limitedJSON(request,65536));}catch{return json({error:'Invalid ad settings: check the banner code and size'},400);}
  try{return json(await saveAds(settings));}catch(error){console.error('Ad publication failed',error.name);return json({error:'Could not publish'},503);}
}
