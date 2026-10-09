import {PROJECT_ID,json} from '../_server/security.mjs';
import {readAds} from '../_server/ad-store.mjs';
import {publicAds} from '../_server/ads.mjs';
export async function GET(){
  if(process.env.VERCEL_ENV!=='production' || process.env.VERCEL_PROJECT_ID!==PROJECT_ID)return json({error:'Not found'},404);
  try{return json(publicAds(await readAds()));}catch(error){console.error('Ad settings unavailable',error.name);return json({enabled:false,provider:'rotate',defaultExpanded:true,format:'300x250',updatedAt:null},503);}
}
