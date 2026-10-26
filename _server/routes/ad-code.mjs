import {PROJECT_ID,json} from '../security.mjs';
import {readAds} from '../ad-store.mjs';
import {PLACEMENT_IDS,bannerFormat} from '../ads.mjs';
import {presetCode} from '../ads/presets.mjs';
import {siteFrom} from '../sites.mjs';
export async function GET(request){
  if(process.env.VERCEL_ENV!=='production'||process.env.VERCEL_PROJECT_ID!==PROJECT_ID)return json({error:'Not found'},404);
  const params=new URL(request.url).searchParams,slot=params.get('slot'),variant=params.get('variant')||'desktop';
  if(!PLACEMENT_IDS.includes(slot)||!['desktop','mobile'].includes(variant)||slot==='rail'&&variant==='mobile')return json({error:'Not found'},404);
  let site;try{site=siteFrom(request);}catch{return json({error:'Invalid site'},400);}try{const settings=await readAds(site),p=settings.placements[slot];if(!settings.enabled||!p.enabled)return new Response(null,{status:204,headers:{'Cache-Control':'no-store'}});return json({code:p[variant+'Code']||presetCode(slot,variant),format:bannerFormat(slot,variant)});}catch{return json({error:'Unavailable'},503);}
}
