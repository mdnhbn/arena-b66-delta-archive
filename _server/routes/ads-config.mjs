import {PROJECT_ID,json} from '../security.mjs';
import {readAds} from '../ad-store.mjs';
import {publicAds} from '../ads.mjs';
import {siteFrom} from '../sites.mjs';
export async function GET(request){
  if(process.env.VERCEL_ENV!=='production' || process.env.VERCEL_PROJECT_ID!==PROJECT_ID)return json({error:'Not found'},404);
  let site;try{site=siteFrom(request);}catch{return json({error:'Invalid site'},400);}try{return json(publicAds(await readAds(site)));}catch(error){console.error('Ad settings unavailable',error.name);return json({enabled:false,provider:'rotate',defaultExpanded:true,format:'300x250',updatedAt:null},503);}
}
