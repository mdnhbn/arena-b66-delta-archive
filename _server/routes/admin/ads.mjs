import {adminAccess,courseScopeAllowed} from '../../staff-access.mjs';
import {adminAllowed,adminMutationAllowed,json,limitedJSON} from '../../security.mjs';
import {cleanAds} from '../../ads.mjs';
import {readAds,saveAds} from '../../ad-store.mjs';
import {siteFrom} from '../../sites.mjs';
export async function GET(request){const access=await adminAccess(request,'ads.manage');if(access.response)return access.response;let site;try{site=siteFrom(request);}catch{return json({error:'Invalid site'},400);}try{return json(await readAds(site));}catch(error){console.error('Private ad settings unavailable',error.name);return json({error:'Storage unavailable'},503);}}
export async function POST(request){
  const access=await adminAccess(request,'ads.manage');if(access.response)return access.response;
  if(!adminMutationAllowed(request))return json({error:'Forbidden'},403);
  let settings,site;try{site=siteFrom(request);settings=cleanAds(await limitedJSON(request,131072));}catch{return json({error:'Invalid ad settings: check the banner code and size'},400);}
  try{return json(await saveAds(settings,site));}catch(error){console.error('Ad publication failed',error.name);return json({error:'Could not publish'},503);}
}
